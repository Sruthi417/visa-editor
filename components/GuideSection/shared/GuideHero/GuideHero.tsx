import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkBadge01Icon,
  Clock01Icon,
  Image01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

import type { GuideStat, GuideStatIcon } from "./guideStats";
import "./GuideHero.scss";

const STAT_ICONS: Record<GuideStatIcon, typeof ZapIcon> = {
  zap: ZapIcon,
  clock: Clock01Icon,
  image: Image01Icon,
  "badge-check": CheckmarkBadge01Icon,
};

type Props = {
  /** The links above the title, such as Home / Photo guide / the guide. The last one is the current page. */
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  intro: string;
  /** The picture under the intro. Left out on the hub. */
  image?: { src: string; alt: string };
  /** The tiles along the bottom, over the foot of the picture. Left out on the hub. */
  stats?: GuideStat[];
};

/** The sky header: breadcrumb links, a two-line title and intro, then a picture and a bar of tiles. */
export default function GuideHero({ breadcrumbs, title, intro, image, stats }: Props) {
  return (
    <header className={`guide-hero${image ? " guide-hero--media" : ""}`}>
      <div className="guide-hero__inner">
        <nav aria-label="Breadcrumb">
          <ol className="guide-hero__crumbs">
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

        <h1 className="guide-hero__title">{title}</h1>
        <p className="guide-hero__intro">{intro}</p>

        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={756}
            height={809}
            priority
            sizes="(max-width: 640px) 70vw, 400px"
            className="guide-hero__image"
          />
        )}

        {stats && stats.length > 0 && (
          <ul className="guide-hero__stats">
            {stats.map((stat, index) => (
              <li key={stat.id} className="guide-hero__stat-slot">
                {index > 0 && <span className="guide-hero__dot" aria-hidden="true" />}

                <div className="guide-hero__stat">
                  <HugeiconsIcon
                    icon={STAT_ICONS[stat.icon]}
                    size={30}
                    strokeWidth={1.5}
                    className="guide-hero__stat-icon"
                  />
                  <span className="guide-hero__stat-text">
                    {stat.value !== null && (
                      <span className="guide-hero__stat-value">{stat.value}</span>
                    )}
                    <span className="guide-hero__stat-label">{stat.label}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
