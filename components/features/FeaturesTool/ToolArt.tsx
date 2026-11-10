import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  ArrowDataTransferVerticalIcon,
  ArrowRight02Icon,
  Cancel01Icon,
  LinkSquare02Icon,
  Search01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import { HERO_ENTRY, HERO_SPEC, flagClass, sizeText } from "../featureData";

// Small pictures of each tool, built from the editor's own parts and the German passport spec
// used across the page. They only illustrate the text beside them, so the section hides them
// from screen readers.

const spec = HERO_SPEC;
const PORTRAIT = "/images/features/sample-portrait.webp";

/** Millimetres to pixels at the spec's DPI, the converter's own formula. */
const toPx = (mm: number) => Math.round((mm / 25.4) * spec.dpi);

function Photo({ className = "" }: { className?: string }) {
  return <Image src={PORTRAIT} alt="" width={486} height={546} sizes="80px" className={className} />;
}

/** 1. A report with one result of each kind: pass, borderline and fail. */
export function CheckerArt() {
  const rows = [
    { label: `${spec.background} background`, tone: "pass", result: "Pass", icon: Tick02Icon },
    { label: "Head height", tone: "warn", result: "Borderline", icon: Alert02Icon },
    { label: "Shadows on face", tone: "fail", result: "Fail", icon: Cancel01Icon },
  ] as const;

  return (
    <div className="fart fart--checker">
      <div className="fart__list fart__list--ghost" />
      <div className="fart__list fart__float">
        <div className="fart__list-head">
          <span className="fart__report-who">
            <span className={`fart__flag ${flagClass(HERO_ENTRY.code)}`} />
            {HERO_ENTRY.country} passport
          </span>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="fart__list-row">
            <span className={`fart__state fart__state--${row.tone}`}>
              <HugeiconsIcon icon={row.icon} size={10} strokeWidth={3} />
            </span>
            <span className="fart__row-label">{row.label}</span>
            <span className={`fart__result fart__result--${row.tone}`}>{row.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 2. Print size in, pixel size out, at the spec's DPI, with the formula. */
export function SizeArt() {
  return (
    <div className="fart fart--size">
      <div className="fart__convert fart__float">
        <div className="fart__field">
          <span>Print size</span>
          <strong>{sizeText(spec)}</strong>
        </div>
        <div className="fart__swap">
          <span className="fart__swap-icon">
            <HugeiconsIcon icon={ArrowDataTransferVerticalIcon} size={13} strokeWidth={2} />
          </span>
          at {spec.dpi} DPI
        </div>
        <div className="fart__field fart__field--result">
          <span>Pixels</span>
          <strong>
            {toPx(spec.widthMm)} × {toPx(spec.heightMm)} px
          </strong>
        </div>
      </div>
      <span className="fart__chip fart__chip--formula">mm ÷ 25.4 × DPI</span>
    </div>
  );
}

/** 3. A file squeezed under its limit, with the size change and a quality label. */
export function CompressArt() {
  return (
    <div className="fart fart--compress">
      <span className="fart__chip fart__chip--limit">Limit 200 KB</span>
      <div className="fart__file fart__float">
        <div className="fart__file-row">
          <div className="fart__file-thumb">
            <Photo />
          </div>
          <div className="fart__file-text">
            <strong>photo.jpg</strong>
            <span className="fart__sizes">
              <s>1.8 MB</s>
              <HugeiconsIcon icon={ArrowRight02Icon} size={12} strokeWidth={2} />
              <b>190 KB</b>
            </span>
          </div>
        </div>
        <div className="fart__quality">
          <span>Quality</span>
          <span className="fart__meter">
            <i className="on" />
            <i className="on" />
            <i className="on" />
            <i />
          </span>
          <strong>Good</strong>
        </div>
      </div>
    </div>
  );
}

/** 4. A country picked, adult or baby, and its rules with the official source. */
export function FinderArt() {
  const rows = [
    ["Size", sizeText(spec)],
    ["Background", spec.background],
  ];

  return (
    <div className="fart fart--finder">
      <div className="fart__finder fart__float">
        <div className="fart__search">
          <HugeiconsIcon icon={Search01Icon} size={13} strokeWidth={2} />
          <span className={`fart__flag ${flagClass(HERO_ENTRY.code)}`} />
          {HERO_ENTRY.country}
        </div>
        <div className="fart__toggle">
          <span className="is-on">Adult</span>
          <span>Baby</span>
        </div>
        {rows.map(([label, value]) => (
          <div key={label} className="fart__spec-row">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <span className="fart__source">
          Official source
          <HugeiconsIcon icon={LinkSquare02Icon} size={11} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}

/** 5. A phone's HEIC file becoming a JPG, with what that does to it. */
export function FormatArt() {
  return (
    <div className="fart fart--format">
      <div className="fart__formats fart__float">
        <div className="fart__doc">
          <span className="fart__doc-tag">HEIC</span>
          <span className="fart__doc-name">IMG_2041</span>
        </div>
        <span className="fart__arrow">
          <HugeiconsIcon icon={ArrowRight02Icon} size={14} strokeWidth={2} />
        </span>
        <div className="fart__doc fart__doc--out">
          <span className="fart__doc-tag">JPG</span>
          <span className="fart__doc-name">IMG_2041</span>
        </div>
      </div>
      <span className="fart__chip fart__chip--note">Small loss, not visible at high quality</span>
    </div>
  );
}
