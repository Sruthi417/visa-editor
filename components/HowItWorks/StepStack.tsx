"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scrubs `--lift` (0 to 1) on every step card after the first as its top
 * travels from 92% to 28% of the viewport; `.how__card--lift` turns that into
 * the upward shadow that separates a card sliding over the one already stuck.
 * Only above 900px, where the cards are sticky; reduced motion gets the end
 * state with no scrub.
 */
export default function StepStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-step-card]"),
    ).slice(1);
    if (!cards.length) return;

    const wide = window.matchMedia("(min-width: 901px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const card of cards) {
        const top = card.getBoundingClientRect().top;
        const p = reduced.matches
          ? 1
          : Math.min(1, Math.max(0, (vh * 0.92 - top) / (vh * 0.64)));
        card.style.setProperty("--lift", p.toFixed(3));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const sync = () => {
      if (wide.matches === active) return;
      active = wide.matches;
      if (active) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        update();
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", schedule);
    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="how__stack">
      {children}
    </div>
  );
}
