import Image from "next/image";
import Link from "next/link";

import type { HubCard } from "../../types";
import "./GuideHubList.scss";

/** The cards on the hub: a photo, a title, a two-line blurb and a button to the guide. */
export default function GuideHubList({ title, cards }: { title: string; cards: HubCard[] }) {
  return (
    <section className="guide-hub-list">
      <h2 className="guide-hub-list__title">{title}</h2>

      <ul className="guide-hub-list__grid">
        {cards.map((card) => (
          <li key={card.slug}>
            <article className="guide-hub-list__card">
              <div className="guide-hub-list__media">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1000}
                  height={1570}
                  sizes="(max-width: 820px) 100vw, 520px"
                  style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                />
              </div>

              <div className="guide-hub-list__body">
                <h3 className="guide-hub-list__name">{card.title}</h3>
                <p className="guide-hub-list__text">{card.blurb}</p>
              </div>

              <Link href={`/guide/${card.slug}`} className="guide-hub-list__button">
                Read guide
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
