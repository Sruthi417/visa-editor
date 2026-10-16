"use client";

import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { EASE, itemVariants, panelVariants, viewVariants } from "./motion";
import { STEPS, type FrameBox } from "./processPhoto";
import type { PhotoSpec } from "./specs";

const FRAME_HEIGHT = 380;

type Props = {
  titleId: string;
  originalUrl: string;
  /** The latest picture from the pipeline; the upload until a step produces one. */
  previewUrl: string | null;
  /** The step in progress. Equal to STEPS.length once everything is done. */
  stepIndex: number;
  face: FrameBox | null;
  spec: PhotoSpec;
};

function getStepSub(stepId: string, spec: PhotoSpec) {
  switch (stepId) {
    case "crop":
      return "Centering head and aligning eye level to official guidelines";
    case "background":
      return `Isolating subject and applying compliant ${spec.background.toLowerCase()} background`;
    case "resize":
      return `Scaling to exact ${spec.widthMm} × ${spec.heightMm} mm at 300 DPI`;
    case "analyse":
      return "Checking biometric symmetry, lighting balance, and compliance rules";
    case "finalise":
      return `Encoding JPEG within ${spec.fileKb[0]}–${spec.fileKb[1]} KB file size limits`;
    default:
      return "";
  }
}

export default function ProcessingView({
  titleId,
  originalUrl,
  previewUrl,
  stepIndex,
  face,
  spec,
}: Props) {
  const finished = stepIndex >= STEPS.length;
  const stepId = finished ? "done" : STEPS[stepIndex].id;
  const shown = previewUrl ?? originalUrl;
  const frameWidth = (FRAME_HEIGHT * spec.widthMm) / spec.heightMm;

  return (
    <motion.div
      className="doc-modal__grid doc-modal__grid--process"
      variants={viewVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <section className="doc-modal__left">
        <motion.h2 id={titleId} className="doc-modal__title" variants={itemVariants}>
          Preparing your photo
        </motion.h2>

        <ol className="proc__steps" aria-live="polite">
          {STEPS.map((step, index) => {
            const state =
              index < stepIndex ? "done" : index === stepIndex ? "active" : "pending";

            return (
              <motion.li
                key={step.id}
                className={`proc__step proc__step--${state}`}
                variants={itemVariants}
                aria-current={state === "active" ? "step" : undefined}
              >
                <span className="proc__marker">
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "active" ? (
                      <motion.span
                        key="number"
                        className="proc__number"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        {index + 1}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="tick"
                        className="proc__tick"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2.2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <div className="proc__text">
                  <span className="proc__label">{step.label}</span>
                  <p className="proc__sub">{getStepSub(step.id, spec)}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      <section className="doc-modal__right doc-modal__right--center">
        <motion.div className="proc__card" variants={panelVariants}>
          <div
            className={`proc__frame proc__frame--${stepId}`}
            style={{
              width: `min(${frameWidth}px, 100%)`,
              aspectRatio: `${spec.widthMm} / ${spec.heightMm}`,
            }}
          >
            <div className="proc__clip">
              <AnimatePresence initial={false}>
                <motion.img
                  key={shown}
                  className="proc__image"
                  src={shown}
                  alt="Your photo"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>

              {/* The glow trails the scan line down the photo. */}
              {(stepId === "crop" || stepId === "background" || stepId === "analyse") && (
                <span className="proc__glow" />
              )}
            </div>

            {(stepId === "crop" || stepId === "background" || stepId === "analyse") && (
              <span className="proc__line" />
            )}

            {stepId === "resize" && <span className="proc__corners" />}

            {stepId === "analyse" && face && (
              <span
                className="proc__face"
                style={{
                  left: `${face.x}%`,
                  top: `${face.y}%`,
                  width: `${face.w}%`,
                  height: `${face.h}%`,
                }}
              />
            )}

            <AnimatePresence>
              {(stepId === "finalise" || stepId === "done") && (
                <motion.span
                  className="proc__done"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <HugeiconsIcon icon={Tick02Icon} size={34} strokeWidth={2.4} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
