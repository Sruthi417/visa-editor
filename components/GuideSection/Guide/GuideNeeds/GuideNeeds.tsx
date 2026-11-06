import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  Layout01Icon,
  SmartPhone01Icon,
  Sun01Icon,
  Timer01Icon,
} from "@hugeicons/core-free-icons";

import type { Guide, NeedIcon } from "../../types";
import "./GuideNeeds.scss";

const ICONS: Record<NeedIcon, typeof File01Icon> = {
  phone: SmartPhone01Icon,
  wall: Layout01Icon,
  light: Sun01Icon,
  helper: Timer01Icon,
  rules: File01Icon,
};

/** The things to have ready, as a row of small cards. */
export default function GuideNeeds({ data }: { data: Guide["needs"] }) {
  return (
    <section id={data.id} className="guide-needs">
      <h2 className="guide-needs__title">{data.title}</h2>

      <ul className="guide-needs__grid">
        {data.items.map((item) => (
          <li key={item.text} className="guide-needs__card">
            <span className="guide-needs__icon" aria-hidden="true">
              <HugeiconsIcon icon={ICONS[item.icon]} size={22} strokeWidth={1.7} />
            </span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
