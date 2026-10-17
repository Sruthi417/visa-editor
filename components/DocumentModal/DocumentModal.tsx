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
import { Alert02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import CheckoutView from "./CheckoutView";
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
import { ACCEPTED, validatePhoto } from "./photoFile";
import { countriesFor, type DocumentType, type PhotoSpec, type CountrySpecs } from "./specs";
import "./DocumentModal.scss";
import "./DocumentFlow.scss";
import "./Checkout.scss";

type View = "choose" | "processing" | "result" | "retake" | "checkout";

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
  /** A photo that was already dropped or chosen before the window opened. */
  initialFile?: File | null;
};

export default function DocumentModal({ open, onClose, initialFile = null }: Props) {
  const [type, setType] = useState<DocumentType>("passport");
  const [code, setCode] = useState("US");
  const [view, setView] = useState<View>("choose");
  const [error, setError] = useState<string | null>(null);
  // A photo that arrived with the window; it is used when "Continue" is pressed.
  const [attached, setAttached] = useState<File | null>(initialFile);

  const [job, setJob] = useState<Job | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [face, setFace] = useState<FrameBox | null>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);

  // Asks before closing when the person has already uploaded a photo.
  const [confirmOpen, setConfirmOpen] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (open && initialFile) warmUp();
  }, [open, initialFile]);

  const openPicker = useCallback(() => {
    warmUp();
    inputRef.current?.click();
  }, []);

  const processSelectedFile = useCallback(
    (file: File) => {
      const problem = validatePhoto(file);
      if (problem) {
        setError(problem);
        setAttached(null);
        setView("choose");
        return;
      }

      setError(null);
      setAttached(null);
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
      if (event.key !== "Escape") return;
      // Escape first dismisses the "discard?" question, then closes the window.
      if (confirmOpen) setConfirmOpen(false);
      else onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, confirmOpen]);

  // A click outside the window: close straight away on the first screen, but
  // ask first once there is a photo in progress.
  const requestClose = () => {
    if (view === "choose" && !attached) onClose();
    else setConfirmOpen(true);
  };

  useEffect(() => {
    if (confirmOpen) keepRef.current?.focus();
  }, [confirmOpen]);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(event) => {
            // Only a click on the dimmed backdrop itself closes the window.
            if (event.target === event.currentTarget) requestClose();
          }}
        >
          <motion.div
            className="doc-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              className="doc-modal__close"
              aria-label="Close"
              onClick={onClose}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.6} />
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
                  onUpload={attached ? () => processSelectedFile(attached) : openPicker}
                  attachedFile={attached}
                  onClearFile={() => setAttached(null)}
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
                  onRetake={retake}
                  onCheckout={() => setView("checkout")}
                />
              )}

              {view === "checkout" && job && result && (
                <CheckoutView
                  key="checkout"
                  titleId={titleId}
                  result={result}
                  spec={job.spec}
                  documentName={job.documentName}
                  fileName={`${job.entry.code.toLowerCase()}-${job.type}-photo.jpg`}
                  onBack={() => setView("result")}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {confirmOpen && (
              <motion.div
                className="doc-modal__confirm-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <motion.div
                  className="doc-modal__confirm"
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby={`${titleId}-discard`}
                  aria-describedby={`${titleId}-discard-text`}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="doc-modal__confirm-icon" aria-hidden="true">
                    <HugeiconsIcon icon={Alert02Icon} size={22} strokeWidth={1.8} />
                  </span>
                  <h3 id={`${titleId}-discard`} className="doc-modal__confirm-title">
                    Discard your changes?
                  </h3>
                  <p id={`${titleId}-discard-text`} className="doc-modal__confirm-text">
                    Your photo and its checks will be lost if you close this window.
                  </p>
                  <div className="doc-modal__confirm-actions">
                    <button
                      ref={keepRef}
                      type="button"
                      className="doc-modal__confirm-btn doc-modal__confirm-btn--ghost"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Keep editing
                    </button>
                    <button
                      type="button"
                      className="doc-modal__confirm-btn doc-modal__confirm-btn--solid"
                      onClick={() => {
                        setConfirmOpen(false);
                        onClose();
                      }}
                    >
                      Discard
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
