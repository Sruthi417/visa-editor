import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import Reveal from "../../shared/Reveal";
import type { Comparison } from "../../types";
import "./CompareCta.scss";

export default function CompareCta({ cta }: { cta: Comparison["cta"] }) {
  return (
    <Reveal className="compare-cta">
      <h2>{cta.title}</h2>
      <p>{cta.text}</p>
      <Link href={cta.href} className="compare-cta__button">
        {cta.label}
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
      </Link>
    </Reveal>
  );
}
