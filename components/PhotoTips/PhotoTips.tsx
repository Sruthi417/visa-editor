"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import "./PhotoTips.scss";

// Each tip carries the picture shown on the right while it is selected.
// Drop the image files into /public/photo-tips with these names.
const tips = [
  {
    number: "01.",
    title: "Consider the distance",
    description:
      "Keep your front-facing camera 16–20 inch (40–50 cm) away from the face. For rear cameras, keep a 4–6 foot (1–2 meter) distance.",
    image: "/photo1.png",
    alt: "Phone held at arm's length from the face",
  },
  {
    number: "02.",
    title: "Keep your head and body straight",
    description:
      "Look directly into the camera and avoid tilting your body. Remember, portrait mode is unacceptable for passport photos.",
    image: "/photo3.png",
    alt: "Head and body facing the camera straight on",
  },
  {
    number: "03.",
    title: "Prepare good lighting",
    description:
      "Take your passport photos in a daylight setting, like near a window on a sunny day. Shadows on your face or in the background are not permitted.",
    image: "/photo2.png",
    alt: "Face lit by soft daylight from a window",
  },
  // {
  //   number: "04.",
  //   title: "Keep a neutral expression",
  //   description:
  //     "Keep both eyes open and your mouth closed, with a natural, relaxed face. Big smiles and raised eyebrows are not accepted.",
  //   image: "/photo-tips/expression.png",
  //   alt: "Neutral expression with eyes open and mouth closed",
  // },
  {
    number: "04.",
    title: "Remove glasses and accessories",
    description:
      "Take off hats, headphones and glasses so nothing covers or frames your face. Religious or medical head coverings are allowed if your whole face is visible.",
    image: "/photo4.png",
    alt: "Face with no glasses, hat or headphones",
  },
];

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function PhotoTips() {
  // Exactly one item is always open, and its picture is the one on show.
  // Choosing another item switches to it; the open item cannot be closed.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="tips" id="photo-tips">
      <div className="tips__container">
        <motion.div
          className="tips__header"
          variants={revealFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="tips__eyebrow">Photo guide</span>
          <h2>Tips for taking a compliant photo</h2>
          <p>
            Follow these steps before you upload, and your picture will
            pass the official passport requirements first time.
          </p>
        </motion.div>

        <motion.div
          className="tips__content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div className="tips__accordion" variants={revealFromBottom}>
            {tips.map((tip, index) => {
              const open = activeIndex === index;

              return (
                <div
                  className={`tips__item${open ? " tips__item--active" : ""}`}
                  key={tip.number}
                >
                  <button
                    type="button"
                    className="tips__trigger"
                    id={`tips-trigger-${index}`}
                    aria-expanded={open}
                    aria-controls={`tips-panel-${index}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="tips__trigger-content">
                      <span className="tips__number">{tip.number}</span>
                      <h3>{tip.title}</h3>
                    </span>
                    <span className="tips__icon" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className="tips__answer"
                    id={`tips-panel-${index}`}
                    role="region"
                    aria-labelledby={`tips-trigger-${index}`}
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="tips__answer-inner">
                      <p>{tip.description}</p>

                      {/* On small screens the picture opens with its tip,
                          instead of sitting below the whole list. */}
                      <div className="tips__inline-visual">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tip.image} alt={tip.alt} loading="lazy" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div className="tips__visual" variants={revealFromBottom}>
            <div className="tips__visual-bg" />
            <div className="tips__visual-grain" />
            {tips.map((tip, index) => (
              <div
                key={tip.number}
                className={`tips__slide${
                  activeIndex === index ? " tips__slide--active" : ""
                }`}
                aria-hidden={activeIndex !== index}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="tips__image"
                  src={tip.image}
                  alt={tip.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
