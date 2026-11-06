import GuideButton from "../../shared/GuideButton/GuideButton";
import type { Guide } from "../../types";
import "./GuideCta.scss";

/** The last step: one line and one button. */
export default function GuideCta({ data }: { data: Guide["next"] }) {
  return (
    <section id={data.id} className="guide-cta">
      <div className="guide-cta__panel">
        <div>
          <h2 className="guide-cta__title">{data.title}</h2>
          <p className="guide-cta__text">{data.text}</p>
        </div>

        <GuideButton label={data.cta.label} />
      </div>
    </section>
  );
}
