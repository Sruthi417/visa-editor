import Image from "next/image";
import Link from "next/link";

import Reveal from "../Reveal";
import type { HubCard } from "../../types";
import "./CompareHubList.scss";

export default function CompareHubList({
  title,
  cards,
}: {
  title: string;
  cards: HubCard[];
}) {
  return (
    <Reveal className="compare-hub-list">
      <h2 className="compare-hub-list__title">{title}</h2>

      <ul className="compare-hub-list__grid">
        {cards.map((card) => (
          <li key={card.slug}>
            <article className="compare-hub-list__card">
              <div className="compare-hub-list__media">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1670}
                  height={942}
                  sizes="(max-width: 820px) 100vw, 520px"
                />
              </div>

              <div className="compare-hub-list__body">
                <h3 className="compare-hub-list__name">{card.title}</h3>
                <p className="compare-hub-list__text">{card.blurb}</p>
              </div>

              <Link href={`/compare/${card.slug}`} className="compare-hub-list__button">
                Read more
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
