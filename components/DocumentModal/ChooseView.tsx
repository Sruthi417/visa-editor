"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, Upload01Icon } from "@hugeicons/core-free-icons";

import CountrySelect from "./CountrySelect";
import { EASE, itemVariants, panelVariants, viewVariants } from "./motion";
import { getSampleCutout } from "./processPhoto";
import {
  CROP_ONLY_NOTICE,
  SAMPLE_PHOTO,
  cropFor,
  fileLabel,
  pixelLabel,
  sizeLabel,
  type CountrySpecs,
  type DocumentType,
  type PhotoSpec,
} from "./specs";

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

          <CountrySelect
            label="Country"
            value={entry.code}
            options={countries.map((item) => ({ value: item.code, label: item.country }))}
            onChange={onCountryChange}
          />

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

          <div className="doc-modal__actions">
            <button type="button" className="doc-modal__upload" onClick={onUpload}>
              <span>Upload photo</span>
              <HugeiconsIcon
                icon={Upload01Icon}
                size={20}
                color="currentColor"
                strokeWidth={1.5}
              />
            </button>

            <p className="doc-modal__hint" role={error ? "alert" : undefined}>
              {error ?? "JPG, PNG or WebP, up to 15 MB. Your photo stays on your device."}
            </p>
          </div>
        </motion.div>
      </section>

      <section className="doc-modal__right">
        <motion.div variants={itemVariants} className="doc-modal__spec-header">
          <h2 className="doc-modal__spec-title">
            Photo requirements for {entry.country} {type === "passport" ? "Passport" : "Visa"}
          </h2>
          <p className="doc-modal__spec-sub">
            Standard {sizeLabel(spec)} format with official {spec.background.toLowerCase()} background.
          </p>
        </motion.div>

        <motion.div
          className="doc-modal__previews"
          variants={panelVariants}
          style={{ ["--frame-ratio" as string]: spec.widthMm / spec.heightMm }}
        >
          <figure className="doc-modal__preview">
            <figcaption>Before</figcaption>
            <div className="doc-modal__before">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SAMPLE_PHOTO.src} alt="Original portrait" />
            </div>
          </figure>

          <figure className="doc-modal__preview">
            <figcaption>After</figcaption>
            <div className="doc-modal__after">
              <div
                className="doc-modal__frame"
                style={{ backgroundColor: spec.backgroundColor }}
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

        {entry.cropOnly && (
          <motion.p
            className="doc-modal__note doc-modal__note--warning"
            variants={itemVariants}
            role="note"
          >
            <HugeiconsIcon icon={Alert02Icon} size={22} strokeWidth={1.6} />
            <span>
              <strong>Background must not be changed.</strong> {CROP_ONLY_NOTICE}
            </span>
          </motion.p>
        )}
      </section>
    </motion.div>
  );
}
