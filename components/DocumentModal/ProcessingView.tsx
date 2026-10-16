"use client";

import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBackgroundEraserIcon,
  FileExportIcon,
  ImageCropIcon,
  ResizeFieldRectangleIcon,
  ScanFaceIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import { EASE, itemVariants, panelVariants, viewVariants } from "./motion";
import { STEPS, type FrameBox, type StepId } from "./processPhoto";
import type { PhotoSpec } from "./specs";

const FRAME_HEIGHT = 380;

type Props = {
  titleId: string;
  originalUrl: string;
  /** The latest picture from the pipeline; the upload until a step produces one. */
  previewUrl: string | null;
  /** The step in progress. Equal to STEPS.length once everything is done. */
  stepIndex: number;
  face: FrameBox | null;
  spec: PhotoSpec;
};

const STEP_ICONS: Record<StepId, typeof Tick02Icon> = {
  crop: ImageCropIcon,
  background: AiBackgroundEraserIcon,
  resize: ResizeFieldRectangleIcon,
  analyse: ScanFaceIcon,
  finalise: FileExportIcon,
};

/** 900 → "900 KB", 10240 → "10 MB" */
function kbLabel(kb: number) {
  return kb >= 1024 ? `${Math.round((kb / 1024) * 10) / 10} MB` : `${kb} KB`;
}

function getStepSub(stepId: StepId, spec: PhotoSpec) {
  switch (stepId) {
    case "crop":
      return "Centring your face and setting eye level to the official guide";
    case "background":
      return `Replacing the background with plain ${spec.background.toLowerCase()}`;
    case "resize":
      return `Scaling to exactly ${spec.widthMm} × ${spec.heightMm} mm at ${spec.dpi} dpi`;
    case "analyse":
      return "Checking your face, lighting and background against the rules";
    case "finalise":
      return `Saving a ${spec.format} between ${kbLabel(spec.fileKb[0])} and ${kbLabel(spec.fileKb[1])}`;
  }
}

export default function ProcessingView({
  titleId,
  originalUrl,
  previewUrl,
  stepIndex,
  face,
  spec,
}: Props) {
  const finished = stepIndex >= STEPS.length;
  const stepId = finished ? "done" : STEPS[stepIndex].id;
  const shown = previewUrl ?? originalUrl;
  const frameWidth = (FRAME_HEIGHT * spec.widthMm) / spec.heightMm;

  return (
    <motion.div
      className="doc-modal__grid doc-modal__grid--process"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="doc-modal__left">
        <motion.h2 id={titleId} className="doc-modal__title" variants={itemVariants}>
          Preparing your photo
        </motion.h2>

        <ol className="proc__steps" aria-live="polite">
          {STEPS.map((step, index) => {
            const state =
              index < stepIndex ? "done" : index === stepIndex ? "active" : "pending";

            return (
              <motion.li
                key={step.id}
                className={`proc__step proc__step--${state}`}
                variants={itemVariants}
                aria-current={state === "active" ? "step" : undefined}
              >
                <span className="proc__marker">
                  {/* A ring turns around the step in progress. */}
                  {state === "active" && <span className="proc__spinner" aria-hidden="true" />}
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "done" ? (
                      <motion.span
                        key="tick"
                        className="proc__icon"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <HugeiconsIcon icon={Tick02Icon} size={20} strokeWidth={2.2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        className="proc__icon"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        <HugeiconsIcon icon={STEP_ICONS[step.id]} size={20} strokeWidth={1.7} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <div className="proc__text">
                  <span className="proc__label">{step.label}</span>
                  <p className="proc__sub">{getStepSub(step.id, spec)}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      <section className="doc-modal__right doc-modal__right--center">
        <motion.div className="proc__card" variants={panelVariants}>
          <div
            className={`proc__frame proc__frame--${stepId}`}
            style={{
              width: `min(${frameWidth}px, 100%)`,
              aspectRatio: `${spec.widthMm} / ${spec.heightMm}`,
            }}
          >
            <div className="proc__clip">
              <AnimatePresence initial={false}>
                <motion.img
                  key={shown}
                  className="proc__image"
                  src={shown}
                  alt="Your photo"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>

              {/* The glow trails the scan line down the photo. */}
              {(stepId === "crop" || stepId === "background" || stepId === "analyse") && (
                <span className="proc__glow" />
              )}
            </div>

            {(stepId === "crop" || stepId === "background" || stepId === "analyse") && (
              <span className="proc__line" />
            )}

            {stepId === "resize" && <span className="proc__corners" />}

            {stepId === "analyse" && face && (
              <span
                className="proc__face"
                style={{
                  left: `${face.x}%`,
                  top: `${face.y}%`,
                  width: `${face.w}%`,
                  height: `${face.h}%`,
                }}
              />
            )}

            <AnimatePresence>
              {(stepId === "finalise" || stepId === "done") && (
                <motion.span
                  className="proc__done"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <HugeiconsIcon icon={Tick02Icon} size={34} strokeWidth={2.4} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
