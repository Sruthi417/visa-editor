"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GiftIcon, SparklesIcon, Tick02Icon } from "@hugeicons/core-free-icons";

import "./Pricing.scss";

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const plans = [
  {
    name: "Free",
    icon: GiftIcon,
    price: "$0",
    unit: "",
    tagline: "For casual users",
    features: [
      "Basic photo cropping",
      "Country-specific dimensions",
      "Basic photo checks",
      
    ],
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Premium",
    icon: SparklesIcon,
    price: "$25.99",
    unit: "/ photo",
    tagline: "For ready-to-download photos",
    features: [
      "AI background removal where permitted",
      "Precise crop and resizing",
      "Detailed photo validation",
      "High-resolution download",
      "Digital and print-ready formats",
    ],
    cta: "Get Premium",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing__container">
        <motion.div
          className="pricing__header"
          variants={revealFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="pricing__eyebrow">Pricing</span>
          <h2>Simple pricing, no subscriptions.</h2>
          <p>
            Start free, and pay only for the photos you want in full quality.
          </p>
        </motion.div>

        <motion.div
          className="pricing__plans"
          variants={revealFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing__plan${plan.featured ? " pricing__plan--featured" : ""}`}
            >
              <span className="pricing__icon">
                <HugeiconsIcon icon={plan.icon} size={24} strokeWidth={1.8} />
              </span>

              <h3 className="pricing__name">{plan.name}</h3>

              <div className="pricing__price">
                <span className="pricing__amount">{plan.price}</span>
                {plan.unit && <span className="pricing__unit">{plan.unit}</span>}
              </div>
              <p className="pricing__tagline">{plan.tagline}</p>

              <ul className="pricing__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/drop" className="pricing__button">
                {plan.cta}
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
