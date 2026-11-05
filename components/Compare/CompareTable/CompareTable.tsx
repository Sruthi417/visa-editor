import Reveal from "../Reveal";
import type { ComparisonGroup } from "../types";
import { CompetitorValue, ProductValue } from "./CellValue";
import "./CompareTable.scss";

type Props = {
  group: ComparisonGroup;
  /** Zero-based position, shown as a number next to the title. */
  index: number;
  productName: string;
  competitorName: string;
};

/** One group of features: a title and the side-by-side table. */
export default function CompareTable({ group, index, productName, competitorName }: Props) {
  return (
    <Reveal className="compare-table" id={group.id}>
      <h2 className="compare-table__heading">
        <span className="compare-table__number">{index + 1}</span>
        {group.title}
      </h2>
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
                  <ProductValue cell={row.flyframe} />
                </td>
                <td data-label={competitorName}>
                  <CompetitorValue cell={row.competitor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
