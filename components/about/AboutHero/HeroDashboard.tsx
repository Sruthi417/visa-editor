import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CheckListIcon,
  CheckmarkBadge01Icon,
  CustomerSupportIcon,
  DashboardSquare01Icon,
  Download01Icon,
  File02Icon,
  Globe02Icon,
  Image01Icon,
  Notification03Icon,
  PrinterIcon,
  RulerIcon,
  Search01Icon,
  Settings01Icon,
  Sun03Icon,
  Tick02Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";

import { checksFor, flagClass, kbLabel, photoSpecs, sizeText } from "../../features/featureData";

// The hero's dashboard: the editor's photo report for one photo, drawn as an app window. It
// shows what FlyFrame measures, not company figures: the checks, the size and file limits read
// from the editor's own specs, light across the face for the even lighting check, and the
// finished photo. It follows a United States passport, the editor's default.

const ENTRY = photoSpecs.find((entry) => entry.code === "US")!;
const SPEC = ENTRY.passport!;
const CHECKS = checksFor(SPEC).length;
// An example file, inside the limits.
const FILE_KB = 248;
// Brightness across the face, left to right, as a share of the brightest: an evenly lit photo.
const LIGHT = [78, 82, 85, 88, 90, 92, 93, 93, 91, 89, 87, 84, 81, 79];

const NAV: { label: string; icon: IconSvgElement; on?: boolean }[] = [
  { label: "Dashboard", icon: DashboardSquare01Icon, on: true },
  { label: "My photos", icon: Image01Icon },
  { label: "Checks", icon: CheckListIcon },
  { label: "Prints", icon: PrinterIcon },
  { label: "Countries", icon: Globe02Icon },
];
const MORE: { label: string; icon: IconSvgElement }[] = [
  { label: "Settings", icon: Settings01Icon },
  { label: "Support", icon: CustomerSupportIcon },
];

const STATS = [
  {
    label: "Requirement checks",
    value: String(CHECKS),
    unit: `/${CHECKS}`,
    foot: "All passed",
    icon: CheckmarkBadge01Icon,
    tone: "green",
  },
  {
    label: "Photo size",
    value: sizeText(SPEC).replace(" in", "").replace(" mm", ""),
    unit: SPEC.imperial ? " in" : " mm",
    foot: `${SPEC.widthMm} × ${SPEC.heightMm} mm, ${SPEC.dpi} DPI`,
    icon: RulerIcon,
    tone: "blue",
  },
  {
    label: "File size",
    value: String(FILE_KB),
    unit: " KB",
    foot: `Allowed: ${kbLabel(SPEC.fileKb[0])} – ${kbLabel(SPEC.fileKb[1])}`,
    icon: File02Icon,
    tone: "amber",
  },
];

export default function HeroDashboard() {
  return (
    <div
      className="ab-dash"
      role="img"
      aria-label={`The FlyFrame photo report for a ${ENTRY.country} passport photo: ${CHECKS} of ${CHECKS} checks passed, ${sizeText(SPEC)} at ${SPEC.dpi} DPI, a ${FILE_KB} KB file, even lighting, and the finished photo ready to download or print`}
    >
      <div className="ab-dash__app" aria-hidden="true">
        <aside className="ab-dash__side">
          <Image
            className="ab-dash__logo"
            src="/images/logo/flyframe.webp"
            alt=""
            width={145}
            height={36}
          />
          <span className="ab-dash__group">Menu</span>
          {NAV.map((item) => (
            <span key={item.label} className={`ab-dash__nav${item.on ? " is-on" : ""}`}>
              <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.8} />
              {item.label}
            </span>
          ))}
          <span className="ab-dash__group">Account</span>
          {MORE.map((item) => (
            <span key={item.label} className="ab-dash__nav">
              <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.8} />
              {item.label}
            </span>
          ))}
        </aside>

        <div className="ab-dash__main">
          <div className="ab-dash__top">
            <span className="ab-dash__title">Photo report</span>
            <span className="ab-dash__doc">
              <span className={`ab-dash__flag ${flagClass(ENTRY.code)}`} />
              {ENTRY.country} passport
              <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={2} />
            </span>
            <span className="ab-dash__search">
              <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={2} />
              Search countries
            </span>
            <span className="ab-dash__icon-button">
              <HugeiconsIcon icon={Notification03Icon} size={16} strokeWidth={1.8} />
            </span>
            <span className="ab-dash__icon-button">
              <HugeiconsIcon icon={UserCircleIcon} size={18} strokeWidth={1.8} />
            </span>
          </div>

          <div className="ab-dash__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="ab-dash__card ab-dash__stat">
                <span className="ab-dash__stat-head">
                  {stat.label}
                  <span className={`ab-dash__tile ab-dash__tile--${stat.tone}`}>
                    <HugeiconsIcon icon={stat.icon} size={16} strokeWidth={1.9} />
                  </span>
                </span>
                <span className="ab-dash__value">
                  {stat.value}
                  <small>{stat.unit}</small>
                </span>
                <span className="ab-dash__foot">{stat.foot}</span>
              </div>
            ))}
          </div>

          <div className="ab-dash__lower">
            <div className="ab-dash__card ab-dash__chart">
              <span className="ab-dash__card-head">
                <span className="ab-dash__card-title">
                  <HugeiconsIcon icon={Sun03Icon} size={16} strokeWidth={1.9} />
                  Light across the face
                </span>
                <span className="ab-dash__pass">
                  <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.6} />
                  Even lighting
                </span>
              </span>
              <span className="ab-dash__plot">
                <span className="ab-dash__band" />
                {LIGHT.map((value, index) => (
                  <span key={index} className="ab-dash__bar" style={{ height: `${value}%` }} />
                ))}
              </span>
              <span className="ab-dash__axis">
                <span>Left</span>
                <span>Centre</span>
                <span>Right</span>
              </span>
            </div>

            <div className="ab-dash__card ab-dash__photo">
              <span className="ab-dash__card-title">Your photo</span>
              <span className="ab-dash__shot">
                <Image
                  src="/images/features/sample-portrait.webp"
                  alt=""
                  width={486}
                  height={546}
                  sizes="140px"
                />
              </span>
              <span className="ab-dash__file">
                <b>passport-photo.jpg</b>
                <span className="ab-dash__meta">
                  {sizeText(SPEC)} · {SPEC.dpi} DPI
                </span>
              </span>
              <span className="ab-dash__button ab-dash__button--dark">
                <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={2} />
                Download
              </span>
              <span className="ab-dash__button">
                <HugeiconsIcon icon={PrinterIcon} size={14} strokeWidth={2} />
                Order prints
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
