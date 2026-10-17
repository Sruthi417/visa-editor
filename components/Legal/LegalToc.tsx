"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/** "On this page" list. Highlights the section that is currently in view. */
export default function LegalToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="legal__toc" aria-label="On this page">
      <p className="legal__toc-label">On this page</p>
      <ol className="legal__toc-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`legal__toc-link${active === item.id ? " legal__toc-link--active" : ""}`}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => setActive(item.id)}
            >
              <span className="legal__toc-number">{index + 1}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
