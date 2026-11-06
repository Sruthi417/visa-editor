import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

import type { Guide } from "../../types";
import "./GuideNote.scss";

/** A short note on how passport and visa photos differ. */
export default function GuideNote({ data }: { data: Guide["note"] }) {
  return (
    <section id={data.id} className="guide-note">
      <span className="guide-note__icon" aria-hidden="true">
        <HugeiconsIcon icon={InformationCircleIcon} size={24} strokeWidth={1.7} />
      </span>

      <div>
        <h2 className="guide-note__title">{data.title}</h2>
        <p className="guide-note__text">{data.text}</p>
      </div>
    </section>
  );
}
