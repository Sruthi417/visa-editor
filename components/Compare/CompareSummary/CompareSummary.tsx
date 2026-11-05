import Reveal from "../Reveal";
import StatusChip from "../StatusChip/StatusChip";
import type { Comparison } from "../types";
import "./CompareSummary.scss";

export default function CompareSummary({ summary }: { summary: Comparison["summary"] }) {
  return (
    <Reveal className="compare-summary" id="summary">
      <h2 className="compare-summary__heading">{summary.title}</h2>
      {summary.paragraphs.map((text) => (
        <p key={text} className="compare-summary__text">
          {text}
        </p>
      ))}

      <div className="compare-summary__cards">
        {summary.cards.map((card) => (
          <div
            key={card.name}
            className={`compare-summary__card${card.tone === "planned" ? " compare-summary__card--featured" : ""}`}
          >
            <div className="compare-summary__card-top">
              <span className="compare-summary__card-name">{card.name}</span>
              <StatusChip tone={card.tone}>{card.badge}</StatusChip>
            </div>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
