import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Clock01Icon } from "@hugeicons/core-free-icons";

import { formatDate, getBlog, readingMinutes } from "../../blogs";
import type { BlogHubCard } from "../../types";
import "./BlogHubList.scss";

type Props = {
  title: string;
  cards: BlogHubCard[];
  /** Shows the first card wide, with the picture beside the text. */
  featured?: boolean;
};

/** The post cards: a photo, a label, the title, a two-line blurb, the date and reading time. */
export default function BlogHubList({ title, cards, featured = false }: Props) {
  return (
    <section className="blog-hub-list">
      <h2 className="blog-hub-list__title">{title}</h2>

      <ul className="blog-hub-list__grid">
        {cards.map((card, index) => {
          const post = getBlog(card.slug);
          const isFeatured = featured && index === 0;

          return (
            <li key={card.slug} className={isFeatured ? "blog-hub-list__slot--featured" : undefined}>
              <Link
                href={`/blog/${card.slug}`}
                className={`blog-hub-list__card${isFeatured ? " blog-hub-list__card--featured" : ""}`}
              >
                <div className="blog-hub-list__media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes={isFeatured ? "(max-width: 820px) 100vw, 680px" : "(max-width: 820px) 100vw, 420px"}
                    priority={isFeatured}
                    style={{ "--blog-img-pos": card.image.position } as React.CSSProperties}
                  />
                </div>

                <div className="blog-hub-list__body">
                  {post && <span className="blog-hub-list__category">{post.category}</span>}
                  <h3 className="blog-hub-list__name">{card.title}</h3>
                  <p className="blog-hub-list__text">{card.blurb}</p>

                  {post && (
                    <p className="blog-hub-list__meta">
                      <HugeiconsIcon icon={Clock01Icon} size={15} strokeWidth={1.8} />
                      {readingMinutes(post)} min read
                      <span aria-hidden="true">·</span>
                      Checked {formatDate(post.checkedOn)}
                    </p>
                  )}

                  <span className="blog-hub-list__button">
                    Read article
                    <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
