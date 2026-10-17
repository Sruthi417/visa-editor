"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, Image01Icon, Upload01Icon } from "@hugeicons/core-free-icons";

import DocumentModal from "../DocumentModal/DocumentModal";
import { ACCEPTED, validatePhoto } from "../DocumentModal/photoFile";
import "./Drop.scss";

const reveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const hasFiles = (event: DragEvent) => !!event.dataTransfer?.types?.includes("Files");

export default function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const [session, setSession] = useState(0);
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // dragenter / dragleave also fire for every child, so count them.
  const depth = useRef(0);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const accept = useCallback((picked: File | undefined | null) => {
    if (!picked) return;
    const problem = validatePhoto(picked);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setFile(picked);
    setSession((value) => value + 1);
    setOpen(true);
  }, []);

  // A photo can be dropped anywhere on the page (the browser would otherwise
  // open it in the tab), or pasted with Ctrl+V.
  useEffect(() => {
    const onDragEnter = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      depth.current += 1;
      setDragging(true);
    };
    const onDragOver = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    };
    const onDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setDragging(false);
    };
    const onDrop = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      depth.current = 0;
      setDragging(false);
      if (!openRef.current) accept(event.dataTransfer?.files?.[0]);
    };
    const onPaste = (event: ClipboardEvent) => {
      if (openRef.current) return;
      const picked = Array.from(event.clipboardData?.files ?? []).find((item) =>
        item.type.startsWith("image/"),
      );
      if (picked) accept(picked);
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("paste", onPaste);
    };
  }, [accept]);

  return (
    <section className="drop" id="drop">
      <div className="drop__container">
        <motion.div
          className="drop__header"
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <h1 className="drop__title">Drop your photo here</h1>
          <p className="drop__sub">
            Start with any clear photo of your face. Next, you choose the country and document.
          </p>
        </motion.div>

        <motion.div
          className="drop__card"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
        >
          <div
            className={`drop__zone${dragging ? " drop__zone--active" : ""}`}
            onClick={() => inputRef.current?.click()}
          >
            <span className="drop__icon" aria-hidden="true">
              <HugeiconsIcon icon={Image01Icon} size={28} strokeWidth={1.8} />
            </span>

            <h2 className="drop__zone-title" aria-live="polite">
              {dragging ? "Release to upload" : "Drag and drop your photo"}
            </h2>
            <p className="drop__or">or</p>

            <button
              type="button"
              className="drop__button"
              aria-haspopup="dialog"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
            >
              <span className="drop__button-text">Choose a photo</span>
              <span className="drop__button-icon" aria-hidden="true">
                <HugeiconsIcon icon={Upload01Icon} size={22} color="#131313" strokeWidth={2.2} />
              </span>
            </button>

            <p className="drop__hint">
              JPG, PNG or WebP, up to 15 MB. Your photo stays on your device.
            </p>

            {error && (
              <p className="drop__error" role="alert">
                <HugeiconsIcon icon={Alert02Icon} size={18} strokeWidth={1.8} />
                {error}
              </p>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="drop__file"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => {
              const picked = event.target.files?.[0];
              // Reset so choosing the same file again still fires a change.
              event.target.value = "";
              accept(picked);
            }}
          />
        </motion.div>

        <p className="drop__tip">You can also paste a photo with Ctrl+V.</p>
      </div>

      <DocumentModal
        key={session}
        open={open}
        onClose={() => setOpen(false)}
        initialFile={file}
      />
    </section>
  );
}
