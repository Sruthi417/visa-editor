import type { ReactNode } from "react";

import Reveal from "../../shared/Reveal";
import type { ComparisonGroup } from "../../types";
import "./CompareTable.scss";

// What a FlyFrame cell says when the data gives it no text.
const PRODUCT_FALLBACK = {
  live: "Live",
  planned: "Planned",
  tbd: "To be announced",
} as const;

type Props = {
  group: ComparisonGroup;
  productName: string;
  competitorName: string;
  /** The main title above the whole comparison. Only the first table gets it. */
  mainTitle?: string;
  /** Shown under the main title, before the group's own heading. */
  intro?: ReactNode;
};

/** One group of features: a title and the side-by-side table. */
export default function CompareTable({ group, productName, competitorName, mainTitle, intro }: Props) {
  return (
    <>
      {mainTitle && <h2 className="compare-table__main-title">{mainTitle}</h2>}
      {intro}

      <Reveal className="compare-table" id={group.id}>
        <h2 className="compare-table__heading">{group.title}</h2>
        <p className="compare-table__description">{group.description}</p>

        <div className="compare-table__wrap">
          <table className="compare-table__table">
            <caption className="compare-table__sr">
              {group.title}: {productName} compared with {competitorName}
            </caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">{productName}</th>
                <th scope="col">{competitorName}</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td data-label={productName}>
                    <span
                      className={`compare-table__value${!row.flyframe.text && row.flyframe.status === "tbd" ? " compare-table__value--muted" : ""}`}
                    >
                      {row.flyframe.text ?? PRODUCT_FALLBACK[row.flyframe.status]}
                    </span>
                  </td>
                  <td data-label={competitorName}>
                    {/* A "not stated" cell shows a dash, or its note if it has one. */}
                    <span className="compare-table__value">{row.competitor.text ?? "–"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </>
  );
}
