import Image from "next/image";

import type { Guide, Step } from "../../types";
import "./GuideSteps.scss";

function StepCard({ step, index }: { step: Step; index: number }) {
  const hasImage = Boolean(step.image);
  // Pictures alternate sides down the page; steps without one are text only.
  const flip = hasImage && index % 2 === 1;

  return (
    <article
      id={step.id}
      className={`guide-step${hasImage ? "" : " guide-step--text"}${flip ? " guide-step--flip" : ""}`}
    >
      <div className="guide-step__body">
        <span className="guide-step__number">{step.number}</span>
        <h3 className="guide-step__title">{step.title}</h3>

        {step.groups.map((group, groupIndex) => (
          <div key={group.label ?? groupIndex} className="guide-step__group">
            {group.label && <p className="guide-step__label">{group.label}</p>}
            {group.text && <p className="guide-step__text">{group.text}</p>}
            {group.points && (
              <ul className="guide-step__points">
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {step.image && (
        <div className={`guide-step__media${step.frame === "square" ? " guide-step__media--square" : ""}`}>
          <Image
            src={step.image}
            alt={step.alt ?? ""}
            width={1000}
            height={1570}
            sizes="(max-width: 820px) 100vw, 360px"
          />
        </div>
      )}
    </article>
  );
}

/** The seven steps: a card each, with a photo beside the text where there is one. */
export default function GuideSteps({ data }: { data: Guide["steps"] }) {
  return (
    <section id={data.id} className="guide-steps">
      <h2 className="guide-steps__title">{data.title}</h2>

      <div className="guide-steps__list">
        {data.items.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
