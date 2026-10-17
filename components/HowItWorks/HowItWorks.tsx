import type { ReactNode } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Download01Icon,
  MagicWand01Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import StepStack from "./StepStack";
import { DownloadArt, FitArt, UploadArt } from "./StepArt";
import "./HowItWorks.scss";

type Step = {
  key: string;
  title: string;
  body: string;
  icon: IconSvgElement;
  art: ReactNode;
};

const steps: Step[] = [
  {
    key: "upload",
    title: "Upload your photo",
    body: "Upload a photo from your phone or computer that meets the photo guidelines. We'll take it from there.",
    icon: Upload01Icon,
    art: <UploadArt />,
  },
  {
    key: "fit",
    title: "We fit it to the rules",
    body: "Crop, head size and background are set to your country's official passport or visa specification.",
    icon: MagicWand01Icon,
    art: <FitArt />,
  },
  {
    key: "download",
    title: "Download and print",
    body: "Get a single compliant photo or a ready-to-print sheet, in seconds and at print resolution.",
    icon: Download01Icon,
    art: <DownloadArt />,
  },
];

/**
 * Sticky heading on the left, a stack of sticky step cards on the right that
 * slide over one another as the page scrolls. Below 900px it is a plain column.
 */
export default function HowItWorks() {
  return (
    <section className="how" id="process">
      <div className="how__inner">
        <div className="how__heading">
          <span className="how__eyebrow">How it works</span>
          <h2 className="how__title">Three steps to a photo that gets accepted</h2>
          <p className="how__description">
            No studio, no guesswork. Upload once and walk away with a photo
            that meets the official requirements.
          </p>
        </div>

        <StepStack>
          {steps.map(({ key, title, body, icon, art }, i) => (
            <article
              key={key}
              data-step-card
              className={`how__card${i > 0 ? " how__card--lift" : ""}`}
              style={{ zIndex: i + 1 }}
            >
              <div className="how__card-head">
                <span className="how__card-icon">
                  <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="how__card-title">{title}</h3>
                  <p className="how__card-body">{body}</p>
                </div>
              </div>
              <div className="how__card-art">{art}</div>
            </article>
          ))}
        </StepStack>
      </div>
    </section>
  );
}
