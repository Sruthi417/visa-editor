import { HugeiconsIcon } from "@hugeicons/react";
import {
  Layout01Icon,
  SmartPhone01Icon,
  Sun01Icon,
  Timer01Icon,
} from "@hugeicons/core-free-icons";

import type { Guide, NeedIcon } from "../../types";
import "./GuideNeeds.scss";

const ICONS: Record<NeedIcon, typeof SmartPhone01Icon> = {
  phone: SmartPhone01Icon,
  wall: Layout01Icon,
  light: Sun01Icon,
  helper: Timer01Icon,
};

/**
 * The things to have ready, as a row of small cards. Each card is white, with a small icon
 * and label on top, and under them a sky panel (the picture is its background) that holds
 * the text. The cloud in the picture peeks out at the bottom right.
 */
export default function GuideNeeds({ data }: { data: Guide["needs"] }) {
  return (
    <section id={data.id} className="guide-needs">
      <h2 className="guide-needs__title">{data.title}</h2>

      <ul className="guide-needs__grid">
        {data.items.map((item) => (
          <li key={item.label} className="guide-needs__card">
            <div className="guide-needs__head">
              <span className="guide-needs__head-icon" aria-hidden="true">
                <HugeiconsIcon icon={ICONS[item.icon]} size={18} strokeWidth={1.8} />
              </span>
              <span className="guide-needs__label">{item.label}</span>
            </div>

            <div className="guide-needs__panel">
              <p className="guide-needs__text">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
