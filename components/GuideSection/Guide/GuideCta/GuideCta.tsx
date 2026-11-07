import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import Reveal from "../../shared/Reveal";
import type { Guide } from "../../types";
import "./GuideCta.scss";

/** The last step: a sky banner with its content centred, the same as the Compare banner. */
export default function GuideCta({ data }: { data: Guide["next"] }) {
  return (
    <section id={data.id} className="guide-cta">
      <Reveal className="guide-cta__panel">
        <h2>{data.title}</h2>
        <p>{data.text}</p>
        <Link href={data.cta.href} className="guide-cta__button">
          {data.cta.label}
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Link>
      </Reveal>
    </section>
  );
}
