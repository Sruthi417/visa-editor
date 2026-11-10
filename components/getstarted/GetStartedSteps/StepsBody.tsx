"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { STEP_ART, STEP_ART_LABELS } from "./StepArt";

type Step = { title: string; text: string };

// How long each picture shows before the next one comes in.
const DELAY = 4000;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * The steps on the left and a picture of each on the right. The pictures move on by themselves
 * every few seconds, in a loop, and the arrows and dots move them by hand. The step whose
 * picture is showing has a ring round its number. The loop waits while the pointer or focus is
 * on the pictures, while they are off screen, and for people who ask for reduced motion.
 */
export default function StepsBody({ steps }: { steps: Step[] }) {
  const count = steps.length;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(false);
  const still = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Each change of picture starts the wait again, so a click is never followed by a quick jump.
  useEffect(() => {
    if (held || !seen || still) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), DELAY);
    return () => window.clearTimeout(timer);
  }, [active, held, seen, still, count]);

  const go = (index: number) => setActive((index + count) % count);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
  };

  return (
    <div className="gs-steps__body">
      <ol className="gs-steps__list">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`gs-steps__step${index === active ? " is-on" : ""}`}
            aria-current={index === active ? "step" : undefined}
          >
            <span className="gs-steps__num" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h3 className="gs-steps__title">{step.title}</h3>
              <p className="gs-steps__text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div
        ref={sliderRef}
        className="gs-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Each step, pictured"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={onBlur}
      >
        <div className="gs-slider__view" aria-live={held || still ? "polite" : "off"}>
          {STEP_ART.map((Art, index) => (
            <div
              key={steps[index].title}
              className={`gs-slider__slide${index === active ? " is-on" : ""}`}
              role="img"
              aria-roledescription="slide"
              aria-label={`Step ${index + 1} of ${count}: ${STEP_ART_LABELS[index]}`}
              aria-hidden={index !== active}
              inert={index !== active}
            >
              <div className="gs-slider__stage">
                <Art />
              </div>
            </div>
          ))}
        </div>

        <div className="gs-slider__controls">
          <button
            type="button"
            className="gs-slider__arrow"
            aria-label="Previous step"
            onClick={() => go(active - 1)}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2.2} />
          </button>
          <div className="gs-slider__dots">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                className={`gs-slider__dot${index === active ? " is-on" : ""}`}
                aria-label={`Show step ${index + 1}: ${step.title}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => go(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="gs-slider__arrow"
            aria-label="Next step"
            onClick={() => go(active + 1)}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
