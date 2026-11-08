import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Clock01Icon } from "@hugeicons/core-free-icons";

import { BLOG_ICONS } from "../blogIcons";
import type { BlogImage, VersusSide } from "../../types";
import "./BlogHero.scss";

const META_ICONS = { calendar: Calendar03Icon, clock: Clock01Icon };

type Props = {
  /** The links above the title. The last one is the current page. */
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  intro: string;
  /** The picture on the left. With it the text sits on the right, left-aligned. Left out on the hub. */
  image?: BlogImage;
  /** Two cards with a "VS" badge between them. */
  versus?: { left: VersusSide; right: VersusSide; badge: string };
  /** The date and reading time under the intro. Left out on the hub. */
  meta?: { icon: keyof typeof META_ICONS; label: string }[];
};

function SideCard({ side }: { side: VersusSide }) {
  return (
    <span className="blog-hero__side">
      <span className="blog-hero__side-icon" aria-hidden="true">
        <HugeiconsIcon icon={BLOG_ICONS[side.icon]} size={24} strokeWidth={1.6} />
      </span>
      <span className="blog-hero__side-text">
        <span className="blog-hero__side-label">{side.label}</span>
        <span className="blog-hero__side-sub">{side.text}</span>
      </span>
    </span>
  );
}

/**
 * The sky header. On a post with a picture: the picture on the left, and the breadcrumb,
 * title, intro and meta line on the right, left-aligned. On the hub: the text centred.
 */
export default function BlogHero({ breadcrumbs, title, intro, image, versus, meta }: Props) {
  const classes = ["blog-hero", versus || image ? "blog-hero--post" : "", image ? "blog-hero--split" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="blog-hero__inner">
        <div className="blog-hero__copy">
          <nav aria-label="Breadcrumb">
            <ol className="blog-hero__crumbs">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} aria-current={isLast ? "page" : undefined}>
                    {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
                  </li>
                );
              })}
            </ol>
          </nav>

          {versus && (
            <div className="blog-hero__versus">
              <SideCard side={versus.left} />
              <Image
                src={versus.badge}
                alt="versus"
                width={140}
                height={140}
                priority
                className="blog-hero__badge"
              />
              <SideCard side={versus.right} />
            </div>
          )}

          <h1 className="blog-hero__title">{title}</h1>
          <p className="blog-hero__intro">{intro}</p>

          {meta && meta.length > 0 && (
            <ul className="blog-hero__meta">
              {meta.map((item) => (
                <li key={item.label}>
                  <HugeiconsIcon icon={META_ICONS[item.icon]} size={17} strokeWidth={1.8} />
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* On the right on a wide screen; below the text on a phone. */}
        {image && (
          <div className="blog-hero__media">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(max-width: 900px) 86vw, 600px"
              className="blog-hero__image"
            />
          </div>
        )}
      </div>
    </header>
  );
}
