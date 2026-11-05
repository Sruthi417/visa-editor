import "./CompareJumpNav.scss";

type Props = {
  items: { id: string; title: string }[];
};

/** Numbered pills that jump to each feature table. */
export default function CompareJumpNav({ items }: Props) {
  return (
    <nav className="compare-jump" aria-label="Comparison sections">
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`} className="compare-jump__link">
          <span>{index + 1}</span>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
