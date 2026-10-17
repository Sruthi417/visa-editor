"use client";

import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Camera01Icon,
  CheckmarkCircle02Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

import { itemVariants, panelVariants, viewVariants } from "./motion";
import type { Check, ProcessResult } from "./processPhoto";
import { formatLength, type PhotoSpec } from "./specs";

const FRAME_HEIGHT = 360;

const STATUS_LABEL: Record<Check["status"], string> = {
  passed: "Passed",
  failed: "Failed",
  skipped: "Not checked",
};

type Props = {
  titleId: string;
  result: ProcessResult;
  spec: PhotoSpec;
  documentName: string;
  onRetake: () => void;
  /** "Download photo": goes on to the checkout. */
  onCheckout: () => void;
};

export default function ResultView({
  titleId,
  result,
  spec,
  documentName,
  onRetake,
  onCheckout,
}: Props) {
  const frameWidth = (FRAME_HEIGHT * spec.widthMm) / spec.heightMm;
  const failures = result.checks.filter((check) => check.status === "failed");

  return (
    <motion.div
      className="doc-modal__grid doc-modal__grid--result"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="doc-modal__left">
        <motion.h2 id={titleId} className="doc-modal__title doc-modal__title--sm" variants={itemVariants}>
          {result.passed ? "Initial check passed" : "Check needs attention"}
        </motion.h2>

        <motion.p className="res__lead" variants={itemVariants}>
          {result.passed
            ? `Your photo was cropped and resized for the ${documentName}. Review the checks, then download it.`
            : `${failures.length === 1 ? "One check" : `${failures.length} checks`} did not pass. Retake the photo following the guide, or download this version to review it yourself.`}{" "}
          Final acceptance is always decided by the issuing authority.
        </motion.p>

        <ul className="res__checks">
          {result.checks.map((check) => (
            <motion.li key={check.id} className="res__check" variants={itemVariants}>
              <div>
                <span className="res__check-label">{check.label}</span>
                {check.detail && <span className="res__check-detail">{check.detail}</span>}
              </div>
              <motion.span
                className={`res__pill res__pill--${check.status}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.5 }}
              >
                {check.status === "passed" && (
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2} />
                )}
                {STATUS_LABEL[check.status]}
              </motion.span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          className="doc-modal__upload res__download"
          variants={itemVariants}
          onClick={onCheckout}
        >
          <span>Download photo</span>
          <HugeiconsIcon icon={Download01Icon} size={20} color="currentColor" strokeWidth={1.5} />
        </motion.button>
      </section>

      <section className="doc-modal__right doc-modal__right--center">
        <motion.div className="res__visual" variants={panelVariants}>
          <div
            className="res__frame"
            style={{
              width: `min(${frameWidth}px, 100%)`,
              aspectRatio: `${spec.widthMm} / ${spec.heightMm}`,
            }}
          >
            <div className="res__crop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt={`Your ${documentName}`} />
            </div>

            {result.head && (
              <span
                className="res__head"
                style={{
                  top: `${Math.max(0, result.head.top)}%`,
                  height: `${Math.min(100, result.head.bottom) - Math.max(0, result.head.top)}%`,
                }}
              >
                {result.headMm && <b>{formatLength(result.headMm, spec)}</b>}
              </span>
            )}

            <span className="doc-modal__ruler doc-modal__ruler--top">
              <b>{formatLength(spec.widthMm, spec)}</b>
            </span>
            <span className="doc-modal__ruler doc-modal__ruler--left">
              <b>{formatLength(spec.heightMm, spec)}</b>
            </span>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="res__button res__button--secondary"
          // Same width as the photo above (the visual keeps 56px either side
          // of it for the rulers).
          style={{ width: `min(${frameWidth}px, calc(100% - var(--res-visual-pad, 112px)))`, maxWidth: "none" }}
          variants={itemVariants}
          onClick={onRetake}
        >
          <HugeiconsIcon icon={Camera01Icon} size={20} strokeWidth={1.8} />
          Retake photo
        </motion.button>
      </section>
    </motion.div>
  );
}
