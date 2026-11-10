import GuideFaq from "../../GuideSection/Guide/GuideFaq/GuideFaq";
import { COUNTRY_COUNT, SPEC_COUNT } from "../../features/featureData";

/** Questions about FlyFrame itself, in the same accordion as the guide pages. */
export default function AboutFaq() {
  return (
    <GuideFaq
      data={{
        id: "faq",
        eyebrow: "FAQ",
        title: "Questions about FlyFrame.",
        sub: "Quick answers about who we are and how the editor works.",
        items: [
          {
            q: "What is FlyFrame?",
            a: "An online passport and visa photo editor. It crops, sizes and checks your photo against your country's published rules, in your browser.",
          },
          {
            q: "Will my photo be accepted?",
            a: "FlyFrame checks your photo against the published specification for your document and tells you if anything fails. The final decision is always the issuing authority's, so check their official requirements before you apply.",
          },
          {
            q: "Is my photo uploaded to be edited?",
            a: "No. Face detection, background removal and resizing all run in your browser, on your device.",
          },
          {
            q: "Which countries does FlyFrame cover?",
            a: `${SPEC_COUNT} passport and visa photo specs for ${COUNTRY_COUNT} countries, plus the Schengen visa.`,
          },
          {
            q: "Where do the photo rules come from?",
            a: "Each preset follows the photo requirements the country publishes for that document: the size, head height, background and file limits.",
          },
          {
            q: "Can I try it before I pay?",
            a: "Yes. You see the finished photo and its requirement checks for free, and pay only to download it or order prints.",
          },
        ],
      }}
    />
  );
}
