"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

import GetStartedButton from "../DocumentModal/GetStartedButton";
import "./Hero.scss";

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

const imageReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

export default function Hero() {
  return (
    <section className="hero-bg" id="home">
      <div className="hero">
        <motion.div
          className="hero__content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero__title" variants={revealFromBottom}>
            Passport &amp; visa
            <br className="hero__br" />
            photos in seconds
          </motion.h1>
          <motion.p className="hero__description" variants={revealFromBottom}>
            Create passport and visa photos that
            <br className="hero__br" />
            match your destination&apos;s requirements
          </motion.p>
          <motion.div variants={revealFromBottom}>
            <GetStartedButton className="hero__button" />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          variants={imageReveal}
          initial="hidden"
          animate="visible"
        >
          <Image
            className="hero__image"
            src="/hero2.png"
            alt="Passport and visa photo preview with before and after comparison"
            width={1920}
            height={1080}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
