import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  DeliveryTruck01Icon,
  Globe02Icon,
  Image01Icon,
  PrinterIcon,
  RulerIcon,
  ScanFaceIcon,
  Search01Icon,
  Tick02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import { HERO_SPEC, SPEC_COUNT, flagClass, photoSpecs, sizeText } from "../../features/featureData";

// The four feature pictures: white app cards over a dotted blue ground, with the same woman as
// the landing pictures. Sizes are in cqw (the picture's width), so each scales as a whole. The
// text beside each one says the same, so the section hides them from screen readers.

const GROUND = "/images/get-started/feature-dots.webp";
const PORTRAIT = "/images/features/sample-portrait.webp";
const spec = HERO_SPEC;

function Ground() {
  return (
    <Image src={GROUND} alt="" fill sizes="(max-width: 992px) 550px, 450px" className="gfart__ground" />
  );
}

function Portrait({ sizes = "200px" }: { sizes?: string }) {
  return <Image src={PORTRAIT} alt="" fill sizes={sizes} className="gfart__photo" />;
}

/** A white label with a small icon tile, the landing page's light blue tile in miniature. */
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
    <span className={`gfart__chip ${className}`}>
      <span className="gfart__chip-icon">
        <HugeiconsIcon icon={icon} size={12} strokeWidth={2} />
      </span>
      {children}
    </span>
  );
}

/** 1. The photo being read: the face guide, a scan line and what passed. */
export function AnalysisArt() {
  return (
    <div className="gfart">
      <Ground />
      <div className="gfart__frame gfart__frame--analysis">
        <div className="gfart__shot">
          <Portrait />
          <span className="gfart__oval" />
          <span className="gfart__scan" />
        </div>
      </div>
      <Chip className="gfart__chip--bg" icon={Image01Icon}>Plain background</Chip>
      <Chip className="gfart__chip--face" icon={ScanFaceIcon}>Face centred</Chip>
      <Chip className="gfart__chip--sharp" icon={ViewIcon}>Sharp and in focus</Chip>
    </div>
  );
}

/** 2. The crop: head top, eye band, chin and centre lines, and the head height measured. */
export function CropArt() {
  const head = spec.headMm ? Math.round((spec.headMm[0] + spec.headMm[1]) / 2) : 34;
  return (
    <div className="gfart">
      <Ground />
      <div className="gfart__frame gfart__frame--crop">
        <div className="gfart__shot">
          <Portrait />
          <span className="gfart__line gfart__line--top" />
          <span className="gfart__band" />
          <span className="gfart__line gfart__line--chin" />
          <span className="gfart__centre" />
        </div>
        <span className="gfart__measure">
          <span className="gfart__measure-label">{head} mm</span>
        </span>
      </div>
      <Chip className="gfart__chip--head" icon={RulerIcon}>Head height in range</Chip>
    </div>
  );
}

/** 3. The country list, Germany chosen, with each country's photo size. */
export function CountryArt() {
  const codes = ["US", "DE", "IN", "JP"];
  const rows = codes
    .map((code) => photoSpecs.find((entry) => entry.code === code))
    .filter((entry) => entry?.passport);

  return (
    <div className="gfart">
      <Ground />
      <div className="gfart__card gfart__card--countries">
        <span className="gfart__card-label">Choose your country</span>
        <span className="gfart__search">
          <HugeiconsIcon icon={Search01Icon} size={12} strokeWidth={2} />
          Search countries
        </span>
        {rows.map((entry) => (
          <span
            key={entry!.code}
            className={`gfart__country${entry!.code === "DE" ? " is-on" : ""}`}
          >
            <span className={`gfart__flag ${flagClass(entry!.code)}`} />
            <span className="gfart__country-name">{entry!.country}</span>
            <span className="gfart__country-size">{sizeText(entry!.passport!)}</span>
            {entry!.code === "DE" && (
              <span className="gfart__check">
                <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
              </span>
            )}
          </span>
        ))}
      </div>
      <Chip className="gfart__chip--specs" icon={Globe02Icon}>{SPEC_COUNT} photo specs</Chip>
    </div>
  );
}

/** 4. A 4 × 6 in sheet of finished photos, and the prints on their way. */
export function PrintArt() {
  return (
    <div className="gfart">
      <Ground />
      <Chip className="gfart__chip--sheet" icon={PrinterIcon}>
        4 × 6 in · {spec.dpi} DPI
      </Chip>
      <div className="gfart__card gfart__card--sheet">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} className="gfart__print" style={{ background: spec.backgroundColor }}>
            <Portrait sizes="60px" />
          </span>
        ))}
      </div>
      <Chip className="gfart__chip--deliver" icon={DeliveryTruck01Icon}>
        Prints delivered to your door
      </Chip>
    </div>
  );
}
