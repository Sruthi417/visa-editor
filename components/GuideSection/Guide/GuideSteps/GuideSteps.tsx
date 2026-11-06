import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BrickWallIcon,
  Camera01Icon,
  FaceIdIcon,
  FocusPointIcon,
  Globe02Icon,
  Sun01Icon,
  TShirtIcon,
} from "@hugeicons/core-free-icons";

import RichText from "../../shared/RichText/RichText";
import type { Guide, Step, StepIcon } from "../../types";
import GuideStepsStack from "./GuideStepsStack";
import "./GuideSteps.scss";

const ICONS: Record<StepIcon, typeof Camera01Icon> = {
  camera: Camera01Icon,
  background: BrickWallIcon,
  lighting: Sun01Icon,
  face: FaceIdIcon,
  clothing: TShirtIcon,
  quality: FocusPointIcon,
  country: Globe02Icon,
};

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
        <span className="guide-step__icon" aria-hidden="true">
          <HugeiconsIcon icon={ICONS[step.icon]} size={26} strokeWidth={1.7} />
        </span>
        <h3 className="guide-step__title">{step.title}</h3>

        {step.groups.map((group, groupIndex) => (
          <div key={group.label ?? groupIndex} className="guide-step__group">
            {group.label && <p className="guide-step__label">{group.label}</p>}
            {group.text && (
              <p className="guide-step__text">
                <RichText text={group.text} />
              </p>
            )}
            {group.points && (
              <ul className="guide-step__points">
                {group.points.map((point) => (
                  <li key={point}>
                    <span>
                      <RichText text={point} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* A step with no photo gets the sky picture and its icon, large, instead. */}
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
          <span className="guide-step__big-icon" aria-hidden="true">
            <HugeiconsIcon icon={ICONS[step.icon]} size={48} strokeWidth={1.5} />
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

      <GuideStepsStack>
        {data.items.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} />
        ))}
      </GuideStepsStack>
    </section>
  );
}
