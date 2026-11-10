import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftRightIcon,
  Download01Icon,
  FileExportIcon,
  Tick02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import { HERO_ENTRY, HERO_SPEC, checksFor, flagClass, kbLabel } from "../featureData";

// Small pictures of the editor at each step, built from its own parts and the German passport
// spec used across the page. They only illustrate the text beside them, so the section hides
// them from screen readers.

const spec = HERO_SPEC;
const ORIGINAL = "/images/sample/sample-original.webp";
const CUTOUT = "/images/features/sample-cutout-soft.webp";

function Photo({ src, className = "" }: { src: string; className?: string }) {
  return <Image src={src} alt="" width={1200} height={800} sizes="160px" className={className} />;
}

/** 1. A drop zone with the photo being dropped onto it. */
export function UploadArt() {
  return (
    <div className="fart fart--upload">
      <div className="fart__drop">
        <span className="fart__drop-icon">
          <HugeiconsIcon icon={Upload01Icon} size={18} strokeWidth={2} />
        </span>
        <span className="fart__drop-title">Drop your photo here</span>
        <span className="fart__drop-sub">or browse your files</span>
      </div>
      <div className="fart__thumb fart__float">
        <Photo src={ORIGINAL} />
      </div>
      <span className="fart__chip fart__chip--corner">JPG · PNG · WebP</span>
    </div>
  );
}

/** 2. The photo inside the crop frame, with the face guide and the eye line. */
export function CropArt() {
  return (
    <div className="fart fart--crop">
      <span className="fart__chip fart__chip--ghost">
        <span className="fart__dot" />
        Face found
      </span>
      <div className="fart__frame fart__float">
        <Photo src={ORIGINAL} />
        <span className="fart__oval" />
        <span className="fart__eye" />
        <span className="fart__corner fart__corner--tl" />
        <span className="fart__corner fart__corner--tr" />
        <span className="fart__corner fart__corner--bl" />
        <span className="fart__corner fart__corner--br" />
      </div>
      <span className="fart__chip fart__chip--eye">Eye level</span>
    </div>
  );
}

/** 3. One photo split down the middle: the original on the left, the new background on the right. */
export function BackgroundArt() {
  return (
    <div className="fart fart--bg">
      <div className="fart__split fart__float">
        <div className="fart__split-half">
          <Photo src={ORIGINAL} />
        </div>
        <div className="fart__split-half fart__split-half--after" style={{ background: spec.backgroundColor }}>
          <Photo src={CUTOUT} />
        </div>
        <span className="fart__handle">
          <HugeiconsIcon icon={ArrowLeftRightIcon} size={14} strokeWidth={2} />
        </span>
      </div>
      <span className="fart__chip fart__chip--left">Original</span>
      <span className="fart__chip fart__chip--right">
        <span className="fart__swatch" style={{ background: spec.backgroundColor }} />
        {spec.background}
      </span>
    </div>
  );
}

/** 4. The finished photo with its width and height marked. */
export function ResizeArt() {
  return (
    <div className="fart fart--resize">
      <div className="fart__measure">
        <span className="fart__dim fart__dim--w">
          <span className="fart__dim-label">{spec.widthMm} mm</span>
        </span>
        <div
          className="fart__sized fart__float"
          style={{ background: spec.backgroundColor, aspectRatio: `${spec.widthMm} / ${spec.heightMm}` }}
        >
          <Photo src={CUTOUT} />
        </div>
        <span className="fart__dim fart__dim--h">
          <span className="fart__dim-label">{spec.heightMm} mm</span>
        </span>
      </div>
      <span className="fart__chip fart__chip--dpi">{spec.dpi} DPI</span>
    </div>
  );
}

/** 5. The requirement checks, all passed, over a faded copy for depth. */
export function CheckArt() {
  const rows = checksFor(spec).slice(0, 3);
  return (
    <div className="fart fart--check">
      <div className="fart__list fart__list--ghost" />
      <div className="fart__list fart__float">
        <div className="fart__list-head">
          <span>Requirement check</span>
          <span className="fart__pass">
            <HugeiconsIcon icon={Tick02Icon} size={11} strokeWidth={2.8} />
            {checksFor(spec).length}/{checksFor(spec).length}
          </span>
        </div>
        {rows.map((row) => (
          <div key={row} className="fart__list-row">
            <span className="fart__tick">
              <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
            </span>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 6. The finished file, ready to download. */
export function ExportArt() {
  return (
    <div className="fart fart--export">
      <span className="fart__chip fart__chip--doc">
        <span className={`fart__flag ${flagClass(HERO_ENTRY.code)}`} />
        {HERO_ENTRY.country} passport
      </span>
      <div className="fart__file fart__float">
        <div className="fart__file-row">
          <div className="fart__file-thumb" style={{ background: spec.backgroundColor }}>
            <Photo src={CUTOUT} />
          </div>
          <div className="fart__file-text">
            <strong>Passport photo</strong>
            <span>
              {spec.format} · {kbLabel(spec.fileKb[0])} – {kbLabel(spec.fileKb[1])}
            </span>
          </div>
          <span className="fart__file-icon">
            <HugeiconsIcon icon={FileExportIcon} size={16} strokeWidth={1.9} />
          </span>
        </div>
        <span className="fart__download">
          <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
          Download
        </span>
      </div>
    </div>
  );
}
