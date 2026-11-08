import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import type { Blog } from "../../types";
import "./BlogSources.scss";

/** The numbered list of sources at the end of the post. Each one opens in a new tab. */
export default function BlogSources({ data }: { data: Blog["sources"] }) {
  return (
    <section id={data.id} className="blog-sources">
      <h2 className="blog-sources__title">{data.title}</h2>

      <ol className="blog-sources__list">
        {data.items.map((source) => (
          <li key={source.url} className="blog-sources__item">
            <span className="blog-sources__publisher">{source.publisher}</span>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="blog-sources__link">
              {source.label}
              <span className="blog-sources__sr"> (opens in a new tab)</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
            </a>
            {source.note && <span className="blog-sources__note">{source.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
