import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";

import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { CompareBlock } from "../../../types";
import "./BlogCompare.scss";

/** Pictures side by side in a white card, each with a small label on its top corner. */
export default function BlogCompare({ data }: { data: CompareBlock }) {
  return (
    <ul className="blog-compare">
      {data.items.map((item) => (
        <li key={item.label} className="blog-compare__item">
          <span className="blog-compare__chip">
            {item.icon && (
              <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={14} strokeWidth={1.9} />
            )}
            {item.label}
          </span>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(max-width: 640px) 45vw, 300px"
            className="blog-compare__image"
          />
        </li>
      ))}
    </ul>
  );
}
