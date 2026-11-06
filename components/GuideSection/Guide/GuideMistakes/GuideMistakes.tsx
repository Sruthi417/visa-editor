import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import type { Guide } from "../../types";
import "./GuideMistakes.scss";

/** Each common mistake as a small card: what goes wrong, then the fix. */
export default function GuideMistakes({ data }: { data: Guide["mistakes"] }) {
  return (
    <section id={data.id} className="guide-mistakes">
      <h2 className="guide-mistakes__title">{data.title}</h2>

      <ul className="guide-mistakes__grid">
        {data.rows.map((row) => (
          <li key={row.mistake} className="guide-mistakes__card">
            <div>
              <span className="guide-mistakes__label">{data.mistakeLabel}</span>
              <p className="guide-mistakes__mistake">{row.mistake}</p>
            </div>

            <HugeiconsIcon
              icon={ArrowRight02Icon}
              size={20}
              strokeWidth={1.6}
              className="guide-mistakes__arrow"
            />

            <div>
              <span className="guide-mistakes__label guide-mistakes__label--fix">
                {data.fixLabel}
              </span>
              <p className="guide-mistakes__fix">{row.fix}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
