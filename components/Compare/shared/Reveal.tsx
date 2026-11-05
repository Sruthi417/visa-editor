"use client";

import { motion, type Variants } from "motion/react";

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/** Fades a block up the first time it scrolls into view, like the home sections. */
export default function Reveal({ children, className, id }: Props) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={revealFromBottom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
