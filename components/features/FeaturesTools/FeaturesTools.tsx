import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  CropIcon,
  MagicWand01Icon,
  ScanFaceIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import BackgroundDemo from "./BackgroundDemo";
import { CROP_ONLY, HERO_SPEC, checksFor, listJoin } from "../featureData";
import "./FeaturesTools.scss";

type Row = {
  id: string;
  icon: typeof CropIcon;
  title: string;
  text: string;
  points: string[];
  visual: React.ReactNode;
};

/** The editor's result card: the checks it ran, each one passed. */
function ChecksCard() {
  const checks = checksFor(HERO_SPEC);
  return (
    <div className="ftools__checks">
      <div className="ftools__checks-head">
        <span className="ftools__pass" aria-hidden="true">
          <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2.6} />
        </span>
        <span>
          <strong>Initial check passed</strong>
          <span className="ftools__checks-sub">{checks.length} of {checks.length} checks</span>
        </span>
      </div>
      <ul className="ftools__checks-list">
        {checks.map((check) => (
          <li key={check}>
            {check}
            <span className="ftools__status">
              <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.6} />
              Passed
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ROWS: Row[] = [
  {
    id: "crop",
    icon: CropIcon,
    title: "Cropped and sized to the rules",
    text: "The editor finds your face and frames it the way your country's authority asks, so you never crop anything by hand.",
    points: [
      "Face found and centred automatically",
      "Eye level set to the official guide",
      "Head height fitted to the allowed range",
      "Exact size at 300 DPI",
    ],
    visual: (
      <div className="ftools__picture">
        <Image
          src="/images/how-it-works/step-2-fit.webp"
          alt="A portrait inside crop guides, with a face outline and a 35 × 45 mm size label"
          width={1143}
          height={1376}
          sizes="(max-width: 992px) 90vw, 450px"
        />
      </div>
    ),
  },
  {
    id: "background",
    icon: MagicWand01Icon,
    title: "A plain background in your country's colour",
    text: "AI separates you from the backdrop on your device, then fills it with the plain colour your country requires.",
    points: [
      "Person segmentation runs in your browser",
      "Filled with the colour your spec asks for",
      `Background kept as taken for ${listJoin(CROP_ONLY)}`,
    ],
    visual: <BackgroundDemo />,
  },
  {
    id: "checks",
    icon: ScanFaceIcon,
    title: "Seven checks before you download",
    text: "Every photo is checked against your country's rules, and you see the result before you pay for anything.",
    points: [
      "Face, single face and even lighting",
      "Size, proportions and background colour",
      "File size inside your country's limits",
      "Retake tips when a check fails",
    ],
    visual: <ChecksCard />,
  },
];

/** The editor's main tools, one row each, the picture swapping sides from row to row. */
export default function FeaturesTools() {
  return (
    <section className="ftools" id="tools">
      <div className="ftools__wrap">
        <header className="ftools__head">
          <span>Tools</span>
          <h2>What the editor does to your photo</h2>
          <p>Each tool follows the spec you picked, so the finished photo matches it exactly.</p>
        </header>

        <div className="ftools__rows">
          {ROWS.map((row, index) => (
            <article
              key={row.id}
              id={row.id}
              className={`ftools__row${index % 2 ? " ftools__row--reverse" : ""}`}
            >
              <div className="ftools__copy">
                <span className="ftools__icon" aria-hidden="true">
                  <HugeiconsIcon icon={row.icon} size={26} strokeWidth={1.8} />
                </span>
                <h3 className="ftools__title">{row.title}</h3>
                <p className="ftools__text">{row.text}</p>
                <ul className="ftools__list">
                  {row.points.map((point) => (
                    <li key={point}>
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} strokeWidth={1.8} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ftools__visual">{row.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
