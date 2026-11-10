import { COUNTRY_COUNT, HERO_SPEC, SPEC_COUNT, checksFor } from "../../features/featureData";
import "./AboutNumbers.scss";

// Every number is read from the editor's own specs and checks.
const STATS = [
  { value: String(SPEC_COUNT), label: "passport and visa photo specs" },
  { value: String(COUNTRY_COUNT), label: "countries, plus the Schengen visa" },
  { value: String(checksFor(HERO_SPEC).length), label: "requirement checks on every photo" },
  { value: String(HERO_SPEC.dpi), label: "DPI, ready to print or upload" },
];

/**
 * FlyFrame in four numbers, on a light blue band. It follows "Why FlyFrame" closely, as the
 * scale behind that story, so it has no heading of its own.
 */
export default function AboutNumbers() {
  return (
    <section className="ab-numbers" id="in-numbers" aria-label="FlyFrame in numbers">
      <div className="ab-numbers__wrap">
        <dl className="ab-numbers__grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="ab-numbers__stat">
              <dt className="ab-numbers__label">{stat.label}</dt>
              <dd className="ab-numbers__value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
