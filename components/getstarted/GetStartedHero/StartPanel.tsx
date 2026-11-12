"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, CloudUploadIcon } from "@hugeicons/core-free-icons";

import CountrySelect from "../../DocumentModal/CountrySelect";
import DocumentModal from "../../DocumentModal/DocumentModal";
import { ACCEPTED, validatePhoto } from "../../DocumentModal/photoFile";
import { countriesFor, type DocumentType } from "../../DocumentModal/specs";
import { kbLabel, sizeText } from "../../features/featureData";

const TYPES: { id: DocumentType; label: string }[] = [
  { id: "passport", label: "Passport" },
  { id: "visa", label: "Visa" },
];

const hasFiles = (event: { dataTransfer: DataTransfer | null }) =>
  !!event.dataTransfer?.types?.includes("Files");

/**
 * The start panel: pick passport or visa and a country, see that photo's rules, then drop a
 * photo (or browse for one) to open the editor with the photo, the document and the country
 * all chosen.
 */
export default function StartPanel() {
  const [type, setType] = useState<DocumentType>("passport");
  const [code, setCode] = useState("US");

  const [file, setFile] = useState<File | null>(null);
  // A new key each time it opens, so the window starts fresh with this photo and country.
  const [session, setSession] = useState(0);
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(open);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const countries = useMemo(() => countriesFor(type), [type]);
  // Keep the country when it has the other document too, otherwise fall back to the first.
  const entry = countries.find((item) => item.code === code) ?? countries[0];
  const spec = entry[type]!;

  // Just the size and the file; the editor handles head height and background itself.
  const rows = [
    { label: "Photo size", value: sizeText(spec) },
    { label: "File", value: `${spec.format}, ${kbLabel(spec.fileKb[0])} – ${kbLabel(spec.fileKb[1])}` },
  ];

  const accept = (picked: File | undefined | null) => {
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
  };

  // A photo dropped just beside the drop zone would otherwise make the browser open it in the
  // tab. The editor window handles its own drops while it is open.
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

  const onDragOver = (event: DragEvent<HTMLButtonElement>) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLButtonElement>) => {
    // Leaving for one of the zone's own children is not leaving the zone.
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    accept(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="start-panel">
      <div className="start-panel__head">
        <span className="start-panel__label">Your document</span>
        <div className="start-panel__toggle" role="radiogroup" aria-label="Document type">
          {TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={type === item.id}
              className={`start-panel__type${type === item.id ? " is-on" : ""}`}
              onClick={() => setType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <CountrySelect
        label="Country"
        value={entry.code}
        options={countries.map((item) => ({ value: item.code, label: item.country }))}
        onChange={setCode}
      />

      {/* The chosen photo's rules, read from the editor's own specs. */}
      <dl className="start-panel__specs" aria-live="polite">
        {rows.map((row) => (
          <div key={row.label} className="start-panel__spec">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      {entry.cropOnly && (
        <p className="start-panel__notice">
          {entry.country} only accepts an unedited background, so the editor crops your photo and
          keeps the background. Take it against a plain, light wall.
        </p>
      )}

      {/* Drop a photo here, or click (or press Enter) to choose one. */}
      <button
        type="button"
        className={`start-drop${dragging ? " is-dragging" : ""}`}
        aria-haspopup="dialog"
        aria-describedby="start-drop-formats"
        onClick={() => inputRef.current?.click()}
        onDragEnter={onDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* The same drop box as the landing hero's. */}
        <HugeiconsIcon
          className="start-drop__icon"
          icon={CloudUploadIcon}
          size={40}
          strokeWidth={1.8}
          color="currentColor"
          aria-hidden="true"
        />
        <span className="start-drop__title">
          {dragging ? "Drop it to start" : "Drop your photo here"}
        </span>
        <span className="start-drop__sub">or click to upload</span>
      </button>
      {/* The same file chooser, as the site's black button, text only. */}
      <button
        type="button"
        className="start-panel__button"
        aria-haspopup="dialog"
        onClick={() => inputRef.current?.click()}
      >
        <span className="hero__button-text">Upload a photo</span>
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

      {error && (
        <p className="start-panel__error" role="alert">
          <HugeiconsIcon icon={Alert02Icon} size={15} strokeWidth={2} />
          {error}
        </p>
      )}
      <p className="start-panel__small" id="start-drop-formats">
        JPG, PNG or WebP up to 15 MB, prepared on your device.
      </p>

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
