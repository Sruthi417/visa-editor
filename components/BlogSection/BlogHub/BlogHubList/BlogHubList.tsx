import Image from "next/image";
import Link from "next/link";

import type { BlogHubCard } from "../../types";
import "./BlogHubList.scss";

/**
 * The post cards on the hub, the same as the Guide and Compare hub cards: a photo, a title,
 * a two-line blurb and a button to the post.
 */
export default function BlogHubList({ title, cards }: { title: string; cards: BlogHubCard[] }) {
  return (
    <section className="blog-hub-list">
      <h2 className="blog-hub-list__title">{title}</h2>

      <ul className="blog-hub-list__grid">
        {cards.map((card) => (
          <li key={card.slug}>
            <article className="blog-hub-list__card">
              <div className="blog-hub-list__media">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  sizes="(max-width: 820px) 100vw, 520px"
                  style={card.image.position ? { objectPosition: card.image.position } : undefined}
                />
              </div>

              <div className="blog-hub-list__body">
                <h3 className="blog-hub-list__name">{card.title}</h3>
                <p className="blog-hub-list__text">{card.blurb}</p>
              </div>

              <Link href={`/blog/${card.slug}`} className="blog-hub-list__button">
                Read article
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
