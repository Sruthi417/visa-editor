import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

import type { Blog } from "../../types";
import "./BlogCovers.scss";

/** "What this guide covers": numbered links that jump to each part of the post. */
export default function BlogCovers({ data }: { data: Blog["covers"] }) {
  return (
    <nav className="blog-covers" aria-labelledby="blog-covers-title">
      <h2 id="blog-covers-title" className="blog-covers__title">
        {data.title}
      </h2>

      <ol className="blog-covers__list">
        {data.items.map((item, index) => (
          <li key={item.href}>
            <a href={item.href} className="blog-covers__link">
              <span className="blog-covers__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="blog-covers__label">{item.label}</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={18}
                strokeWidth={1.8}
                className="blog-covers__arrow"
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
