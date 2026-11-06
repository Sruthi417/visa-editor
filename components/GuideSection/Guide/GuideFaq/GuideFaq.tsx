"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

import type { Guide } from "../../types";
import "./GuideFaq.scss";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Questions on the left, an accordion on the right. One answer is open at a time. */
export default function GuideFaq({ data }: { data: Guide["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="guide-faq" id={data.id}>
      <div className="guide-faq__grid">
        <div className="guide-faq__intro">
          <span className="guide-faq__eyebrow">{data.eyebrow}</span>
          <h2 className="guide-faq__title">{data.title}</h2>
          <p className="guide-faq__sub">{data.sub}</p>
        </div>

        <div className="guide-faq__list">
          {data.items.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={item.q}
                className={`guide-faq__item${isOpen ? " guide-faq__item--open" : ""}`}
              >
                <button
                  type="button"
                  className="guide-faq__question"
                  id={`guide-faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`guide-faq-panel-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="guide-faq__number">{index + 1}</span>
                  <span className="guide-faq__question-text">{item.q}</span>
                  <span className="guide-faq__toggle" aria-hidden="true">
                    <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={1.8} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="guide-faq__answer-wrap"
                      id={`guide-faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`guide-faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="guide-faq__answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
