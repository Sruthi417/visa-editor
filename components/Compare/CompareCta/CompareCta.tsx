import Link from "next/link";

import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareCta.scss";

export default function CompareCta({ cta }: { cta: Comparison["cta"] }) {
  return (
    <Reveal className="compare-cta">
      <div>
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
      </div>
      <Link href={cta.href} className="compare-cta__button">
        {cta.label}
      </Link>
    </Reveal>
  );
}
