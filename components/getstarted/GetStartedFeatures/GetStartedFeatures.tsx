import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  CropIcon,
  Globe02Icon,
  MagicWand01Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";

import { COUNTRY_COUNT, SPEC_COUNT } from "../../features/featureData";
import { AnalysisArt, CountryArt, CropArt, PrintArt } from "./FeatureArt";
import "./GetStartedFeatures.scss";

type Feature = {
  title: string;
  text: string;
  list: string[];
  icon: typeof CropIcon;
  art: ReactNode;
};

// The landing page's four features, worded for someone about to start, each with its own picture.
const FEATURES: Feature[] = [
  {
    title: "Smart photo analysis",
    text: "The editor reads your background, face position and sharpness, and fixes what it can before you see the result.",
    list: [
      "Background set to your country's colour",
      "Face and edge detection",
      "Shadows cleared from the background",
      "Every step in one go",
    ],
    icon: MagicWand01Icon,
    art: <AnalysisArt />,
  },
  {
    title: "Exact crop and size",
    text: "Head size, framing and photo size follow the official numbers for your document, so there is nothing to measure.",
    list: [
      "Head height in the allowed range",
      "Eyes on the right line",
      "Centred framing",
      "Exact print and pixel size",
    ],
    icon: CropIcon,
    art: <CropArt />,
  },
  {
    title: "Rules for your country",
    text: `Choose from ${SPEC_COUNT} passport and visa specs in ${COUNTRY_COUNT} countries and the Schengen visa, and the editor follows that one.`,
    list: [
      "Passport and visa presets",
      "Seven requirement checks",
      "Clear tips when a check fails",
      "Crop-only rules respected",
    ],
    icon: Globe02Icon,
    art: <CountryArt />,
  },
  {
    title: "Download or get prints",
    text: "Download a 300 DPI file for an online application, or order printed photos and have them delivered to your door.",
    list: [
      "300 DPI JPEG download",
      "4 × 6 in photo sheets",
      "Print at home or at a shop",
      "Prints delivered to your door",
    ],
    icon: PrinterIcon,
    art: <PrintArt />,
  },
];

/** The landing page's feature rows: text and a tick list on one side, a sky picture on the other. */
export default function GetStartedFeatures() {
  return (
    <section className="gs-feat" id="features">
      <div className="gs-feat__wrap">
        <header className="gs-feat__head">
          <span>Features</span>
          <h2>What the editor does for your photo</h2>
          <p>From the first upload to the final print, every step follows your country&apos;s rules.</p>
        </header>

        <div className="gs-feat__rows">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className={`gs-feat__row${index % 2 === 1 ? " gs-feat__row--reverse" : ""}`}
            >
              <div className="gs-feat__content">
                <span className="gs-feat__icon" aria-hidden="true">
                  <HugeiconsIcon icon={feature.icon} size={26} strokeWidth={1.8} />
                </span>
                <h3 className="gs-feat__title">{feature.title}</h3>
                <p className="gs-feat__text">{feature.text}</p>
                <ul className="gs-feat__list">
                  {feature.list.map((item) => (
                    <li key={item}>
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} strokeWidth={1.8} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gs-feat__media" aria-hidden="true">
                {feature.art}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
