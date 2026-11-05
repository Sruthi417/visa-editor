import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareHowToRead.scss";

export default function CompareHowToRead({ howToRead }: { howToRead: Comparison["howToRead"] }) {
  return (
    <Reveal className="compare-read">
      <h2 className="compare-read__title">{howToRead.title}</h2>
      <dl className="compare-read__list">
        {howToRead.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.text}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
