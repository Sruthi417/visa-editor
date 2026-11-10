"use client";

import { useEffect, useId, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export type ShowcaseItem = { title: string; text: string };

/**
 * A feature's details as an accordion, one open at a time, the first open to start. Closed
 * answers stay in the page (inert and folded away) so they are still read by search engines.
 *
 * It also measures how tall it is with its longest answer open and passes that on as
 * --acc-full. Beside a picture the accordion keeps that height whatever is open, so the text
 * column, and the picture sized to it, never change height.
 */
export default function ShowcaseAccordion({ items }: { items: ShowcaseItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;

    const measure = () => {
      let titles = 0;
      let longest = 0;
      // Fractional heights throughout: rounding each row separately drifts by a pixel or two.
      const height = (el: Element) => el.getBoundingClientRect().height;
      for (const item of Array.from(list.children)) {
        const panel = item.querySelector(".fshow__panel");
        const answer = item.querySelector(".fshow__panel-inner > p");
        if (!panel || !answer) continue;
        // The title row and its rule, whatever the answer below it is doing.
        titles += height(item) - height(panel);
        // The answer's full height: it is laid out in full even while folded away.
        longest = Math.max(longest, height(answer));
      }
      list.style.setProperty("--acc-full", `${Math.ceil(titles + longest)}px`);
    };

    // Text wraps differently at each width, so measure again when the width changes.
    let lastWidth = -1;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width === lastWidth) return;
      lastWidth = width;
      measure();
    });
    observer.observe(list);
    // And once the web fonts have loaded, since they change the line breaks.
    document.fonts?.ready.then(measure);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fshow__acc" ref={ref}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const trigger = `${base}-trigger-${index}`;
        const panel = `${base}-panel-${index}`;

        return (
          <div key={item.title} className={`fshow__item${isOpen ? " fshow__item--open" : ""}`}>
            <h4 className="fshow__item-head">
              <button
                type="button"
                className="fshow__trigger"
                id={trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.title}</span>
                <span className="fshow__chevron" aria-hidden="true">
                  <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={1.8} />
                </span>
              </button>
            </h4>
            <div
              className="fshow__panel"
              id={panel}
              role="region"
              aria-labelledby={trigger}
              inert={!isOpen}
            >
              <div className="fshow__panel-inner">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
