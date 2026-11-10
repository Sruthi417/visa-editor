import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckListIcon,
  Globe02Icon,
  SquareLock02Icon,
  Tick02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import "./AboutValues.scss";

// The promises the rest of the site makes, gathered in one place, each as two points.
const VALUES = [
  {
    icon: SquareLock02Icon,
    title: "Privacy first",
    points: [
      "Face detection, background removal and resizing run on your device.",
      "Your photo isn't uploaded to be edited; the work is done in your browser.",
    ],
  },
  {
    icon: CheckListIcon,
    title: "Honest results",
    points: [
      "When a photo fails a check, we tell you which one and why.",
      "We say it meets the published rules, never that it will be accepted.",
    ],
  },
  {
    icon: Globe02Icon,
    title: "Official rules only",
    points: [
      "Each preset follows the country's published photo rules.",
      "Where a country allows no edited background, we only crop.",
    ],
  },
  {
    icon: ViewIcon,
    title: "See it before you pay",
    points: [
      "You see the finished photo and its checks for free.",
      "You pay only to download it or order prints.",
    ],
  },
];

/**
 * Four principles as cards, one at each corner of three rings round the FlyFrame mark, each card
 * part way across the rings. Below the desktop width the cards stack under the rings.
 */
export default function AboutValues() {
  return (
    <section className="ab-values" id="principles">
      <div className="ab-values__wrap">
        <header className="ab-values__head">
          <span>Our principles</span>
          <h2>What we stand for</h2>
          <p>
            A passport photo should be simple to get right at home. These four promises hold for
            every photo the editor makes.
          </p>
        </header>

        <div className="ab-values__orbit">
          {/* Three rings round the FlyFrame mark; the cards sit part way across them. */}
          <div className="ab-values__core" aria-hidden="true">
            <span className="ab-values__ring ab-values__ring--1" />
            <span className="ab-values__ring ab-values__ring--2" />
            <span className="ab-values__ring ab-values__ring--3" />
            <span className="ab-values__mark-logo">
              <Image src="/images/logo/flyframe.webp" alt="" width={145} height={36} />
            </span>
          </div>

          <ul className="ab-values__cards">
            {VALUES.map((value, index) => (
              <li key={value.title} className={`ab-values__card ab-values__card--${index + 1}`}>
                <div className="ab-values__card-head">
                  <span className="ab-values__icon" aria-hidden="true">
                    <HugeiconsIcon icon={value.icon} size={16} strokeWidth={1.9} />
                  </span>
                  <h3 className="ab-values__title">{value.title}</h3>
                </div>
                <ul className="ab-values__points">
                  {value.points.map((point) => (
                    <li key={point} className="ab-values__point">
                      <span className="ab-values__tick" aria-hidden="true">
                        <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
