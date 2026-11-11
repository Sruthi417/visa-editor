"use client";

import { motion, MotionConfig, type Variants } from "motion/react";

import GetStartedButton from "../../DocumentModal/GetStartedButton";
import HeroArt from "./HeroArt";
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
 * The landing hero with the copy on the left and, on the right, everyday
 * photos flying over to finished passport photos.
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
            <motion.p className="hero-section__description" variants={revealFromBottom}>
              Create passport and visa photos that
              <br className="hero-section__br" /> match your destination&apos;s requirements
            </motion.p>
            <motion.div variants={revealFromBottom}>
              <GetStartedButton className="hero-section__button" />
            </motion.div>
          </motion.div>

          <div className="hero-section__visual">
            <HeroArt />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
