import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import RichText from "../../../shared/RichText/RichText";
import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { TableBlock } from "../../../types";
import "./BlogTable.scss";

/**
 * A table in a white card. The first cell of each row is its heading. On a phone each row
 * becomes its own small card. `tone: "fix"` marks mistakes with a cross and fixes with a tick.
 */
export default function BlogTable({ data }: { data: TableBlock }) {
  const isFix = data.tone === "fix";
  const [first, ...rest] = data.columns;

  return (
    <div className={`blog-table blog-table--cols-${data.columns.length}${isFix ? " blog-table--fix" : ""}`}>
      <table className="blog-table__table">
        <thead>
          <tr>
            {data.columns.map((column) => (
              <th key={column.label} scope="col">
                <span className="blog-table__head">
                  {column.icon && (
                    <span className="blog-table__head-icon" aria-hidden="true">
                      <HugeiconsIcon icon={BLOG_ICONS[column.icon]} size={18} strokeWidth={1.7} />
                    </span>
                  )}
                  {column.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row">
                <span className="blog-table__cell">
                  {isFix && (
                    <span className="blog-table__mark blog-table__mark--cross" aria-hidden="true">
                      <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={3} />
                    </span>
                  )}
                  <span>
                    <RichText text={row[0]} />
                  </span>
                </span>
              </th>
              {row.slice(1).map((cell, index) => (
                <td key={index} data-label={rest[index]?.label ?? first.label}>
                  <span className="blog-table__cell">
                    {isFix && (
                      <span className="blog-table__mark blog-table__mark--tick" aria-hidden="true">
                        <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} />
                      </span>
                    )}
                    <span>
                      <RichText text={cell} />
                    </span>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
