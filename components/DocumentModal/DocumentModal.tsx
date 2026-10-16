"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

import ChooseView from "./ChooseView";
import ProcessingView from "./ProcessingView";
import RetakeView from "./RetakeView";
import ResultView from "./ResultView";
import { EASE } from "./motion";
import {
  STEPS,
  isAbort,
  processPhoto,
  warmUp,
  type FrameBox,
  type ProcessResult,
} from "./processPhoto";
import { countriesFor, type DocumentType, type PhotoSpec, type CountrySpecs } from "./specs";
import "./DocumentModal.scss";
import "./DocumentFlow.scss";

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type View = "choose" | "processing" | "result" | "retake";

/** What was chosen when the photo was uploaded, kept for the later views. */
type Job = {
  file: File;
  originalUrl: string;
  type: DocumentType;
  entry: CountrySpecs;
  spec: PhotoSpec;
  documentName: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DocumentModal({ open, onClose }: Props) {
  const [type, setType] = useState<DocumentType>("passport");
  const [code, setCode] = useState("US");
  const [view, setView] = useState<View>("choose");
  const [error, setError] = useState<string | null>(null);

  const [job, setJob] = useState<Job | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [face, setFace] = useState<FrameBox | null>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const countries = useMemo(() => countriesFor(type), [type]);
  // Keep the chosen country when it also has the other document type,
  // otherwise fall back to the first one in the list.
  const entry = countries.find((item) => item.code === code) ?? countries[0];
  const spec = entry[type]!;
  const documentName =
    type === "passport"
      ? `${entry.country} Passport Photo`
      : `${entry.country} Visa Photo`;

  const openPicker = useCallback(() => {
    warmUp();
    inputRef.current?.click();
  }, []);

  const processSelectedFile = useCallback(
    (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        setError("Please choose a JPG, PNG or WebP image.");
        setView("choose");
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setError("That file is larger than 15 MB. Please choose a smaller one.");
        setView("choose");
        return;
      }

      setError(null);
      setStepIndex(0);
      setPreview(null);
      setFace(null);
      setResult(null);
      setJob({
        file,
        originalUrl: URL.createObjectURL(file),
        type,
        entry,
        spec,
        documentName,
      });
      setView("processing");
    },
    [type, entry, spec, documentName],
  );

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset so choosing the same file again still fires a change.
    event.target.value = "";
    if (file) processSelectedFile(file);
  };

  // Run the pipeline for the uploaded photo. Closing the window, or starting
  // another photo, cancels it.
  useEffect(() => {
    if (!job || !open) return;

    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;

    processPhoto(job.file, job.spec, {
      signal: controller.signal,
      onStep: (step) => setStepIndex(STEPS.findIndex((item) => item.id === step)),
      onPreview: setPreview,
      onFace: setFace,
    })
      .then((output) => {
        if (controller.signal.aborted) {
          URL.revokeObjectURL(output.url);
          return;
        }
        setResult(output);
        setStepIndex(STEPS.length);
        // Let the finished state register before moving on.
        timer = setTimeout(
          () => setView(output.retake ? "retake" : "result"),
          1400,
        );
      })
      .catch((reason) => {
        if (isAbort(reason)) return;
        console.error("Photo processing failed", reason);
        setError("We couldn't read that image. Please try a different photo.");
        setJob(null);
        setView("choose");
      });

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [job, open]);

  // Free the picture URLs when they are replaced.
  useEffect(() => {
    const url = job?.originalUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [job]);

  useEffect(() => {
    const url = result?.url;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [result]);

  // Close on Escape, and stop the page behind from scrolling.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const retake = () => {
    setJob(null);
    setResult(null);
    setView("choose");
    openPicker();
  };

  // The portal needs the document, so render nothing on the server and until
  // the page has hydrated.
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="doc-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <button
            ref={closeRef}
            type="button"
            className="doc-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={26} strokeWidth={1.6} />
          </button>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="doc-modal__file"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleFile}
          />

          <AnimatePresence mode="wait">
            {view === "choose" && (
              <ChooseView
                key="choose"
                titleId={titleId}
                type={type}
                onTypeChange={setType}
                countries={countries}
                entry={entry}
                spec={spec}
                documentName={documentName}
                onCountryChange={setCode}
                onUpload={openPicker}
                onFileDrop={processSelectedFile}
                error={error}
              />
            )}

            {view === "processing" && job && (
              <ProcessingView
                key="processing"
                titleId={titleId}
                originalUrl={job.originalUrl}
                previewUrl={preview}
                stepIndex={stepIndex}
                face={face}
                spec={job.spec}
              />
            )}

            {view === "retake" && job && result && (
              <RetakeView
                key="retake"
                titleId={titleId}
                result={result}
                spec={job.spec}
                onRetake={retake}
              />
            )}

            {view === "result" && job && result && (
              <ResultView
                key="result"
                titleId={titleId}
                result={result}
                spec={job.spec}
                documentName={job.documentName}
                fileName={`${job.entry.code.toLowerCase()}-${job.type}-photo.jpg`}
                onRetake={retake}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
