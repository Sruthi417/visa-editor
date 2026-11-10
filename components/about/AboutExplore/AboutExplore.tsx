import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftRightIcon,
  ArrowRight01Icon,
  BookOpen01Icon,
  MagicWand01Icon,
  News01Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import "./AboutExplore.scss";

// The rest of the site, one card each.
const PAGES = [
  {
    href: "/get-started",
    icon: Upload01Icon,
    title: "Get started",
    text: "Choose your document and country, then upload your photo.",
  },
  {
    href: "/features",
    icon: MagicWand01Icon,
    title: "Features",
    text: "Everything the editor does, from live capture to prints at your door.",
  },
  {
    href: "/guide",
    icon: BookOpen01Icon,
    title: "Photo guides",
    text: "Set up your phone, light and pose to take the photo at home.",
  },
  {
    href: "/blog",
    icon: News01Icon,
    title: "Blog",
    text: "Articles on cameras, photo sizes and the rules behind them.",
  },
  {
    href: "/compare",
    icon: ArrowLeftRightIcon,
    title: "Compare",
    text: "How FlyFrame compares with other photo tools, feature by feature.",
  },
];

/** Linked cards to the rest of the site: three, then two centred. */
export default function AboutExplore() {
  return (
    <section className="ab-explore" id="explore">
      <div className="ab-explore__wrap">
        <header className="ab-explore__head">
          <span>Explore</span>
          <h2>Find your way around FlyFrame</h2>
          <p>Start your photo, learn how to take it, or see how the editor works.</p>
        </header>

        <ul className="ab-explore__grid">
          {PAGES.map((page) => (
            <li key={page.href} className="ab-explore__item">
              <Link href={page.href} className="ab-explore__card">
                <span className="ab-explore__icon" aria-hidden="true">
                  <HugeiconsIcon icon={page.icon} size={22} strokeWidth={1.8} />
                </span>
                <h3 className="ab-explore__title">{page.title}</h3>
                <p className="ab-explore__text">{page.text}</p>
                <span className="ab-explore__arrow" aria-hidden="true">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
