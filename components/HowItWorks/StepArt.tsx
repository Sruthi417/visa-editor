import { HugeiconsIcon } from "@hugeicons/react";
import {
  CropIcon,
  Download01Icon,
  Image01Icon,
  Tick02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const PORTRAIT = unsplash("photo-1500648767791-00dcc994a43e", 300);
const PASSPORT = unsplash("photo-1506794778202-cad84cf45f1d", 300);

/** Step 1: a drop zone with the file mid-upload. */
export function UploadArt() {
  return (
    <div className="art art--upload" aria-hidden="true">
      <div className="art__dropzone">
        <span className="art__dropzone-icon">
          <HugeiconsIcon icon={Upload01Icon} size={18} strokeWidth={1.8} />
        </span>
        <span className="art__dropzone-text">Drop your photo here</span>
      </div>

      <div className="art__file">
        <div className="art__file-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PORTRAIT} alt="" loading="lazy" />
        </div>
        <div className="art__file-meta">
          <div className="art__file-row">
            <span className="art__file-name">portrait.jpg</span>
            <span className="art__file-size">2.4 MB</span>
          </div>
          <div className="art__progress">
            <span className="art__progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Step 2: the portrait inside the official crop frame, with its checks. */
export function FitArt() {
  const checks = ["Face centred", "Plain background", "Correct head size"];

  return (
    <div className="art art--fit" aria-hidden="true">
      <div className="art__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PASSPORT} alt="" loading="lazy" />
        <span className="art__guide" />
        <span className="art__corner art__corner--tl" />
        <span className="art__corner art__corner--tr" />
        <span className="art__corner art__corner--bl" />
        <span className="art__corner art__corner--br" />
        <span className="art__chip">
          <HugeiconsIcon icon={CropIcon} size={13} strokeWidth={1.8} />
          35 × 45 mm
        </span>
      </div>

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

/** Step 3: a print sheet of the finished photo and the download button. */
export function DownloadArt() {
  return (
    <div className="art art--download" aria-hidden="true">
      <div className="art__sheet">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="art__sheet-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PASSPORT} alt="" loading="lazy" />
          </div>
        ))}
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
