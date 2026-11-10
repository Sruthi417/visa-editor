import Image from "next/image";
import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Camera01Icon,
  CropIcon,
  DeliveryTruck01Icon,
  Globe02Icon,
  MagicWand01Icon,
  QrCodeIcon,
} from "@hugeicons/core-free-icons";

import { COUNTRY_COUNT, SPEC_COUNT } from "../featureData";
import ShowcaseAccordion, { type ShowcaseItem } from "./ShowcaseAccordion";
import { CaptureArt, HandoffArt } from "./ShowcaseArt";
import ShowcaseRows from "./ShowcaseRows";
import "./FeaturesShowcase.scss";

type Feature = {
  id: string;
  icon: typeof Camera01Icon;
  title: string;
  text: string;
  items: ShowcaseItem[];
  // A landing page picture, or one drawn for this page.
  picture: { src: string; alt: string } | { art: ReactNode };
};

// The landing page's four features with their pictures, joined by live capture and the phone
// handoff, the crop editor's controls, and prints delivered to the door.
const FEATURES: Feature[] = [
  {
    id: "live-capture",
    icon: Camera01Icon,
    title: "Live capture with guides",
    text: "Take your photo right in the editor. A guide on screen shows where to stand, and the camera takes the shot itself once every check passes.",
    items: [
      {
        title: "On-screen face guide",
        text: "An outline drawn from your country's rules shows where your face and eyes should sit before you take the photo.",
      },
      {
        title: "Level indicator",
        text: "A level shows when your phone is tilted, so your head and shoulders come out straight.",
      },
      {
        title: "Auto-capture",
        text: "When every check passes, the camera takes the photo for you, so you don't move while reaching for the button.",
      },
      {
        title: "Or upload a photo",
        text: "Already have one? Upload a JPG, PNG or WebP up to 15 MB from your phone or computer.",
      },
    ],
    picture: { art: <CaptureArt /> },
  },
  {
    id: "phone-handoff",
    icon: QrCodeIcon,
    title: "Start on a laptop, take the photo on your phone",
    text: "Applying on a computer with no good camera? Scan a QR code to open the camera on your phone, and the photo comes straight back to your computer.",
    items: [
      {
        title: "Scan a QR code",
        text: "The editor shows a code on your computer. Scan it with your phone and the camera opens there.",
      },
      {
        title: "Photo sent back",
        text: "As soon as you take the photo, it appears in the same session on your computer.",
      },
      {
        title: "Finish on the big screen",
        text: "Crop, check and download on your computer, where the details are easier to see.",
      },
    ],
    picture: { art: <HandoffArt /> },
  },
  {
    id: "photo-analysis",
    icon: MagicWand01Icon,
    title: "AI photo analysis",
    text: "The editor reads your photo for background, face position and clarity, then fixes what it can in one pass.",
    items: [
      {
        title: "Country-specific backgrounds",
        text: "Replaces the backdrop with the plain colour your country asks for, such as white or light grey.",
      },
      {
        title: "Accurate positioning and edge detection",
        text: "Finds your face and traces your hair and shoulders, so the new background meets them cleanly.",
      },
      {
        title: "Shadow removal",
        text: "Clears shadows from the background behind you, so it comes out as one even colour.",
      },
      {
        title: "One-tap processing",
        text: "Upload once and every step runs for you, showing each one as it happens.",
      },
      {
        title: "Seven requirement checks",
        text: "Your face, a single person, size, proportions, lighting, background and file size are all checked before you download.",
      },
    ],
    picture: {
      src: "/images/features/feature-1-tall.webp",
      alt: "A photo with face guides beside the same photo on a plain white background",
    },
  },
  {
    id: "crop-editor",
    icon: CropIcon,
    title: "A crop editor locked to the rules",
    text: "Drag and zoom the frame yourself. It starts from the best automatic crop, so most people only need to confirm it.",
    items: [
      {
        title: "Guide lines from your country's rules",
        text: "Lines for the top of the head, chin, eye band, centre line and edge margin are drawn from the official measurements.",
      },
      {
        title: "Live colour feedback",
        text: "Green when a measurement is in range, amber near the limit and red outside it, with a short tip such as “Head too small, zoom in a little”.",
      },
      {
        title: "Hard limits",
        text: "Export is blocked while anything is out of range, and zoom can't drop the resolution below the minimum. The frame can't add padding, rotate or go past the edge of your photo.",
      },
      {
        title: "Move the head and chin markers",
        text: "If detection is off, drag the head-top and chin markers into place. The measurement uses your position and records that it was set by hand.",
      },
      {
        title: "Reset, undo and compare",
        text: "Step back, start again or compare with your original at any time, in an editor designed for phones first.",
      },
    ],
    picture: {
      src: "/images/features/feature-2-tall.webp",
      alt: "A passport photo marked with its 2 by 2 inch size",
    },
  },
  {
    id: "country-rules",
    icon: Globe02Icon,
    title: "Country specifications",
    text: `Pick your country and document and its exact photo rules are applied: ${SPEC_COUNT} passport and visa specs in ${COUNTRY_COUNT} countries, plus the Schengen visa.`,
    items: [
      {
        title: "Passport and visa presets",
        text: "Photo size, head height, background colour and file limits are set for each document.",
      },
      {
        title: "Up-to-date requirements",
        text: "Each preset follows the official rules for that country's passport or visa photo.",
      },
      {
        title: "Compliance checks",
        text: "Your photo is measured against the preset's rules before you download it.",
      },
      {
        title: "Clear fix suggestions",
        text: "If a check fails, you see which one and what to change, such as retaking the photo in even light.",
      },
    ],
    picture: {
      src: "/images/features/feature-3-tall.webp",
      alt: "Choosing passport or visa and the country in the editor",
    },
  },
  {
    id: "preview-and-prints",
    icon: DeliveryTruck01Icon,
    title: "Free preview, download or prints to your door",
    text: "See the finished photo before you pay. Then download it for an online application, or order prints and have them delivered to your door.",
    items: [
      {
        title: "Free preview before payment",
        text: "Check the finished photo and its requirement checks before you pay anything.",
      },
      {
        title: "Digital download",
        text: "A 300 DPI JPEG inside your country's file-size limits, ready to upload with your application.",
      },
      {
        title: "4 × 6 in photo sheets",
        text: "A print-ready sheet of photos to print at home or at any photo shop.",
      },
      {
        title: "Prints delivered to your door",
        text: "Order printed photos and we post them to your address, ready to hand in with your application.",
      },
    ],
    picture: {
      src: "/images/features/feature-4-tall.webp",
      alt: "A printed passport photo beside a passport and a visa",
    },
  },
];

/** Each feature as a row: icon, title, text and details on one side, its picture on the other. */
export default function FeaturesShowcase() {
  return (
    <section className="fshow" id="features">
      <div className="fshow__wrap">
        <header className="fshow__head">
          <span>Features</span>
          <h2>Every tool from first photo to final print</h2>
          <p>
            Take, crop and check your passport or visa photo in one place, then download it or get
            prints delivered to your door.
          </p>
        </header>

        <ShowcaseRows>
          {FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              id={feature.id}
              className={`fshow__row${index % 2 === 1 ? " fshow__row--reverse" : ""}`}
            >
              <div className="fshow__content">
                <span className="fshow__icon" aria-hidden="true">
                  <HugeiconsIcon icon={feature.icon} size={26} strokeWidth={1.8} />
                </span>
                <h3 className="fshow__title">{feature.title}</h3>
                <p className="fshow__text">{feature.text}</p>
                <ShowcaseAccordion items={feature.items} />
              </div>

              <div className="fshow__media">
                {"art" in feature.picture ? (
                  <div className="fshow__art" aria-hidden="true">
                    {feature.picture.art}
                  </div>
                ) : (
                  <Image
                    className="fshow__img"
                    src={feature.picture.src}
                    alt={feature.picture.alt}
                    fill
                    sizes="(max-width: 992px) 550px, 500px"
                  />
                )}
              </div>
            </article>
          ))}
        </ShowcaseRows>
      </div>
    </section>
  );
}
