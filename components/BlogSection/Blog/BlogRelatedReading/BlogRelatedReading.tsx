import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import { BLOG_ICONS } from "../../shared/blogIcons";
import type { Blog } from "../../types";
import "./BlogRelatedReading.scss";

/** "Related reading": a card for each guide or post that goes deeper on one part of this one. */
export default function BlogRelatedReading({ data }: { data: Blog["related"] }) {
  return (
    <section id={data.id} className="blog-reading">
      <h2 className="blog-reading__title">{data.title}</h2>

      <ul className="blog-reading__list">
        {data.items.map((item) => (
          <li key={item.href}>
            {/* Many of these guides are still to be written, so they aren't fetched ahead of a click. */}
            <Link href={item.href} prefetch={false} className="blog-reading__link">
              <span className="blog-reading__icon" aria-hidden="true">
                <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={20} strokeWidth={1.7} />
              </span>
              <span className="blog-reading__label">{item.label}</span>
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={18}
                strokeWidth={1.8}
                className="blog-reading__arrow"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
