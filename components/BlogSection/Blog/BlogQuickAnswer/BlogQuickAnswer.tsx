import { HugeiconsIcon } from "@hugeicons/react";
import { BulbIcon, Tick02Icon } from "@hugeicons/core-free-icons";

import RichText from "../../shared/RichText/RichText";
import type { Blog } from "../../types";
import "./BlogQuickAnswer.scss";

/** The short answer at the top of the post: a tinted card of ticked points. */
export default function BlogQuickAnswer({ data }: { data: NonNullable<Blog["quickAnswer"]> }) {
  return (
    <section id={data.id} className="blog-quick">
      <div className="blog-quick__head">
        <span className="blog-quick__icon" aria-hidden="true">
          <HugeiconsIcon icon={BulbIcon} size={22} strokeWidth={1.7} />
        </span>
        <h2 className="blog-quick__title">{data.title}</h2>
      </div>

      <ul className="blog-quick__list">
        {data.points.map((point) => (
          <li key={point}>
            <span className="blog-quick__tick" aria-hidden="true">
              <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.4} />
            </span>
            <span>
              <RichText text={point} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
