"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon, Upload01Icon } from "@hugeicons/core-free-icons";

import CountrySelect from "./CountrySelect";
import { EASE, itemVariants, panelVariants, viewVariants } from "./motion";
import { getSampleCutout } from "./processPhoto";
import {
  SAMPLE_PHOTO,
  cropFor,
  fileLabel,
  pixelLabel,
  sizeLabel,
  type CountrySpecs,
  type DocumentType,
  type PhotoSpec,
} from "./specs";

// Height of the Before and After pictures. The After frame keeps this height
// and changes width with the document's proportions.
const PREVIEW_HEIGHT = 250;

const TYPES: { id: DocumentType; label: string }[] = [
  { id: "passport", label: "Passport" },
  { id: "visa", label: "Visa" },
];

function getCoverCode(code: string): string {
  if (code === "US") return "USA";
  if (code === "SCH") return "EU";
  if (code === "GB") return "UK";
  return code;
}

type Props = {
  titleId: string;
  type: DocumentType;
  onTypeChange: (type: DocumentType) => void;
  countries: CountrySpecs[];
  entry: CountrySpecs;
  spec: PhotoSpec;
  documentName: string;
  onCountryChange: (code: string) => void;
  onUpload: () => void;
  onFileDrop?: (file: File) => void;
  error: string | null;
};

export default function ChooseView({
  titleId,
  type,
  onTypeChange,
  countries,
  entry,
  spec,
  documentName,
  onCountryChange,
  onUpload,
  onFileDrop,
  error,
}: Props) {
  const crop = cropFor(spec);
  const frameWidth = (PREVIEW_HEIGHT * spec.widthMm) / spec.heightMm;
  const [sampleCutout, setSampleCutout] = useState<string | null>(null);

  useEffect(() => {
    getSampleCutout().then((url) => {
      if (url) setSampleCutout(url);
    });
  }, []);

  return (
    <motion.div
      className="doc-modal__grid"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Left: choose the document ---------------------------------- */}
      <section className="doc-modal__left">
        <motion.h2 id={titleId} className="doc-modal__title" variants={itemVariants}>
          Choose a document
        </motion.h2>

        <motion.div className="doc-modal__card" variants={itemVariants}>
          {/* Segmented control: Image 2 style */}
          <div className="doc-modal__switch" role="group" aria-label="Document">
            {TYPES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`doc-modal__switch-btn${
                  type === item.id ? " doc-modal__switch-btn--active" : ""
                }`}
                aria-pressed={type === item.id}
                onClick={() => onTypeChange(item.id)}
              >
                {/* One pill that slides from option to option. */}
                {type === item.id && (
                  <motion.span
                    layoutId="doc-switch-thumb"
                    className="doc-modal__switch-thumb"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="doc-modal__switch-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Country selection row: Image 2 style */}
          <CountrySelect
            label="Country"
            value={entry.code}
            options={countries.map((item) => ({ value: item.code, label: item.country }))}
            onChange={onCountryChange}
          />

          {/* Document Summary & Specs: Image 3 file card + Image 2 specs rows */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${type}-${entry.code}`}
              className="doc-modal__summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <div className="doc-modal__doc-card">
                <div className="doc-modal__doc-header">
                  {/* Booklet cover matching Image 2 & 3 references */}
                  <div
                    className={`doc-modal__cover doc-modal__cover--${type}`}
                    aria-hidden="true"
                  >
                    <span className="doc-modal__cover-title">
                      {type === "passport" ? "PASSPORT" : "VISA"}
                    </span>
                    <svg
                      className="doc-modal__cover-globe"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.8" />
                      <ellipse cx="24" cy="24" rx="10" ry="21" stroke="currentColor" strokeWidth="2.8" />
                      <line x1="3" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="2.8" />
                      <line x1="7.5" y1="13.5" x2="40.5" y2="13.5" stroke="currentColor" strokeWidth="2.8" />
                      <line x1="7.5" y1="34.5" x2="40.5" y2="34.5" stroke="currentColor" strokeWidth="2.8" />
                    </svg>
                    <strong className="doc-modal__cover-code">
                      {getCoverCode(entry.code)}
                    </strong>
                  </div>

                  <div className="doc-modal__doc-info">
                    <h3>{documentName}</h3>
                    <p className="doc-modal__doc-sub">
                      {sizeLabel(spec)} &bull; {spec.dpi} dpi
                    </p>
                  </div>
                </div>

                <div className="doc-modal__details">
                  <dl>
                    <div>
                      <dt>Size</dt>
                      <dd>{sizeLabel(spec)}</dd>
                    </div>
                    <div>
                      <dt>Resolution</dt>
                      <dd>
                        {spec.dpi} dpi ({pixelLabel(spec)})
                      </dd>
                    </div>
                    <div>
                      <dt>File</dt>
                      <dd>{fileLabel(spec)}</dd>
                    </div>
                    <div>
                      <dt>Background</dt>
                      <dd>
                        <i
                          className="doc-modal__swatch"
                          style={{ background: spec.backgroundColor }}
                        />
                        {spec.background}
                      </dd>
                    </div>
                    {spec.headMm && (
                      <div>
                        <dt>Head height</dt>
                        <dd>
                          {spec.headMm[0]}–{spec.headMm[1]} mm
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>


          {/* Bottom upload button: Image 3 style */}
          <button type="button" className="doc-modal__upload" onClick={onUpload}>
            <HugeiconsIcon icon={Upload01Icon} size={20} strokeWidth={1.9} />
            Upload photo
          </button>

          <p className="doc-modal__hint" role={error ? "alert" : undefined}>
            {error ?? "JPG, PNG or WebP, up to 15 MB. Your photo stays on your device."}
          </p>
        </motion.div>
      </section>

      {/* Right: what the result looks like -------------------------- */}
      <section className="doc-modal__right">
        <motion.div variants={itemVariants} className="doc-modal__spec-header">
          <h2 className="doc-modal__spec-title">
            Photo requirements for {entry.country} {type === "passport" ? "Passport" : "Visa"}
          </h2>
          <p className="doc-modal__spec-sub">
            Standard {sizeLabel(spec)} format with official {spec.background.toLowerCase()} background.
          </p>
        </motion.div>

        <motion.div className="doc-modal__previews" variants={panelVariants}>
          <figure className="doc-modal__preview">
            <figcaption>Before</figcaption>
            <div
              className="doc-modal__before"
              style={{ height: PREVIEW_HEIGHT, width: PREVIEW_HEIGHT * 0.8 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SAMPLE_PHOTO.src} alt="Original portrait" />
            </div>
          </figure>

          <figure className="doc-modal__preview">
            <figcaption>After</figcaption>
            <div className="doc-modal__after">
              <div
                className="doc-modal__frame"
                style={{
                  height: PREVIEW_HEIGHT,
                  width: frameWidth,
                  backgroundColor: spec.backgroundColor,
                }}
              >
                <div className="doc-modal__crop">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sampleCutout ?? SAMPLE_PHOTO.src}
                    alt={`Portrait cropped for a ${documentName}`}
                    style={{
                      width: `${crop.widthPct}%`,
                      left: `${crop.leftPct}%`,
                      top: `${crop.topPct}%`,
                    }}
                  />
                </div>

                <span className="doc-modal__ruler doc-modal__ruler--top">
                  <b>{spec.widthMm} mm</b>
                </span>
                <span className="doc-modal__ruler doc-modal__ruler--right">
                  <b>{spec.heightMm} mm</b>
                </span>
              </div>
            </div>
          </figure>
        </motion.div>

        <motion.p className="doc-modal__note" variants={itemVariants}>
          <HugeiconsIcon icon={InformationCircleIcon} size={22} strokeWidth={1.6} />
          <span>
            Requirements change from time to time. Please confirm them with the
            official issuing authority before you submit.
          </span>
        </motion.p>
      </section>
    </motion.div>
  );
}
