import GuideFaq from "../../GuideSection/Guide/GuideFaq/GuideFaq";
import { COUNTRY_COUNT, CROP_ONLY, SPEC_COUNT, listJoin } from "../featureData";

/** Questions about the editor's features, in the same accordion as the guide pages. */
export default function FeaturesFaq() {
  return (
    <GuideFaq
      data={{
        id: "faq",
        eyebrow: "FAQ",
        title: "Feature questions.",
        sub: "Quick answers about what the editor does and what you get from it.",
        items: [
          {
            q: "Which countries and documents does the editor support?",
            a: `${SPEC_COUNT} passport and visa photo specs for ${COUNTRY_COUNT} countries, plus the Schengen visa. Pick your country and document in the editor and its rules are applied for you.`,
          },
          {
            q: "Is my photo uploaded to be edited?",
            a: "No. Face detection, background removal and resizing all run in your browser, on your device.",
          },
          {
            q: "What if my country doesn't allow an edited background?",
            a: `${listJoin(CROP_ONLY)} only accept an unedited background, so for these the editor crops your photo and keeps the background as taken. Take the photo against a plain, light wall.`,
          },
          {
            q: "What happens if a check fails?",
            a: "You see which check failed and why. Retake the photo following the tips, or download the version you have to review it yourself.",
          },
          {
            q: "Which files can I upload, and what do I get back?",
            a: "Upload a JPG, PNG or WebP photo up to 15 MB. You get a 300 DPI JPEG sized to your country's photo dimensions and file limits.",
          },
        ],
      }}
    />
  );
}
