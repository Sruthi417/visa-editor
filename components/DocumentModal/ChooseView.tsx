"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  InformationCircleIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import { itemVariants, panelVariants, viewVariants } from "./motion";
import {
  SAMPLE_PHOTO,
  cropFor,
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
  error,
}: Props) {
  const selectId = useId();
  const crop = cropFor(spec);
  const frameWidth = (PREVIEW_HEIGHT * spec.widthMm) / spec.heightMm;

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
                {item.label}
              </button>
            ))}
          </div>

          <div className="doc-modal__field">
            <label htmlFor={selectId}>Country</label>
            <select
              id={selectId}
              value={entry.code}
              onChange={(event) => onCountryChange(event.target.value)}
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.country}
                </option>
              ))}
            </select>
            <HugeiconsIcon
              className="doc-modal__chevron"
              icon={ArrowDown01Icon}
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <div className="doc-modal__summary">
            <div
              className={`doc-modal__cover doc-modal__cover--${type}`}
              aria-hidden="true"
            >
              <span>{type === "passport" ? "PASSPORT" : "VISA"}</span>
              <strong>{entry.code === "SCH" ? "EU" : entry.code}</strong>
            </div>

            <div className="doc-modal__details">
              <h3>{documentName}</h3>
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

          <button type="button" className="doc-modal__upload" onClick={onUpload}>
            <HugeiconsIcon icon={Upload01Icon} size={20} strokeWidth={1.8} />
            Upload photo
          </button>

          <p className="doc-modal__hint" role={error ? "alert" : undefined}>
            {error ?? "JPG, PNG or WebP, up to 15 MB. Your photo stays on your device."}
          </p>
        </motion.div>
      </section>

      {/* Right: what the result looks like -------------------------- */}
      <section className="doc-modal__right">
        <motion.h2 className="doc-modal__spec-title" variants={itemVariants}>
          {entry.country} {type === "passport" ? "Passport" : "Visa"} Photo
          Specifications
        </motion.h2>

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
                style={{ height: PREVIEW_HEIGHT, width: frameWidth }}
              >
                <div className="doc-modal__crop">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SAMPLE_PHOTO.src}
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
