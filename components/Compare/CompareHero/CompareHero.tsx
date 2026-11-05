import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import CompareHeroCta from "./CompareHeroCta";
import "./CompareHero.scss";

/** `logo` is a file name inside public/images/compare, for example "visafoto-logo.webp". */
type Brand = { name: string; logo: string };

type Props = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  intro: string;
  /** The two brand cards with the "VS" image between them (`badge` is also a file name in public/images/compare). Left out on the hub. */
  versus?: { left: Brand; right: Brand; badge: string };
  /** The call to action under the intro. */
  cta?: { label: string };
  /** The short checks under the button. */
  points?: string[];
};

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <span className="compare-hero__brand">
      <Image src={`${brand.logo}`} alt="" width={112} height={112} className="compare-hero__logo" />
      {brand.name}
    </span>
  );
}

export default function CompareHero({ breadcrumbs, title, intro, versus, cta, points }: Props) {
  return (
    <header className="compare-hero">
      <div className="compare-hero__inner">
        <nav aria-label="Breadcrumb">
          <ol className="compare-hero__crumbs">
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
          <div className="compare-hero__versus">
            <BrandCard brand={versus.left} />
            <Image src={`${versus.badge}`} alt="versus" width={56} height={56} className="compare-hero__badge" />
            <BrandCard brand={versus.right} />
          </div>
        )}

        <h1 className="compare-hero__title">{title}</h1>
        <p className="compare-hero__intro">{intro}</p>

        {cta && <CompareHeroCta label={cta.label} />}

        {points && points.length > 0 && (
          <ul className="compare-hero__points">
            {points.map((point) => (
              <li key={point}>
                <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
