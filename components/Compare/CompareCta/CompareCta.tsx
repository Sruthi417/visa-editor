import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareCta.scss";

export default function CompareCta({ cta }: { cta: Comparison["cta"] }) {
  return (
    <Reveal className="compare-cta">
      <div className="compare-cta__content">
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
        <Link href={cta.href} className="compare-cta__button">
          {cta.label}
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Link>
      </div>

      <div className="compare-cta__image">
        <Image src={cta.image} alt="" fill sizes="(max-width: 820px) 100vw, 380px" />
      </div>
    </Reveal>
  );
}
