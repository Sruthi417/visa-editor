import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, SmartPhone01Icon } from "@hugeicons/core-free-icons";

import type { SpecsBlock } from "../../../types";
import "./BlogSpecs.scss";

/** One card per phone: its name, its camera specs and a link to the maker's spec page. */
export default function BlogSpecs({ data }: { data: SpecsBlock }) {
  return (
    <ul className="blog-specs">
      {data.items.map((item) => (
        <li key={item.name} className="blog-specs__card">
          <div className="blog-specs__head">
            <span className="blog-specs__icon" aria-hidden="true">
              <HugeiconsIcon icon={SmartPhone01Icon} size={20} strokeWidth={1.7} />
            </span>
            <h4 className="blog-specs__name">{item.name}</h4>
          </div>

          <dl className="blog-specs__rows">
            {item.rows.map((row) => (
              <div key={row.label} className="blog-specs__row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <a href={item.url} target="_blank" rel="noopener noreferrer" className="blog-specs__link">
            Official specs
            <span className="blog-specs__sr"> for {item.name} (opens in a new tab)</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={2} />
          </a>
        </li>
      ))}
    </ul>
  );
}
