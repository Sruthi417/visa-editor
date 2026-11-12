import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  CropIcon,
  PrinterIcon,
  ScanFaceIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import "./AboutExplore.scss";

// The handwriting for the notes beside the cards, loaded for this section only.
const hand = Caveat({ subsets: ["latin"], weight: "500", display: "swap" });

type Page = {
  href: string;
  kicker: string;
  title: string;
  text: string;
  note: string;
  art: React.ReactNode;
};

/** A photo in a white mount, with an optional round badge on its corner. */
function Mounted({
  src,
  width,
  height,
  className,
  badge,
}: {
  src: string;
  width: number;
  height: number;
  className: string;
  badge?: IconSvgElement;
}) {
  return (
    <span className={`ab-explore__mount ${className}`}>
      <Image src={src} alt="" width={width} height={height} sizes="220px" />
      {badge && (
        <span className="ab-explore__badge">
          <HugeiconsIcon icon={badge} size={16} strokeWidth={2} />
        </span>
      )}
    </span>
  );
}

/** A glossy blue app tile with a white icon. */
function Tile({ icon }: { icon: IconSvgElement }) {
  return (
    <span className="ab-explore__tile">
      <HugeiconsIcon icon={icon} size={30} strokeWidth={1.8} />
    </span>
  );
}

// The rest of the site, one card each, as in the reference: a small label, a picture, and a
// blue folder with the page's name.
const PAGES: Page[] = [
  {
    href: "/get-started",
    kicker: "Start here",
    title: "Get started",
    text: "Choose your document and country, then upload your photo.",
    note: "start with any photo",
    art: (
      <Mounted
        src="/images/get-started/step-snapshot.webp"
        width={452}
        height={362}
        className="ab-explore__mount--start"
        badge={Upload01Icon}
      />
    ),
  },
  {
    href: "/features",
    kicker: "The editor",
    title: "Features",
    text: "Everything the editor does, from live capture to prints at your door.",
    note: "every tool in one place",
    art: (
      <span className="ab-explore__tiles">
        <Tile icon={ScanFaceIcon} />
        <Tile icon={CropIcon} />
        <Tile icon={PrinterIcon} />
      </span>
    ),
  },
  {
    href: "/guide",
    kicker: "Learn",
    title: "Photo guides",
    text: "Set up your phone, light and pose to take the photo at home.",
    note: "set up in minutes",
    art: (
      <Mounted
        src="/images/get-started/prep-phone.webp"
        width={640}
        height={480}
        className="ab-explore__mount--guide"
        badge={BookOpen01Icon}
      />
    ),
  },
  {
    href: "/blog",
    kicker: "Read",
    title: "Blog",
    text: "Articles on cameras, photo sizes and the rules behind them.",
    note: "tips and photo rules",
    art: (
      <span className="ab-explore__notes">
        <Mounted
          src="/images/blog/after-the-photo-checks.webp"
          width={1091}
          height={629}
          className="ab-explore__mount--back"
        />
        <Mounted
          src="/images/blog/rear-vs-front-camera-thumb.webp"
          width={1670}
          height={941}
          className="ab-explore__mount--front"
        />
      </span>
    ),
  },
];

/** Four linked cards in two rows, each with a picture over a coloured folder, and notes beside. */
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
          {PAGES.map((page, index) => (
            <li key={page.href} className={`ab-explore__item ab-explore__item--${index + 1}`}>
              <Link href={page.href} className="ab-explore__card">
                <span className="ab-explore__kicker">{page.kicker}</span>
                <span className="ab-explore__art" aria-hidden="true">
                  {page.art}
                </span>
                <div className="ab-explore__folder">
                  <div className="ab-explore__title-row">
                    <h3 className="ab-explore__title">{page.title}</h3>
                    <span className="ab-explore__arrow" aria-hidden="true">
                      <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.2} />
                    </span>
                  </div>
                  <p className="ab-explore__text">{page.text}</p>
                </div>
              </Link>
              <span className={`ab-explore__note ${hand.className}`} aria-hidden="true">
                {page.note}
                <svg className="ab-explore__note-arrow" viewBox="0 0 40 16">
                  <path
                    d="M2 10 C 12 2, 26 2, 36 8 M30 3 L36 8 L29 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
