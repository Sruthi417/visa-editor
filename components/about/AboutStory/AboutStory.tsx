import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  File02Icon,
  RulerIcon,
  ScanFaceIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import { kbLabel, photoSpecs, sizeText } from "../../features/featureData";
import "./AboutStory.scss";

// The picture follows a United States passport, the editor's default, so the photo is on white.
const ENTRY = photoSpecs.find((entry) => entry.code === "US")!;
const SPEC = ENTRY.passport!;

/** A white label with a small icon tile, or a colour swatch in its place. */
function Rule({
  className,
  icon,
  swatch,
  children,
}: {
  className: string;
  icon?: IconSvgElement;
  swatch?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`ab-sart__rule ${className}`}>
      <span className="ab-sart__rule-icon">
        {icon ? (
          <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
        ) : (
          <span className="ab-sart__swatch" style={{ background: swatch }} />
        )}
      </span>
      {children}
    </span>
  );
}

/** Why FlyFrame exists: what makes the photo hard, and what the editor does about it. */
export default function AboutStory() {
  const head = SPEC.headMm ? `${SPEC.headMm[0]}–${SPEC.headMm[1]} mm` : "in range";
  const file = `${SPEC.format}, ${kbLabel(SPEC.fileKb[0])} – ${kbLabel(SPEC.fileKb[1])}`;

  return (
    <section className="ab-story" id="why-flyframe">
      <div className="ab-story__wrap">
        <div className="ab-story__copy">
          <header className="ab-story__head">
            <span>Why FlyFrame</span>
            <h2>Photo rules are strict. Meeting them shouldn&apos;t be hard.</h2>
          </header>

          <div className="ab-story__text">
            <p>
              Every country sets its own photo rules: the size, how big your head should be, the
              background colour and even the file size. A photo that misses one of them can be
              sent back, and you start again.
            </p>
            <p>
              FlyFrame reads those published rules for you. Choose your document and country,
              upload a photo from your phone, and the editor crops, sizes and checks it to that
              specification, so there is nothing to measure or guess.
            </p>
            <p>
              It all happens in your browser. There is no studio to visit, and your photo
              isn&apos;t uploaded to be edited.
            </p>
          </div>
        </div>

        {/* The rules from the first paragraph, each met on a finished photo. */}
        <div
          className="ab-story__media"
          role="img"
          aria-label={`A finished ${ENTRY.country} passport photo with its rules met: ${sizeText(SPEC)}, head height ${head}, ${SPEC.background.toLowerCase()} background, and ${file}`}
        >
          <div className="ab-sart" aria-hidden="true">
            <span className="ab-sart__mount">
              <span className="ab-sart__photo">
                <Image
                  src="/images/features/sample-portrait.webp"
                  alt=""
                  width={486}
                  height={546}
                  sizes="(max-width: 900px) 60vw, 260px"
                />
                <span className="ab-sart__guide ab-sart__guide--crown" />
                <span className="ab-sart__guide ab-sart__guide--chin" />
                <span className="ab-sart__bracket" />
              </span>
              <span className="ab-sart__badge">
                <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.8} />
              </span>
            </span>

            <Rule className="ab-sart__rule--size" icon={RulerIcon}>
              {sizeText(SPEC)} photo
            </Rule>
            <Rule className="ab-sart__rule--head" icon={ScanFaceIcon}>
              Head {head}
            </Rule>
            <Rule className="ab-sart__rule--bg" swatch={SPEC.backgroundColor}>
              {SPEC.background} background
            </Rule>
            <Rule className="ab-sart__rule--file" icon={File02Icon}>
              {file}
            </Rule>
          </div>
        </div>
      </div>
    </section>
  );
}
