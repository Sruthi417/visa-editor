import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";

import { formatDate } from "../comparisons";
import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareHubList.scss";

export default function CompareHubList({ items }: { items: Comparison[] }) {
  return (
    <Reveal>
      <ul className="compare-hub-list">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/compare/${item.slug}`} className="compare-hub-list__card">
              <div className="compare-hub-list__top">
                <span className="compare-hub-list__name">
                  {item.product.name}
                  <em>vs</em>
                  {item.competitor.name}
                </span>
                <span className="compare-hub-list__arrow" aria-hidden="true">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.8} />
                </span>
              </div>

              <p>{item.hub.blurb}</p>

              <span className="compare-hub-list__pill">
                <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.8} />
                Checked {formatDate(item.checkedOn)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
