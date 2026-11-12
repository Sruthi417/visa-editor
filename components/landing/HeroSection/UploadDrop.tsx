"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, CloudUploadIcon } from "@hugeicons/core-free-icons";

import CountrySelect from "../../DocumentModal/CountrySelect";
import DocumentModal from "../../DocumentModal/DocumentModal";
import { ACCEPTED, MAX_FILE_BYTES, validatePhoto } from "../../DocumentModal/photoFile";
import { countriesFor, type DocumentType } from "../../DocumentModal/specs";

const MAX_MB = Math.round(MAX_FILE_BYTES / (1024 * 1024));

const TYPES: { id: DocumentType; label: string }[] = [
  { id: "passport", label: "Passport" },
  { id: "visa", label: "Visa" },
];

const hasFiles = (event: { dataTransfer: DataTransfer | null }) =>
  !!event.dataTransfer?.types?.includes("Files");

/**
 * The hero's call to action: a white panel with the document (passport or visa)
 * and country on top, and a drop box. Like the Get started page, it first asks
 * for a photo (drop one, or click to browse), then opens the editor with that
 * photo, document and country already chosen.
 */
export default function UploadDrop() {
  const [type, setType] = useState<DocumentType>("passport");
  const [code, setCode] = useState("US");
  const countries = useMemo(() => countriesFor(type), [type]);
  // Keep the country when it has the other document too, otherwise fall back to the first.
  const entry = countries.find((item) => item.code === code) ?? countries[0];

  const [open, setOpen] = useState(false);
  // A new key each time it opens, so the window always starts fresh with this photo.
  const [session, setSession] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(open);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // A photo dropped just beside the box would otherwise make the browser open
  // it in the tab. The editor window handles its own drops while it is open.
  useEffect(() => {
    const guard = (event: globalThis.DragEvent) => {
      if (!openRef.current && hasFiles(event)) event.preventDefault();
    };
    window.addEventListener("dragover", guard);
    window.addEventListener("drop", guard);
    return () => {
      window.removeEventListener("dragover", guard);
      window.removeEventListener("drop", guard);
    };
  }, []);

  const accept = (photo: File | undefined | null) => {
    if (!photo) return;
    const problem = validatePhoto(photo);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setFile(photo);
    setSession((value) => value + 1);
    setOpen(true);
  };

  return (
    <div className="hero-upload">
      <div className="hero-upload__choose">
        <div className="hero-upload__switch" role="radiogroup" aria-label="Document type">
          {TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={type === item.id}
              className={`hero-upload__type${type === item.id ? " is-on" : ""}`}
              onClick={() => setType(item.id)}
            >
              {/* One white thumb that glides from option to option. */}
              {type === item.id && (
                <motion.span
                  layoutId="hero-upload-thumb"
                  className="hero-upload__thumb"
                  transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
                />
              )}
              <span className="hero-upload__type-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="hero-upload__country">
          <CountrySelect
            label="Country"
            hideLabel
            value={entry.code}
            options={countries.map((item) => ({ value: item.code, label: item.country }))}
            onChange={setCode}
          />
        </div>
      </div>

      <button
        type="button"
        className={`hero-upload__drop${over ? " hero-upload__drop--over" : ""}`}
        aria-haspopup="dialog"
        aria-describedby="hero-upload-formats"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          if (!hasFiles(event)) return;
          event.preventDefault();
          setOver(true);
        }}
        onDragOver={(event) => {
          if (!hasFiles(event)) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(event) => {
          // Moving onto the box's own icon or text is not leaving it.
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOver(false);
        }}
        onDrop={(event) => {
          if (!hasFiles(event)) return;
          event.preventDefault();
          setOver(false);
          accept(event.dataTransfer.files[0]);
        }}
      >
        <HugeiconsIcon
          className="hero-upload__icon"
          icon={CloudUploadIcon}
          size={40}
          strokeWidth={1.8}
          color="currentColor"
        />
        <span className="hero-upload__title">
          {over ? "Drop it to start" : "Drop your photo here"}
        </span>
        <span className="hero-upload__sub">or click to upload</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        hidden
        onChange={(event) => {
          accept(event.target.files?.[0]);
          // Let the same file be chosen again after closing the window.
          event.target.value = "";
        }}
      />

      {error ? (
        <p className="hero-upload__note hero-upload__note--error" role="alert">
          <HugeiconsIcon icon={Alert02Icon} size={16} strokeWidth={2} color="currentColor" />
          {error}
        </p>
      ) : (
        <p className="hero-upload__note" id="hero-upload-formats">
          JPG, PNG or WebP &middot; up to {MAX_MB} MB
        </p>
      )}

      <DocumentModal
        key={session}
        open={open}
        onClose={close}
        initialFile={file}
        initialType={type}
        initialCode={entry.code}
      />
    </div>
  );
}
