import StatusChip from "../StatusChip/StatusChip";
import type { CompetitorCell, ProductCell } from "../types";

const PRODUCT_LABEL = {
  live: "Live",
  planned: "Planned",
  tbd: "To be announced",
} as const;

export function ProductValue({ cell }: { cell: ProductCell }) {
  return (
    <div className="compare-table__cell">
      <StatusChip tone={cell.status}>{PRODUCT_LABEL[cell.status]}</StatusChip>
      {cell.text && (
        <span className={`compare-table__value${cell.status === "tbd" ? " compare-table__value--muted" : ""}`}>
          {cell.text}
        </span>
      )}
    </div>
  );
}

export function CompetitorValue({ cell }: { cell: CompetitorCell }) {
  if (cell.status === "stated") {
    return (
      <div className="compare-table__cell">
        <span className="compare-table__value">{cell.text}</span>
      </div>
    );
  }

  return (
    <div className="compare-table__cell">
      <StatusChip tone="not-stated">Not stated</StatusChip>
      {cell.text && <span className="compare-table__value compare-table__value--muted">{cell.text}</span>}
    </div>
  );
}
