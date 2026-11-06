import GuideButton from "../../shared/GuideButton/GuideButton";
import type { Guide } from "../../types";
import "./GuideCheck.scss";

/** The photo checker. It is planned, so the card says so plainly. */
export default function GuideCheck({ data }: { data: Guide["check"] }) {
  return (
    <section id={data.id} className="guide-check">
      <div className="guide-check__copy">
        <span className="guide-check__badge">{data.badge}</span>
        <h2 className="guide-check__title">{data.title}</h2>
        <p className="guide-check__text">{data.text}</p>
      </div>

      <GuideButton label={data.cta.label} variant="light" />
    </section>
  );
}
