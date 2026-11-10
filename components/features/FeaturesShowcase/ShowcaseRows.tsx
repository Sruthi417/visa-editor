"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The list of feature rows. It finds the tallest text column (each held at its tallest by its
 * accordion, see --acc-full) and passes that height on as --media-h, so every picture is the
 * same size: as tall as the longest feature.
 */
export default function ShowcaseRows({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = ref.current;
    if (!rows) return;
    const columns = Array.from(rows.querySelectorAll<HTMLElement>(".fshow__content"));

    const update = () => {
      const tallest = Math.max(...columns.map((column) => column.getBoundingClientRect().height));
      rows.style.setProperty("--media-h", `${Math.ceil(tallest)}px`);
    };

    // Runs once on start, then whenever a column changes height (new width, fonts loading).
    const observer = new ResizeObserver(update);
    columns.forEach((column) => observer.observe(column));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fshow__rows" ref={ref}>
      {children}
    </div>
  );
}
