"use client";

import { motion, MotionConfig, type Variants } from "motion/react";

import HeroArt from "./HeroArt";
import UploadDrop from "./UploadDrop";
import "./HeroSection.scss";

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * The landing hero: the copy and the upload drop box on the left, the before /
 * after photo in an airplane window on the right.
 */
export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="hero-section-bg" id="home">
        <div className="hero-section">
          <motion.div
            className="hero-section__content"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className="hero-section__title" variants={revealFromBottom}>
              Passport &amp; visa
              <br />
              photos in seconds
            </motion.h1>
            {/* The subtitle (as wide as the title) and the upload panel under it. */}
            <div className="hero-section__lead">
              <motion.p className="hero-section__description" variants={revealFromBottom}>
                Get passport and visa photos with the right size, background and framing for
                your destination
              </motion.p>
              <motion.div className="hero-section__actions" variants={revealFromBottom}>
                <UploadDrop />
              </motion.div>
            </div>
          </motion.div>

          <div className="hero-section__visual">
            <HeroArt />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
