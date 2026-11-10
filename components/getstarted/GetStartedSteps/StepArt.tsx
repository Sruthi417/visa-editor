import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  CropIcon,
  Download01Icon,
  PrinterIcon,
  SecurityCheckIcon,
  TaskDone01Icon,
  Tick02Icon,
  Upload01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import { checksFor, flagClass, photoSpecs, sizeText } from "../../features/featureData";

// One picture for each step, drawn as the editor's own screens: white app cards over the blue
// grid paper, with the same woman throughout, from her snapshot at home to the finished photo. They
// follow a United States passport, the editor's default, so the finished photo is on white.
// Sizes are in cqw (the picture's width), so each scales as a whole.

const ENTRY = photoSpecs.find((entry) => entry.code === "US")!;
const SPEC = ENTRY.passport!;
const SIZE = sizeText(SPEC);
const SNAPSHOT = "/images/get-started/step-snapshot.webp";
const PORTRAIT = "/images/features/sample-portrait.webp";

/** A white label with a small icon tile, as on the feature pictures. */
function Chip({
  className,
  icon,
  children,
}: {
  className: string;
  icon: IconSvgElement;
  children: React.ReactNode;
}) {
  return (
    <span className={`gsart__chip ${className}`}>
      <span className="gsart__chip-icon">
        <HugeiconsIcon icon={icon} size={12} strokeWidth={2} />
      </span>
      {children}
    </span>
  );
}

/** A round green tick or red cross on a photo's corner. */
function Badge({ ok }: { ok: boolean }) {
  return (
    <span className={`gsart__badge${ok ? "" : " gsart__badge--bad"}`}>
      <HugeiconsIcon icon={ok ? Tick02Icon : Cancel01Icon} size={12} strokeWidth={3} />
    </span>
  );
}

/** 1. The start panel: passport chosen, the country picked and its rules filled in. */
export function DocumentArt() {
  const rows = [
    { label: "Photo size", value: SIZE },
    { label: "Head height", value: SPEC.headMm ? `${SPEC.headMm[0]}–${SPEC.headMm[1]} mm` : "Any" },
  ];
  return (
    <div className="gsart">
      <div className="gsart__card gsart__card--doc">
        <span className="gsart__doc-head">
          <span className="gsart__label">Your document</span>
          <span className="gsart__toggle">
            <span className="is-on">Passport</span>
            <span>Visa</span>
          </span>
        </span>
        <span className="gsart__field">
          <span className={`gsart__flag ${flagClass(ENTRY.code)}`} />
          <span className="gsart__field-name">{ENTRY.country}</span>
          <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={2} />
        </span>
        <span className="gsart__rows">
          {rows.map((row) => (
            <span key={row.label} className="gsart__row">
              <span>{row.label}</span>
              <b>{row.value}</b>
            </span>
          ))}
          <span className="gsart__row">
            <span>Background</span>
            <b>
              <i className="gsart__swatch" style={{ background: SPEC.backgroundColor }} />
              {SPEC.background}
            </b>
          </span>
        </span>
        <Chip className="gsart__chip--rules" icon={TaskDone01Icon}>
          Rules set for you
        </Chip>
      </div>
    </div>
  );
}

/** 2. Her snapshot dragged over the drop zone, which turns solid blue to take it. */
export function UploadArt() {
  return (
    <div className="gsart">
      <div className="gsart__card gsart__card--upload">
        <span className="gsart__drop">
          <span className="gsart__drop-icon">
            <HugeiconsIcon icon={Upload01Icon} size={14} strokeWidth={2} />
          </span>
          <span className="gsart__drop-text">
            <b>Drop it to start</b>
            <span>JPG, PNG or WebP up to 15 MB</span>
          </span>
        </span>
        <span className="gsart__drag">
          <span className="gsart__drag-photo">
            <Image src={SNAPSHOT} alt="" width={452} height={362} sizes="200px" />
          </span>
          <svg className="gsart__cursor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 3.5 L5 19 L9.2 15.2 L12 21 L14.8 19.8 L12 14 L17.8 14 Z"
              fill="#131313"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <Chip className="gsart__chip--device" icon={SecurityCheckIcon}>
          Prepared on your device
        </Chip>
      </div>
    </div>
  );
}

/** 3. The snapshot, then the same photo cropped, on white and checked. */
export function FitArt() {
  return (
    <div className="gsart">
      <span className="gsart__pair">
        <span className="gsart__frame gsart__frame--before">
          <span className="gsart__shot gsart__shot--before">
            <Image src={SNAPSHOT} alt="" width={452} height={362} sizes="200px" />
          </span>
          <Badge ok={false} />
        </span>
        <span className="gsart__next">
          <HugeiconsIcon icon={ArrowRight02Icon} size={14} strokeWidth={2.2} />
        </span>
        <span className="gsart__frame gsart__frame--after">
          <span className="gsart__shot gsart__shot--after">
            <Image src={PORTRAIT} alt="" width={486} height={546} sizes="220px" />
          </span>
          <Badge ok />
          <Chip className="gsart__chip--crop" icon={CropIcon}>
            Cropped to {SIZE}
          </Chip>
          <Chip className="gsart__chip--checks" icon={CheckmarkBadge01Icon}>
            {checksFor(SPEC).length} checks passed
          </Chip>
        </span>
      </span>
    </div>
  );
}

/** 4. The finished photo, ready to download or to have printed. */
export function ReadyArt() {
  return (
    <div className="gsart">
      <div className="gsart__card gsart__card--ready">
        <span className="gsart__ready-photo">
          <Image src={PORTRAIT} alt="" width={486} height={546} sizes="200px" />
        </span>
        <span className="gsart__ready-body">
          <span className="gsart__label">Your photo is ready</span>
          <span className="gsart__meta">{ENTRY.country} passport</span>
          <span className="gsart__meta">
            {SIZE} · {SPEC.dpi} DPI
          </span>
          <span className="gsart__buttons">
            <span className="gsart__button gsart__button--dark">
              <HugeiconsIcon icon={Download01Icon} size={12} strokeWidth={2} />
              Download
            </span>
            <span className="gsart__button">
              <HugeiconsIcon icon={PrinterIcon} size={12} strokeWidth={2} />
              Order prints
            </span>
          </span>
        </span>
        <Chip className="gsart__chip--free" icon={ViewIcon}>
          Free preview
        </Chip>
      </div>
    </div>
  );
}

export const STEP_ART = [DocumentArt, UploadArt, FitArt, ReadyArt];

/** What each picture shows, for screen readers. */
export const STEP_ART_LABELS = [
  `The start panel with Passport chosen, ${ENTRY.country} picked and its photo size, head height and background filled in`,
  "A home snapshot being dragged onto the drop zone",
  `The home snapshot, then the same photo cropped to ${SIZE} on a ${SPEC.background.toLowerCase()} background, with its checks passed`,
  "The finished photo with buttons to download it or order prints",
];
