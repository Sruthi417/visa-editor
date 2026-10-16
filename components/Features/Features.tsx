"use client";

import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  CropIcon,
  Globe02Icon,
  MagicWand01Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";

import "./Features.scss";

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// Drop the image files into /public/features with these names.
const features = [
  {
    title: "AI Image Analysis",
    description:
      "Analyse your photo with AI to assess background, facial positioning, and image clarity to meet your passport or visa photo requirements.",
    list: [
      "Country-Specific Backgrounds",
      "Accurate Positioning & Edge Detection",
      "Shadow Removal",
      "One-Tap Processing",
    ],
    image: "/features/card1.png",
    icon: MagicWand01Icon,
  },
  {
    title: "Cropping & Sizing",
    description:
      "Head size, framing and proportions are set to the official specification for your document automatically.",
    list: [
      "Face Detection",
      "Correct Head Size",
      "Centred Framing",
      "Exact Dimensions",
    ],
    image: "/features/card2.png",
    icon: CropIcon,
  },
  {
    title: "Country Specifications",
    description:
      "Pick your country and document type and we apply the exact photo rules for it, so your application is not rejected.",
    list: [
      "Passport and Visa Presets",
      "Up-to-Date Requirements",
      "Compliance Checks",
      "Clear Fix Suggestions",
    ],
    image: "/features/card3.png",
    icon: Globe02Icon,
  },
  {
    title: "Print-Ready Sheets",
    description:
      "Download a single photo or a ready-to-print sheet at 300 DPI, and print it at home or at any photo shop.",
    list: [
      "4 × 6 in Photo Sheets",
      "300 DPI Quality",
      "Digital Download",
      "Home or Shop Printing",
    ],
    image: "/features/card4.png",
    icon: PrinterIcon,
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__wrap">
        <motion.div
          className="features__header"
          variants={revealFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="features__eyebrow">Features</span>
          <h2>Everything you need for a perfect photo.</h2>
          <p>
            From the first snapshot to the final print, get your passport or visa photo ready with ease.
          </p>
        </motion.div>

        <div className="features__cards">
          {features.map((feature, idx) => (
            <motion.div
              className={`features__card${idx % 2 !== 0 ? " features__card--reverse" : ""}`}
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={item}
            >
              <div className="features__content">
                <span className="features__icon">
                  <HugeiconsIcon
                    icon={feature.icon}
                    size={26}
                    strokeWidth={1.8}
                  />
                </span>
                <h3 className="features__title">{feature.title}</h3>
                <p className="features__desc">{feature.description}</p>
                <ul className="features__list">
                  {feature.list.map((listItem) => (
                    <li key={listItem}>
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={20}
                        strokeWidth={1.8}
                      />
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="features__illustration">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="features__img"
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
