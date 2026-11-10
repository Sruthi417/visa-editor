import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

// Pictures for the two features the landing page has no picture for. They follow the landing
// feature pictures: white app cards over the same sky, with the same woman. Sizes are in cqw
// (the picture's width), so each one scales as a whole. The section hides them from screen
// readers because the text beside them says the same.

const SKY = "/images/features/feature-sky.webp";
const PORTRAIT = "/images/features/sample-portrait.webp";

function Sky() {
  return (
    <Image
      src={SKY}
      alt=""
      fill
      sizes="(max-width: 992px) 550px, 500px"
      className="fsart__sky"
    />
  );
}

function Portrait() {
  return (
    <Image src={PORTRAIT} alt="" fill sizes="220px" className="fsart__photo" />
  );
}

function Chip({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`fsart__chip ${className}`}>
      <span className="fsart__tick">
        <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
      </span>
      {children}
    </span>
  );
}

/** The live camera: face guide, level, and the shutter filling as it captures by itself. */
export function CaptureArt() {
  return (
    <div className="fsart fsart--capture">
      <Sky />
      <div className="fsart__stage">
        <div className="fsart__phone">
          <div className="fsart__screen">
            <Portrait />
            <span className="fsart__level">
              <span className="fsart__level-line" />
              <span className="fsart__level-dot" />
              <span className="fsart__level-line" />
            </span>
            <span className="fsart__oval" />
            <span className="fsart__status">Hold still</span>
            <span className="fsart__shutter">
              <svg viewBox="0 0 40 40">
                <circle
                  className="fsart__shutter-track"
                  cx="20"
                  cy="20"
                  r="17"
                />
                <circle
                  className="fsart__shutter-fill"
                  cx="20"
                  cy="20"
                  r="17"
                  pathLength="100"
                />
              </svg>
            </span>
          </div>
        </div>
        <Chip className="fsart__chip--face">Face in the guide</Chip>
        <Chip className="fsart__chip--level">Phone is level</Chip>
      </div>
    </div>
  );
}

/** A small QR code, drawn from a fixed pattern so it looks the same on every render. */
function QrCode() {
  const N = 21;
  let seed = 11;
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);

  let modules = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (inFinder(x, y)) continue;
      const timing = x === 6 || y === 6;
      const dark = timing ? (x + y) % 2 === 0 : random() > 0.5;
      if (dark) modules += `M${x} ${y}h1v1h-1z`;
    }
  }

  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z M${x + 2} ${y + 2}h3v3h-3z`;

  return (
    <svg
      className="fsart__qr"
      viewBox="-1 -1 23 23"
      shapeRendering="crispEdges"
    >
      <rect x="-1" y="-1" width="23" height="23" fill="#ffffff" />
      <path d={modules} />
      <path
        d={`${finder(0, 0)} ${finder(N - 7, 0)} ${finder(0, N - 7)}`}
        fillRule="evenodd"
      />
    </svg>
  );
}

/** The computer showing a QR code, and the phone that took the photo sending it back. */
export function HandoffArt() {
  return (
    <div className="fsart fsart--handoff">
      <Sky />
      <div className="fsart__stage">
        <div className="fsart__window">
          <div className="fsart__window-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="fsart__window-body">
            <QrCode />
            <strong>Use your phone&apos;s camera</strong>
            <span>Scan the code to take your photo on your phone</span>
          </div>
        </div>
        <div className="fsart__phone fsart__phone--small">
          <div className="fsart__screen">
            <Portrait />
          </div>
        </div>
        <Chip className="fsart__chip--sent">Sent to your computer</Chip>
      </div>
    </div>
  );
}
