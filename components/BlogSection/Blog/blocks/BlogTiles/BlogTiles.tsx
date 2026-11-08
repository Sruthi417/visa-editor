import { HugeiconsIcon } from "@hugeicons/react";

import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { TilesBlock } from "../../../types";
import "./BlogTiles.scss";

/** A row of small icon tiles that name the things the paragraph above lists. */
export default function BlogTiles({ data }: { data: TilesBlock }) {
  return (
    <ul className="blog-tiles">
      {data.items.map((item) => (
        <li key={item.label} className="blog-tiles__item">
          <span className="blog-tiles__icon" aria-hidden="true">
            <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={22} strokeWidth={1.6} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
