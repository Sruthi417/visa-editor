import type { StatsBlock } from "../../../types";
import "./BlogStats.scss";

/** Big numbers, each with a short label under it. */
export default function BlogStats({ data }: { data: StatsBlock }) {
  return (
    <ul className="blog-stats">
      {data.items.map((item) => (
        <li key={item.label} className="blog-stats__item">
          {item.prefix && <span className="blog-stats__prefix">{item.prefix}</span>}
          <span className="blog-stats__value">{item.value}</span>
          <span className="blog-stats__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
