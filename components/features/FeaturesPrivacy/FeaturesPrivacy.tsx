import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, SquareLock02Icon, Upload01Icon } from "@hugeicons/core-free-icons";

import { kbLabel, photoSpecs } from "../featureData";
import "./FeaturesPrivacy.scss";

// China has one of the tightest file windows, which makes a clear example.
const example = photoSpecs.find((entry) => entry.code === "CN")?.passport;

const CARDS = [
  {
    icon: SquareLock02Icon,
    title: "Prepared in your browser",
    text: "Face detection, background removal and resizing all run on your device, so your photo isn't uploaded to be edited.",
  },
  {
    icon: Upload01Icon,
    title: "JPG, PNG or WebP, up to 15 MB",
    text: "Upload a photo straight from your phone or computer, in any of the usual formats.",
  },
  {
    icon: File01Icon,
    title: "A JPEG inside the limits",
    text: example
      ? `The finished file is a ${example.dpi} DPI JPEG sized to your country's file limits, such as ${kbLabel(example.fileKb[0])} to ${kbLabel(example.fileKb[1])} for a Chinese passport.`
      : "The finished file is a 300 DPI JPEG sized to your country's file limits.",
  },
];

/** Where the photo is processed, what you can upload and what you get back. */
export default function FeaturesPrivacy() {
  return (
    <section className="fprivacy" id="privacy">
      <div className="fprivacy__wrap">
        <header className="fprivacy__head">
          <span>Privacy and files</span>
          <h2>Your photo is prepared on your device</h2>
          <p>Nothing to install and no studio visit. The editor works in any modern browser.</p>
        </header>

        <ul className="fprivacy__cards">
          {CARDS.map((card) => (
            <li key={card.title} className="fprivacy__card">
              <span className="fprivacy__icon" aria-hidden="true">
                <HugeiconsIcon icon={card.icon} size={24} strokeWidth={1.8} />
              </span>
              <h3 className="fprivacy__title">{card.title}</h3>
              <p className="fprivacy__text">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
