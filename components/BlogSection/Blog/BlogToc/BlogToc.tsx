"use client";

import { useEffect, useRef, useState } from "react";

import "./BlogToc.scss";

type Props = {
  items: { id: string; label: string }[];
};

// A few pixels of slack, so a section counts as reached the moment a jump lands on it.
const SLACK = 8;

// How long a clicked link stays marked if the browser never says the scroll has ended.
const JUMP_TIMEOUT = 1500;

/**
 * Where a section's top sits after a jump to it: the page's scroll-padding-top (which clears
 * the fixed navbar) plus the section's own scroll-margin-top.
 */
function landingLine(section: HTMLElement): number {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  return padding + margin + SLACK;
}

/** The sticky list of sections beside the post. The section being read is marked in blue. */
export default function BlogToc({ items }: Props) {
  const [active, setActive] = useState(items[0]?.id);
  // True while the page scrolls to a clicked link, so the sections it passes don't flash.
  const jumping = useRef(false);
  const jumpTimer = useRef<number | undefined>(undefined);
  const ids = items.map((item) => item.id).join(",");

  useEffect(() => {
    const sections = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let lines = sections.map(landingLine);
    let frame = 0;

    const update = () => {
      frame = 0;
      if (jumping.current) return;

      // The current section is the last one that has reached its landing line.
      let current = sections[0].id;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top > lines[i]) break;
        current = sections[i].id;
      }

      // The last sections are short and may never reach the line, so the page end marks the last one.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atEnd ? sections[sections.length - 1].id : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      lines = sections.map(landingLine);
      onScroll();
    };

    // A clicked jump has finished. The clicked link stays marked until the reader scrolls again,
    // even if the page couldn't scroll far enough for that section to reach the line.
    const onScrollEnd = () => {
      jumping.current = false;
      window.clearTimeout(jumpTimer.current);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(jumpTimer.current);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  const jumpTo = (id: string) => {
    setActive(id);
    jumping.current = true;
    // Browsers without a scrollend event, or a click that doesn't need to scroll.
    window.clearTimeout(jumpTimer.current);
    jumpTimer.current = window.setTimeout(() => {
      jumping.current = false;
    }, JUMP_TIMEOUT);
  };

  return (
    <nav className="blog-toc" aria-label="On this page">
      <ol className="blog-toc__list">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`blog-toc__link${isActive ? " blog-toc__link--active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => jumpTo(item.id)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
