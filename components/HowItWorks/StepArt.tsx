import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  Image01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const UPLOAD_ILLUSTRATION = "/work1.png";
const FIT_PORTRAIT = "/work2.png";
const DOWNLOAD_ILLUSTRATION = "/work3.png";

/** Step 1: a photo being dropped onto the upload area. */
export function UploadArt() {
  return (
    <div className="art art--upload" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="art__illustration" src={UPLOAD_ILLUSTRATION} alt="" loading="lazy" />
    </div>
  );
}

/** Step 2: the framed portrait with its checks, centred together. */
export function FitArt() {
  const checks = ["Face centred", "Plain background", "Correct head size"];

  return (
    <div className="art art--fit" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="art__portrait" src={FIT_PORTRAIT} alt="" loading="lazy" />

      <ul className="art__checks">
        {checks.map((label) => (
          <li key={label} className="art__check">
            <span className="art__check-icon">
              <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.4} />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Step 3: a printer with the photo sheet, and the download button. */
export function DownloadArt() {
  return (
    <div className="art art--download" aria-hidden="true">
      <div className="art__printer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DOWNLOAD_ILLUSTRATION} alt="" loading="lazy" />
      </div>

      <div className="art__actions">
        <span className="art__format">
          <HugeiconsIcon icon={Image01Icon} size={14} strokeWidth={1.8} />
          4 × 6 in · 300 DPI
        </span>
        <span className="art__download">
          <HugeiconsIcon icon={Download01Icon} size={16} strokeWidth={1.8} />
          Download
        </span>
      </div>
    </div>
  );
}
