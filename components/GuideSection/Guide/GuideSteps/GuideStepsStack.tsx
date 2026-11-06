"use client";

import { useEffect, useRef } from "react";

/**
 * The list of step cards. The cards are sticky, so scrolling is what slides each one over the
 * last. The shadows of a pile would add up into a dark band down its sides, so this marks every
 * card below the top two and the CSS fades its shadow out. Everything comes from the scroll
 * position, so scrolling back brings the shadows back.
 */
export default function GuideStepsStack({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rects = cards.map((card) => card.getBoundingClientRect());

      // The top of the pile is the last card to overlap the one before it, even mid-slide.
      let top = 0;
      rects.forEach((rect, index) => {
        if (index > 0 && rect.top < rects[index - 1].bottom) top = index;
      });

      cards.forEach((card, index) => {
        card.toggleAttribute("data-shadow-off", index < top - 1);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={listRef} className="guide-steps__list">
      {children}
    </div>
  );
}
