"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

import type { Blog } from "../../types";
import "./BlogFaq.scss";

/**
 * The questions as an accordion, one answer open at a time. Every answer stays in the page
 * (closed ones are only folded away), so search engines and find-in-page still see them.
 */
export default function BlogFaq({ data }: { data: Blog["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={data.id} className="blog-faq">
      <span className="blog-faq__eyebrow">{data.eyebrow}</span>
      <h2 className="blog-faq__title">{data.title}</h2>

      <div className="blog-faq__list">
        {data.items.map((item, index) => {
          const isOpen = open === index;

          return (
            <div key={item.q} className={`blog-faq__item${isOpen ? " blog-faq__item--open" : ""}`}>
              <h3 className="blog-faq__heading">
                <button
                  type="button"
                  className="blog-faq__question"
                  id={`blog-faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`blog-faq-panel-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="blog-faq__number">{index + 1}</span>
                  <span className="blog-faq__question-text">{item.q}</span>
                  <span className="blog-faq__toggle" aria-hidden="true">
                    <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={1.8} />
                  </span>
                </button>
              </h3>

              <div
                className="blog-faq__panel"
                id={`blog-faq-panel-${index}`}
                role="region"
                aria-labelledby={`blog-faq-trigger-${index}`}
                inert={!isOpen}
              >
                <div className="blog-faq__panel-inner">
                  <p className="blog-faq__answer">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
