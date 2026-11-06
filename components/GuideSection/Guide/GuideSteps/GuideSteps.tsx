import Image from "next/image";

import type { Guide, Step } from "../../types";
import "./GuideSteps.scss";

/** The small star in front of every point. */
function Star() {
  return (
    <svg className="guide-step__star" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2.8l2.7 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.7 6.3 20l1.4-6.3L2.9 9.4l6.4-.7L12 2.8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One step: a large white card with the text on the left and the picture inset on the right.
 * The cards are sticky, each a little lower than the one before, so as the page scrolls the
 * next step slides up and over the last one.
 */
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article
      id={step.id}
      className="guide-step"
      style={{ "--step-index": index } as React.CSSProperties}
    >
      <div className="guide-step__body">
        <span className="guide-step__chip">Step {step.number}</span>
        <h3 className="guide-step__title">{step.title}</h3>

        {step.groups.map((group, groupIndex) => (
          <div key={group.label ?? groupIndex} className="guide-step__group">
            {group.label && <p className="guide-step__label">{group.label}</p>}
            {group.text && <p className="guide-step__text">{group.text}</p>}
            {group.points && (
              <ul className="guide-step__points">
                {group.points.map((point) => (
                  <li key={point}>
                    <Star />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* A step with no photo gets the sky picture and its number instead. */}
      <div
        className={`guide-step__media${step.image ? "" : " guide-step__media--sky"}${step.frame === "square" ? " guide-step__media--square" : ""}`}
      >
        {step.image ? (
          <Image
            src={step.image}
            alt={step.alt ?? ""}
            width={1000}
            height={1570}
            sizes="(max-width: 820px) 100vw, 480px"
          />
        ) : (
          <span className="guide-step__big-number" aria-hidden="true">
            {step.number}
          </span>
        )}
      </div>
    </article>
  );
}

/** The seven steps, stacked as cards that slide over each other. */
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
