import Image from "next/image";

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

/** The four steps on the left, a before and after on the right. */
export default function GetStartedSteps() {
  return (
    <section className="gs-steps" id="steps">
      <div className="gs-steps__wrap">
        <div className="gs-steps__copy">
          <header className="gs-steps__head">
            <span>How it works</span>
            <h2>Four steps from upload to your photo</h2>
          </header>

          <ol className="gs-steps__list">
            {STEPS.map((step, index) => (
              <li key={step.title} className="gs-steps__step">
                <span className="gs-steps__num" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="gs-steps__title">{step.title}</h3>
                  <p className="gs-steps__text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="gs-steps__media">
          <Image
            src="/images/hero/hero-1.webp"
            alt="A photo with a busy background and a loose crop, then the same photo on plain white with the correct crop"
            width={1669}
            height={942}
            sizes="(max-width: 900px) 100vw, 540px"
          />
        </div>
      </div>
    </section>
  );
}
