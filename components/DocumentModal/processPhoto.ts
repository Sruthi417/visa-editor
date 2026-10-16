import type { FaceDetector, ImageSegmenter } from "@mediapipe/tasks-vision";

import { headFraction, pixelSize, type PhotoSpec } from "./specs";

/* ---------------------------------------------------------------------------
   The photo pipeline behind the "Preparing your photo" window.

   Everything runs in the browser, so the picture never leaves the device:
   - face detection and person segmentation use MediaPipe, with the model and
     WASM files served from /public/mediapipe;
   - cropping, background replacement and resizing are done on a canvas.

   If a model cannot load, the matching step falls back (a centred crop, or the
   original background) and the related checks are reported as "skipped"
   instead of pretending they ran.
--------------------------------------------------------------------------- */

export const STEPS = [
  { id: "crop", label: "Cropping" },
  { id: "background", label: "Background removing" },
  { id: "resize", label: "Resizing" },
  { id: "analyse", label: "Analysing" },
  { id: "finalise", label: "Finalising" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export type CheckStatus = "passed" | "failed" | "skipped";

export type Check = {
  id: string;
  label: string;
  status: CheckStatus;
  detail?: string;
};

/** A box as percentages of the photo frame. */
export type FrameBox = { x: number; y: number; w: number; h: number };

export type ProcessResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  checks: Check[];
  /** Every check that ran passed. */
  passed: boolean;
  /** Size of the encoded file, and the JPEG quality it was saved at (0-1). */
  sizeKb: number;
  quality: number;
  /**
   * Set when the photo cannot meet the file-size limit without losing too
   * much quality. The photo should be retaken, not compressed harder.
   */
  retake: "large" | "small" | null;
  /** Crown and chin as percentages of the frame's height, when a face was found. */
  head: { top: number; bottom: number } | null;
  headMm: number | null;
};

export type Callbacks = {
  signal: AbortSignal;
  onStep: (step: StepId) => void;
  /** A picture to show once a step has finished. */
  onPreview: (url: string) => void;
  onFace: (box: FrameBox | null) => void;
};

/** How long each step stays on screen, so the progress is readable. */
const MIN_STEP_MS = 1300;

const ASSETS = "/mediapipe";

/* ----------------------------- model loading ----------------------------- */

let visionPromise: Promise<Awaited<ReturnType<typeof loadVision>>> | null = null;
let detectorPromise: Promise<FaceDetector> | null = null;
let segmenterPromise: Promise<ImageSegmenter> | null = null;

async function loadVision() {
  const { FilesetResolver } = await import("@mediapipe/tasks-vision");
  return FilesetResolver.forVisionTasks(`${ASSETS}/wasm`);
}

function getVision() {
  visionPromise ??= loadVision().catch((error) => {
    visionPromise = null;
    throw error;
  });
  return visionPromise;
}

function getDetector() {
  detectorPromise ??= (async () => {
    const { FaceDetector } = await import("@mediapipe/tasks-vision");
    return FaceDetector.createFromOptions(await getVision(), {
      baseOptions: {
        modelAssetPath: `${ASSETS}/models/blaze_face_short_range.tflite`,
        delegate: "CPU",
      },
      runningMode: "IMAGE",
      minDetectionConfidence: 0.5,
    });
  })().catch((error) => {
    detectorPromise = null;
    throw error;
  });
  return detectorPromise;
}

function getSegmenter() {
  segmenterPromise ??= (async () => {
    const { ImageSegmenter } = await import("@mediapipe/tasks-vision");
    return ImageSegmenter.createFromOptions(await getVision(), {
      baseOptions: {
        modelAssetPath: `${ASSETS}/models/selfie_segmenter.tflite`,
        delegate: "CPU",
      },
      runningMode: "IMAGE",
      outputCategoryMask: false,
      outputConfidenceMasks: true,
    });
  })().catch((error) => {
    segmenterPromise = null;
    throw error;
  });
  return segmenterPromise;
}

/** Starts downloading the models, so they are ready when a photo arrives. */
export function warmUp() {
  getDetector().catch(() => {});
  getSegmenter().catch(() => {});
}

/* -------------------------------- helpers -------------------------------- */

function throwIfAborted(signal: AbortSignal) {
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
}

export function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function context(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not available");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode image"))),
      "image/jpeg",
      quality,
    ),
  );
}

/** Best JPEG quality for a normal photo, and the lowest we will accept. */
const QUALITY_BEST = 0.95;
const QUALITY_FLOOR = 0.7;

type Encoded = {
  blob: Blob;
  quality: number;
  retake: "large" | "small" | null;
};

/**
 * Saves the photo as a JPEG inside the document's file-size limits.
 *
 * It is encoded once at high quality. If that is too large, one search finds
 * the highest quality that fits, going no lower than QUALITY_FLOOR. A photo
 * that still does not fit at the floor is full of noise or fine detail, and
 * squeezing it further would visibly damage it, so we ask for a retake.
 */
async function encodeWithinLimits(
  canvas: HTMLCanvasElement,
  spec: PhotoSpec,
): Promise<Encoded> {
  const minBytes = spec.fileKb[0] * 1024;
  const maxBytes = spec.fileKb[1] * 1024;

  const best = await toBlob(canvas, QUALITY_BEST);

  if (best.size > maxBytes) {
    const floor = await toBlob(canvas, QUALITY_FLOOR);
    if (floor.size > maxBytes) {
      return { blob: floor, quality: QUALITY_FLOOR, retake: "large" };
    }

    // Some quality between the floor and the best fits: find the highest.
    let fit = { blob: floor, quality: QUALITY_FLOOR };
    let low = QUALITY_FLOOR;
    let high = QUALITY_BEST;
    for (let i = 0; i < 6; i++) {
      const mid = (low + high) / 2;
      const attempt = await toBlob(canvas, mid);
      if (attempt.size <= maxBytes) {
        fit = { blob: attempt, quality: mid };
        low = mid;
      } else {
        high = mid;
      }
    }
    return { ...fit, retake: null };
  }

  if (best.size < minBytes) {
    // Too small: allow the top quality. A file that is still too small has
    // very little detail in it, which means it is blurred or flat.
    const top = await toBlob(canvas, 1);
    return {
      blob: top,
      quality: 1,
      retake: top.size < minBytes ? "small" : null,
    };
  }

  return { blob: best, quality: QUALITY_BEST, retake: null };
}

const previewOf = (canvas: HTMLCanvasElement) => canvas.toDataURL("image/jpeg", 0.85);

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Runs a step, and keeps it on screen for at least `MIN_STEP_MS`. */
async function runStep<T>(
  step: StepId,
  cb: Callbacks,
  work: () => Promise<T> | T,
): Promise<T> {
  throwIfAborted(cb.signal);
  cb.onStep(step);
  const started = performance.now();
  const value = await work();
  const remaining = MIN_STEP_MS - (performance.now() - started);
  if (remaining > 0) await sleep(remaining, cb.signal);
  throwIfAborted(cb.signal);
  return value;
}

/* --------------------------------- steps --------------------------------- */

type Face = { x: number; y: number; w: number; h: number };

/** Finds faces in the photo, or returns null when detection is unavailable. */
async function detectFaces(bitmap: ImageBitmap): Promise<Face[] | null> {
  try {
    const detector = await getDetector();
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = makeCanvas(bitmap.width * scale, bitmap.height * scale);
    context(canvas).drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    return detector.detect(canvas).detections.flatMap((detection) => {
      const box = detection.boundingBox;
      return box
        ? [
            {
              x: box.originX / scale,
              y: box.originY / scale,
              w: box.width / scale,
              h: box.height / scale,
            },
          ]
        : [];
    });
  } catch {
    return null;
  }
}

type CropPlan = {
  /** Crop rectangle in source pixels. It may extend past the photo. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Crown and chin in source pixels. */
  headTop: number;
  headBottom: number;
  faceFound: boolean;
};

/** Sizes and positions the crop so the head fills the allowed share of it. */
function planCrop(
  bitmap: ImageBitmap,
  faces: Face[] | null,
  spec: PhotoSpec,
): CropPlan {
  // The largest face is the subject.
  const face = faces?.slice().sort((a, b) => b.w * b.h - a.w * a.h)[0];

  let centerX: number;
  let headTop: number;
  let headBottom: number;

  if (face) {
    // The detector's box runs from the forehead to the chin; the head also
    // includes the hair above it.
    centerX = face.x + face.w / 2;
    headTop = face.y - face.h * 0.38;
    headBottom = face.y + face.h * 1.02;
  } else {
    // No face to go on: assume a centred portrait.
    centerX = bitmap.width / 2;
    headTop = bitmap.height * 0.1;
    headBottom = bitmap.height * 0.55;
  }

  const headHeight = headBottom - headTop;
  const height = headHeight / headFraction(spec);
  const width = height * (spec.widthMm / spec.heightMm);

  return {
    left: centerX - width / 2,
    // A little more room above the head than below the chin.
    top: headTop - (height - headHeight) * 0.37,
    width,
    height,
    headTop,
    headBottom,
    faceFound: Boolean(face),
  };
}

/** Draws the planned crop onto a canvas, filling any gap with the background. */
function drawCrop(
  bitmap: ImageBitmap,
  plan: CropPlan,
  spec: PhotoSpec,
  target: { width: number; height: number },
) {
  // Work a little larger than the final size so the later resize is a true
  // downscale, but never beyond what the photo can supply.
  const workWidth = Math.min(
    Math.max(Math.round(plan.width), target.width),
    target.width * 2,
  );
  const canvas = makeCanvas(workWidth, workWidth * (spec.heightMm / spec.widthMm));
  const ctx = context(canvas);
  ctx.fillStyle = spec.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = canvas.width / plan.width;
  const sx0 = Math.max(0, plan.left);
  const sy0 = Math.max(0, plan.top);
  const sx1 = Math.min(bitmap.width, plan.left + plan.width);
  const sy1 = Math.min(bitmap.height, plan.top + plan.height);

  if (sx1 > sx0 && sy1 > sy0) {
    ctx.drawImage(
      bitmap,
      sx0,
      sy0,
      sx1 - sx0,
      sy1 - sy0,
      (sx0 - plan.left) * scale,
      (sy0 - plan.top) * scale,
      (sx1 - sx0) * scale,
      (sy1 - sy0) * scale,
    );
  }
  return canvas;
}

/**
 * Cuts the person out and sets them on the required background. Returns null
 * when the segmentation model is not available.
 */
async function replaceBackground(
  source: HTMLCanvasElement,
  spec: PhotoSpec,
): Promise<HTMLCanvasElement | null> {
  try {
    const segmenter = await getSegmenter();
    const result = segmenter.segment(source);
    const mask = result.confidenceMasks?.[0];
    if (!mask) {
      result.close();
      return null;
    }

    const values = mask.getAsFloat32Array();
    const maskCanvas = makeCanvas(mask.width, mask.height);
    const maskCtx = context(maskCanvas);
    const image = maskCtx.createImageData(mask.width, mask.height);
    for (let i = 0; i < values.length; i++) {
      // Firm up the soft edge a little, so there is no grey halo.
      image.data[i * 4 + 3] = Math.round(smoothstep(0.35, 0.65, values[i]) * 255);
    }
    maskCtx.putImageData(image, 0, 0);
    result.close();

    // Keep the person: the photo, masked.
    const person = makeCanvas(source.width, source.height);
    const personCtx = context(person);
    personCtx.drawImage(source, 0, 0);
    personCtx.globalCompositeOperation = "destination-in";
    personCtx.drawImage(maskCanvas, 0, 0, person.width, person.height);

    const output = makeCanvas(source.width, source.height);
    const outputCtx = context(output);
    outputCtx.fillStyle = spec.backgroundColor;
    outputCtx.fillRect(0, 0, output.width, output.height);
    outputCtx.drawImage(person, 0, 0);
    return output;
  } catch {
    return null;
  }
}

function resize(source: HTMLCanvasElement, target: { width: number; height: number }) {
  const canvas = makeCanvas(target.width, target.height);
  context(canvas).drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Mean brightness (0-255) of a region of a canvas. */
function brightness(canvas: HTMLCanvasElement, x: number, y: number, w: number, h: number) {
  const data = context(canvas).getImageData(
    Math.max(0, Math.round(x)),
    Math.max(0, Math.round(y)),
    Math.max(1, Math.round(w)),
    Math.max(1, Math.round(h)),
  ).data;
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return sum / (data.length / 4);
}

/* -------------------------------- pipeline -------------------------------- */

export async function processPhoto(
  file: File,
  spec: PhotoSpec,
  cb: Callbacks,
): Promise<ProcessResult> {
  const target = pixelSize(spec);

  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  throwIfAborted(cb.signal);

  // 1. Cropping: find the face, then frame the head to the document's rules.
  const { plan, faces, work } = await runStep("crop", cb, async () => {
    const found = await detectFaces(bitmap);
    const framing = planCrop(bitmap, found, spec);
    return { plan: framing, faces: found, work: drawCrop(bitmap, framing, spec, target) };
  });
  cb.onPreview(previewOf(work));

  // Where the face ended up, as a share of the frame.
  const face = faces
    ?.slice()
    .sort((a, b) => b.w * b.h - a.w * a.h)[0];
  const faceBox: FrameBox | null = face
    ? {
        x: ((face.x - plan.left) / plan.width) * 100,
        y: ((face.y - plan.top) / plan.height) * 100,
        w: (face.w / plan.width) * 100,
        h: (face.h / plan.height) * 100,
      }
    : null;
  cb.onFace(faceBox);

  // 2. Background removing.
  const cutOut = await runStep("background", cb, () => replaceBackground(work, spec));
  const flattened = cutOut ?? work;
  cb.onPreview(previewOf(flattened));

  // 3. Resizing to the document's exact pixel size.
  const final = await runStep("resize", cb, () => resize(flattened, target));
  cb.onPreview(previewOf(final));

  // 4. Analysing.
  const checks = await runStep("analyse", cb, () => {
    const results: Check[] = [];

    if (faces === null) {
      results.push(
        { id: "face", label: "Face is recognized", status: "skipped" },
        { id: "single", label: "Only one face is allowed", status: "skipped" },
      );
    } else {
      results.push(
        {
          id: "face",
          label: "Face is recognized",
          status: faces.length > 0 ? "passed" : "failed",
          detail: faces.length > 0 ? undefined : "We could not find a face.",
        },
        {
          id: "single",
          label: "Only one face is allowed",
          status: faces.length <= 1 ? (faces.length === 1 ? "passed" : "skipped") : "failed",
          detail: faces.length > 1 ? `We found ${faces.length} faces.` : undefined,
        },
      );
    }

    const enough = plan.width >= target.width * 0.95;
    results.push({
      id: "dimension",
      label: "Minimum dimension",
      status: enough ? "passed" : "failed",
      detail: enough
        ? undefined
        : "The photo is too small for this size. Use a higher-resolution picture.",
    });

    results.push({
      id: "proportions",
      label: "Correct photo proportions",
      status: "passed",
    });

    if (faceBox) {
      const x = (faceBox.x / 100) * final.width;
      const y = (faceBox.y / 100) * final.height;
      const w = (faceBox.w / 100) * final.width;
      const h = (faceBox.h / 100) * final.height;
      const left = brightness(final, x, y, w / 2, h);
      const right = brightness(final, x + w / 2, y, w / 2, h);
      const uneven = Math.abs(left - right) / Math.max(left, right, 1) > 0.3;
      results.push({
        id: "lighting",
        label: "Even lighting",
        status: uneven ? "failed" : "passed",
        detail: uneven ? "One side of the face is much darker than the other." : undefined,
      });
    } else {
      results.push({ id: "lighting", label: "Even lighting", status: "skipped" });
    }

    // Without a face there is no subject to separate from the background.
    const backgroundDone = Boolean(cutOut) && faces?.length !== 0;
    results.push({
      id: "background",
      label: `${spec.background} background`,
      status: backgroundDone ? "passed" : "skipped",
      detail: backgroundDone ? undefined : "The background could not be replaced.",
    });

    return results;
  });

  // 5. Finalising: save the photo within the file-size limits.
  const encoded = await runStep("finalise", cb, () =>
    encodeWithinLimits(final, spec),
  );
  const sizeKb = Math.round(encoded.blob.size / 1024);
  const [minKb, maxKb] = spec.fileKb;

  checks.push({
    id: "file",
    label: "File size",
    status: encoded.retake ? "failed" : "passed",
    detail: encoded.retake
      ? `${sizeKb} KB, but this document needs ${minKb}–${maxKb} KB.`
      : `${sizeKb} KB (allowed ${minKb}–${maxKb} KB)`,
  });

  const head = plan.faceFound
    ? {
        top: ((plan.headTop - plan.top) / plan.height) * 100,
        bottom: ((plan.headBottom - plan.top) / plan.height) * 100,
      }
    : null;

  return {
    blob: encoded.blob,
    url: URL.createObjectURL(encoded.blob),
    sizeKb,
    quality: encoded.quality,
    retake: encoded.retake,
    width: final.width,
    height: final.height,
    checks,
    passed: checks.every((check) => check.status !== "failed"),
    head,
    headMm: head ? ((head.bottom - head.top) / 100) * spec.heightMm : null,
  };
}

