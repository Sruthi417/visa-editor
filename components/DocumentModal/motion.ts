import type { Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One view of the window (choose, processing, result). The view fades and
 * lifts in with a touch of blur, its children follow in a stagger, and it
 * lifts away the other direction when it leaves.
 */
export const viewVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.09,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.985,
    filter: "blur(8px)",
    transition: { duration: 0.32, ease: EASE },
  },
};

/** Text, rows and buttons inside a view. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** The picture panel slides in from the side. */
export const panelVariants: Variants = {
  hidden: { opacity: 0, x: 44, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};
