import StepsBody from "./StepsBody";
import "./GetStartedSteps.scss";

// The editor's own flow, from choosing the document to the finished photo.
const STEPS = [
  {
    title: "Choose your document",
    text: "Pick passport or visa and your country. Its size, head height, background and file limits are set for you.",
  },
  {
    title: "Upload your photo",
    text: "Drop in a JPG, PNG or WebP up to 15 MB from your phone or computer.",
  },
  {
    title: "Let the editor fit it",
    text: "It crops, replaces the background where your country allows it, resizes and runs seven requirement checks.",
  },
  {
    title: "Preview, then download or order prints",
    text: "See the finished photo free. Then download it, or have prints delivered to your door.",
  },
];

/** The heading centred on top; the four steps on the left and a picture of each beside them. */
export default function GetStartedSteps() {
  return (
    <section className="gs-steps" id="steps">
      <div className="gs-steps__wrap">
        <header className="gs-steps__head">
          <span>How it works</span>
          <h2>Four steps from upload to your photo</h2>
          <p>
            Choose your document, upload a photo and the editor does the rest. You see the finished
            photo before you pay.
          </p>
        </header>

        <StepsBody steps={STEPS} />
      </div>
    </section>
  );
}
