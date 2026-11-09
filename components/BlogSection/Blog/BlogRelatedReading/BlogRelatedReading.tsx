import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import guideHub from "../../../GuideSection/data/hub.json";
import blogHub from "../../data/hub.json";
import type { Blog, BlogHubCard, BlogImage, RelatedCard } from "../../types";
import "./BlogRelatedReading.scss";

type Card = { kind: "guide" | "blog"; title: string; href: string; blurb: string; image: BlogImage };

/** Turns each entry into a card: from the guide or blog hub when it names one, else as written. */
function toCard(item: RelatedCard): Card | null {
  if ("guide" in item) {
    const card = guideHub.cards.find((c) => c.slug === item.guide);
    if (!card) return null;
    return {
      kind: "guide",
      title: card.title,
      href: `/guide/${card.slug}`,
      blurb: card.blurb,
      // The guide hub keeps only the path, so the size is the file's own.
      image: { src: card.image, alt: card.title, width: 1672, height: 941 },
    };
  }
  if ("blog" in item) {
    const card = (blogHub.cards as BlogHubCard[]).find((c) => c.slug === item.blog);
    if (!card) return null;
    return { kind: "blog", title: card.title, href: `/blog/${card.slug}`, blurb: card.blurb, image: card.image };
  }
  return item;
}

/** "Related reading": hub-style cards for guides and blog posts, three to a row. */
export default function BlogRelatedReading({ data }: { data: Blog["related"] }) {
  const cards = data.items.map(toCard).filter((card): card is Card => card !== null);

  return (
    <section id={data.id} className="blog-reading">
      <h2 className="blog-reading__title">{data.title}</h2>

      <div className="blog-reading__wrap">
        <ul className="blog-reading__grid">
          {cards.map((card) => (
            <li key={card.href}>
              {/* Many of these guides are still to be written, so they aren't fetched ahead of a click. */}
              <Link href={card.href} prefetch={false} className="blog-reading__card">
                <div className="blog-reading__media">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(max-width: 600px) 100vw, 260px"
                    style={{ "--blog-img-pos": card.image.position } as React.CSSProperties}
                  />
                </div>

                <div className="blog-reading__body">
                  <span className="blog-reading__kind">{card.kind === "guide" ? "Guide" : "Blog"}</span>
                  <h3 className="blog-reading__name">{card.title}</h3>
                  <p className="blog-reading__text">{card.blurb}</p>

                  <span className="blog-reading__button">
                    {card.kind === "guide" ? "Read guide" : "Read article"}
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
