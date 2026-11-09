"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

import type { BlogImage } from "../../../types";
import "./BlogSlider.scss";

type Props = {
  /** Names the set of pictures for screen readers. */
  label: string;
  items: { label: string; image: BlogImage }[];
  /** The width the pictures are shown at, for the browser to pick the right file. */
  sizes?: string;
  /**
   * The picture box takes its parent's height instead of the pictures' own, with the pictures
   * at its foot. The dots hang just below the box, so the box alone matches the parent.
   */
  fill?: boolean;
};

/**
 * Pictures one at a time, starting with the first. The arrows and dots move between them, and
 * on a touch screen the pictures can be swiped. Nothing moves on its own.
 */
export default function BlogSlider({
  label,
  items,
  sizes = "(max-width: 720px) 100vw, 340px",
  fill = false,
}: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = items.length;

  const goTo = useCallback(
    (target: number) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(count - 1, target));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
      setIndex(next);
    },
    [count],
  );

  // The track scrolls sideways, so a swipe moves it too. This keeps the dots in step.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (el.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div
      className={`blog-slider${fill ? " blog-slider--fill" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div className="blog-slider__frame">
        <div className="blog-slider__track" ref={track}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className="blog-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${item.label}`}
              aria-hidden={i !== index}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes={sizes}
                style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="blog-slider__arrow blog-slider__arrow--prev"
          aria-label="Previous picture"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          className="blog-slider__arrow blog-slider__arrow--next"
          aria-label="Next picture"
          disabled={index === count - 1}
          onClick={() => goTo(index + 1)}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="blog-slider__dots">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            className={`blog-slider__dot${i === index ? " blog-slider__dot--active" : ""}`}
            aria-label={`Show ${item.label}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Says which picture is showing, for screen readers. */}
      <p className="blog-slider__status" aria-live="polite">
        {items[index]?.label}, {index + 1} of {count}
      </p>
    </div>
  );
}
