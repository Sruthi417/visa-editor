import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckListIcon,
  Globe02Icon,
  SquareLock02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import "./AboutValues.scss";

// The promises the rest of the site makes, gathered in one place.
const VALUES = [
  {
    icon: SquareLock02Icon,
    title: "Privacy first",
    text: "Face detection, background removal and resizing run on your device. Your photo isn't uploaded to be edited.",
  },
  {
    icon: CheckListIcon,
    title: "Honest results",
    text: "When a photo fails a check, we tell you which one and why. We say it meets the published rules, never that it will be accepted.",
  },
  {
    icon: Globe02Icon,
    title: "Official rules only",
    text: "Each preset follows the country's published photo rules. Where a country allows no edited background, we only crop.",
  },
  {
    icon: ViewIcon,
    title: "See it before you pay",
    text: "You see the finished photo and its checks for free, and pay only to download it or order prints.",
  },
];

/** Four principles, each with an icon tile, in a row. */
export default function AboutValues() {
  return (
    <section className="ab-values" id="principles">
      <div className="ab-values__wrap">
        <header className="ab-values__head">
          <span>Our principles</span>
          <h2>What we stand for</h2>
          <p>Four promises behind every photo the editor makes.</p>
        </header>

        <ul className="ab-values__grid">
          {VALUES.map((value) => (
            <li key={value.title} className="ab-values__item">
              <span className="ab-values__icon" aria-hidden="true">
                <HugeiconsIcon icon={value.icon} size={24} strokeWidth={1.8} />
              </span>
              <h3 className="ab-values__title">{value.title}</h3>
              <p className="ab-values__text">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
