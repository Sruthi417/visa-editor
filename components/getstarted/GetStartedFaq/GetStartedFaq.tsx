import GuideFaq from "../../GuideSection/Guide/GuideFaq/GuideFaq";
import { COUNTRY_COUNT, CROP_ONLY, SPEC_COUNT, listJoin } from "../../features/featureData";

/** Questions people ask before they start, in the same accordion as the guide pages. */
export default function GetStartedFaq() {
  return (
    <GuideFaq
      data={{
        id: "faq",
        eyebrow: "FAQ",
        title: "Questions before you start.",
        sub: "Quick answers about making your passport or visa photo.",
        items: [
          {
            q: "What do I need to get started?",
            a: "A phone with a camera, a plain light wall, daylight from a window, and a helper or the phone's timer. Then upload the photo here.",
          },
          {
            q: "Which countries and documents can I make a photo for?",
            a: `${SPEC_COUNT} passport and visa photo specs for ${COUNTRY_COUNT} countries, plus the Schengen visa. Choose yours and its rules are applied for you.`,
          },
          {
            q: "Can I see the photo before I pay?",
            a: "Yes. You see the finished photo and its requirement checks for free, and pay only to download it or order prints.",
          },
          {
            q: "Is my photo uploaded to be edited?",
            a: "No. Face detection, background removal and resizing all run in your browser, on your device.",
          },
          {
            q: "What if my photo fails a check?",
            a: "You see which check failed and why. Retake the photo following the tips and upload it again.",
          },
          {
            q: "Why is my background not changed?",
            a: `${listJoin(CROP_ONLY)} only accept an unedited background, so for these the editor crops your photo and keeps the background as taken. Take it against a plain, light wall.`,
          },
        ],
      }}
    />
  );
}
