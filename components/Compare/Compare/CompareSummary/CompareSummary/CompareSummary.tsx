import Image from "next/image";

import Reveal from "../Reveal";
import type { Comparison, SummaryCard } from "../types";
import "./CompareSummary.scss";

function Card({ card }: { card: SummaryCard }) {
  return (
    <article className="compare-summary__card">
      <div className="compare-summary__image">
        <Image src={card.image} alt={card.name} width={1672} height={941} sizes="(max-width: 820px) 90vw, 420px" />
      </div>
      <p className="compare-summary__paragraph">{card.paragraph}</p>
      <div className="compare-summary__note">
        <h3 className="compare-summary__name">{card.name}</h3>
        <p>{card.text}</p>
      </div>
    </article>
  );
}

export default function CompareSummary({ summary }: { summary: Comparison["summary"] }) {
  const [left, right] = summary.cards;

  return (
    <Reveal className="compare-summary" id="summary">
      <h2 className="compare-summary__heading">{summary.title}</h2>

      <div className="compare-summary__row">
        <Card card={left} />
        <Card card={right} />
      </div>
    </Reveal>
  );
}
