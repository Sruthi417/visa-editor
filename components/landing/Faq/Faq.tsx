"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

import "./Faq.scss";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const faqs = [
  {
    q: "What photo sizes do you support?",
    a: "We support the official passport and visa photo sizes for many countries, such as 35 × 45 mm and 2 × 2 inch. Pick your country and document type and the size is applied for you.",
  },
  {
    q: "Can I use a photo taken on my phone?",
    a: "Yes. A clear, front-facing phone photo taken in good daylight works well. Our photo guide above shows how to hold the camera and set up the light.",
  },
  {
    q: "Will my photo be accepted?",
    a: "We check head size, framing, background and lighting against the official rules and tell you what to fix. Final acceptance is always decided by the issuing authority.",
  },
  {
    q: "How does the background removal work?",
    a: "AI separates you from the backdrop and replaces it with a plain white one. Where a country does not permit editing the background, we tell you to retake the photo instead.",
  },
  {
    q: "What is the difference between Free and Premium?",
    a: "Free gives you basic cropping, country dimensions and a standard-quality download. Premium adds full AI background removal, detailed validation and high-resolution, print-ready files for ₹49 per photo.",
  },
  {
    q: "Is my photo kept private?",
    a: "Your photo is used only to prepare your passport picture. You can delete it at any time, and we never share it with third parties.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <div className="faq__grid">
        <motion.div
          className="faq__left"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span className="faq__eyebrow" variants={item}>
            FAQ
          </motion.span>

          <motion.h2 className="faq__title" variants={item}>
            Frequently asked questions.
          </motion.h2>

          <motion.p className="faq__sub" variants={item}>
            Everything you need to know about photo sizes, checks and getting
            your passport or visa photo accepted.
          </motion.p>
        </motion.div>

        <motion.div
          className="faq__list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.q}
                className={`faq__item${isOpen ? " faq__item--open" : ""}`}
                variants={item}
              >
                <button
                  type="button"
                  className="faq__q"
                  id={`faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="faq__number">{index + 1}</span>
                  <span className="faq__q-text">{faq.q}</span>
                  <span className="faq__toggle" aria-hidden="true">
                    <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={1.8} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a-wrap"
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="faq__a">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
