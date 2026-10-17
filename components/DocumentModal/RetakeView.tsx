"use client";

import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { itemVariants, panelVariants, viewVariants } from "./motion";
import type { ProcessResult } from "./processPhoto";
import type { PhotoSpec } from "./specs";

const FRAME_HEIGHT = 340;

const TIPS = [
  "Face a window or use bright, even lighting.",
  "Use your phone's rear camera if possible.",
  "Keep your face in focus and avoid blurry images.",
  "Stand against a plain, well-lit background.",
  "Keep the camera steady and avoid beauty filters.",
];

type Props = {
  titleId: string;
  result: ProcessResult;
  spec: PhotoSpec;
  onRetake: () => void;
};

/**
 * Shown when the photo cannot meet the file-size limit without losing too
 * much quality. We do not squeeze it harder; we ask for a better photo.
 */
export default function RetakeView({ titleId, result, spec, onRetake }: Props) {
  const frameWidth = (FRAME_HEIGHT * spec.widthMm) / spec.heightMm;
  const [minKb, maxKb] = spec.fileKb;

  return (
    <motion.div
      className="doc-modal__grid doc-modal__grid--result"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="doc-modal__left">
        <motion.h2
          id={titleId}
          className="doc-modal__title doc-modal__title--sm"
          variants={itemVariants}
        >
          Let&apos;s get a clearer photo
        </motion.h2>

        <motion.p className="res__lead" variants={itemVariants}>
          {result.retake === "small"
            ? "Your photo doesn't have enough detail to reach the required file size."
            : "Your photo couldn't meet the required file size without losing image quality."}{" "}
          Please retake your photo using these tips:
        </motion.p>

        <ul className="retake__tips">
          {TIPS.map((tip) => (
            <motion.li key={tip} className="retake__tip" variants={itemVariants}>
              <span className="retake__tip-icon">
                <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.6} />
              </span>
              {tip}
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          className="doc-modal__upload res__download"
          variants={itemVariants}
          onClick={onRetake}
        >
          <span>Retake photo</span>
          <HugeiconsIcon icon={Camera01Icon} size={20} color="currentColor" strokeWidth={1.5} />
        </motion.button>
      </section>

      <section className="doc-modal__right doc-modal__right--center">
        <motion.div className="proc__card" variants={panelVariants}>
          <div
            className="retake__frame"
            style={{
              width: `min(${frameWidth}px, 100%)`,
              aspectRatio: `${spec.widthMm} / ${spec.heightMm}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Your photo, which needs to be retaken" />
          </div>
        </motion.div>

        <motion.div
          className="retake__sizes"
          variants={itemVariants}
          style={{ width: `min(${frameWidth}px, 100%)` }}
        >
          <div className="retake__size retake__size--yours">
            <span className="retake__size-label">Your file</span>
            <strong>{result.sizeKb} KB</strong>
          </div>
          <div className="retake__size retake__size--needed">
            <span className="retake__size-label">Needed</span>
            <strong>
              {minKb}–{maxKb} KB
            </strong>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
