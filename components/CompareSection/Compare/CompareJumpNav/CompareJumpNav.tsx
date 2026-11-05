import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import "./CompareJumpNav.scss";

type Props = {
  items: { id: string; title: string }[];
};

const PER_ROW = 3;

/** Pills that jump to each feature table: three in the first row, the rest below. */
export default function CompareJumpNav({ items }: Props) {
  const rows: { id: string; title: string }[][] = [];
  items.forEach((item, index) => {
    if (index % PER_ROW === 0) rows.push([]);
    rows[rows.length - 1].push(item);
  });

  return (
    <nav className="compare-jump" aria-label="Comparison sections">
      {rows.map((row) => (
        <div key={row[0].id} className="compare-jump__row">
          {row.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="compare-jump__link">
              <span className="compare-jump__pill">
                {item.title}
              </span>
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={22}
                strokeWidth={1.6}
                className="compare-jump__arrow"
              />
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
