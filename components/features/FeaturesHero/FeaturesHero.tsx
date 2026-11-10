import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CropIcon,
  FileExportIcon,
  ScanFaceIcon,
  Tick02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import GetStartedButton from "../../DocumentModal/GetStartedButton";
import { HERO_ENTRY, HERO_SPEC, checksFor, flagClass, kbLabel, sizeText } from "../featureData";
import "./FeaturesHero.scss";

/**
 * The sky header: the headline with a globe set between its words, the upload button in a glass
 * ring, and three glass cards showing one photo made into a German passport photo.
 */
export default function FeaturesHero() {
  const spec = HERO_SPEC;
  const checks = checksFor(spec).length;

  return (
    <section className="fhero" id="top">
      <div className="fhero__content">
        {/* Two lines, the first with a small globe between its words. */}
        <h1 className="fhero__title">
          <span className="fhero__line">
            Meet Your{" "}
            <span className="fhero__tile fhero__tile--globe" aria-hidden="true">
              <Image src="/images/features/hero-tile-globe-white.webp" alt="" width={421} height={220} priority />
            </span>{" "}
            All-in-One
          </span>{" "}
          <span className="fhero__line">Passport Photo Editor</span>
        </h1>

        {/* The upload button in a glass ring. */}
        <div className="fhero__bar">
          <GetStartedButton className="fhero__button">Upload a photo</GetStartedButton>
        </div>
      </div>

      {/* Three cards showing the editor at work. Their details are all in the sections below,
          so they are hidden from screen readers. */}
      <div className="fhero__cards" aria-hidden="true">
        {/* Left: the country picked, and its photo size. */}
        <div className="fhero__col fhero__col--side">
          <div className="fhero__card fhero__card--small">
            <span className={`fhero__flag ${flagClass(HERO_ENTRY.code)}`} />
            <span className="fhero__small-text">
              <span className="fhero__muted">Document</span>
              <strong>{HERO_ENTRY.country} passport</strong>
            </span>
            <span className="fhero__chip fhero__chip--blue">Spec</span>
          </div>

          <div className="fhero__card">
            <span className="fhero__muted">Photo size</span>
            <span className="fhero__big">{sizeText(spec)}</span>
            {spec.headMm && (
              <span className="fhero__sub">
                Head height {spec.headMm[0]}–{spec.headMm[1]} mm
              </span>
            )}
            <div className="fhero__minis">
              <span className="fhero__mini">
                <span className="fhero__mini-icon">
                  <HugeiconsIcon icon={CropIcon} size={14} strokeWidth={2} />
                </span>
                Crop and align
              </span>
              <span className="fhero__mini">
                <span className="fhero__mini-icon">
                  <HugeiconsIcon icon={ViewIcon} size={14} strokeWidth={2} />
                </span>
                Eye level
              </span>
            </div>
          </div>
        </div>

        {/* Middle: the finished photo and its checks. */}
        <div className="fhero__col fhero__col--main">
          <div className="fhero__card fhero__card--main">
            <div className="fhero__head">
              <span className="fhero__head-icon">
                <HugeiconsIcon icon={ScanFaceIcon} size={18} strokeWidth={1.9} />
              </span>
              <span className="fhero__small-text">
                <span className="fhero__muted">Passport photo</span>
                <strong>Requirement check</strong>
              </span>
            </div>

            <div className="fhero__result">
              <span className="fhero__big">
                {checks} / {checks}
              </span>
              <span className="fhero__chip fhero__chip--green">
                <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.6} />
                Passed
              </span>
            </div>

            <span className="fhero__muted fhero__field-label">Your photo</span>
            <div className="fhero__field">
              <div
                className="fhero__photo"
                style={{ background: spec.backgroundColor, aspectRatio: `${spec.widthMm} / ${spec.heightMm}` }}
              >
                <Image
                  src="/images/features/sample-cutout-soft.webp"
                  alt=""
                  width={1200}
                  height={800}
                  priority
                  sizes="140px"
                />
                <span className="fhero__guide fhero__guide--crown" />
                <span className="fhero__guide fhero__guide--chin" />
              </div>
              <ul className="fhero__ticks">
                {["Face recognized", "Even lighting", `${spec.background} background`].map((item) => (
                  <li key={item}>
                    <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.6} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: the photo you uploaded, and the file you get back. */}
        <div className="fhero__col fhero__col--side">
          <div className="fhero__card fhero__card--small">
            <span className="fhero__avatar">
              <Image src="/images/sample/sample-original.webp" alt="" width={1200} height={800} sizes="40px" />
            </span>
            <span className="fhero__small-text">
              <span className="fhero__muted">Uploaded</span>
              <strong>Your photo</strong>
            </span>
          </div>

          <div className="fhero__card">
            <span className="fhero__muted">Export</span>
            <span className="fhero__big">{spec.format}</span>
            <span className="fhero__sub">
              {kbLabel(spec.fileKb[0])} – {kbLabel(spec.fileKb[1])}
            </span>
            <div className="fhero__minis">
              <span className="fhero__mini">
                <span className="fhero__mini-icon">
                  <HugeiconsIcon icon={FileExportIcon} size={14} strokeWidth={2} />
                </span>
                {spec.dpi} DPI
              </span>
              <span className="fhero__mini">
                <span className="fhero__swatch" style={{ background: spec.backgroundColor }} />
                {spec.background}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
