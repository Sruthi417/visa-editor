import "./Work.scss";

// Upload, then the editor's own processing steps (see DocumentModal/processPhoto.ts).
const STEPS = [
  {
    title: "Upload your photo",
    text: "Drop in a JPG, PNG or WebP from your phone or computer, up to 15 MB.",
  },
  {
    title: "Crop and align",
    text: "Finds your face, centres it and sets eye level to the official guide.",
  },
  {
    title: "Remove background",
    text: "Separates you from the backdrop and fills it with the plain colour your country asks for.",
  },
  {
    title: "Resize to spec",
    text: "Scales the photo to the exact size, such as 35 × 45 mm, at 300 DPI.",
  },
  {
    title: "Check requirements",
    text: "Checks your face, lighting, background and file against the rules.",
  },
  {
    title: "Export photo",
    text: "Saves a JPEG inside your country's file-size limits, ready to submit.",
  },
];

/** The six steps from upload to finished photo: the heading on the left, a winding line on the right. */
export default function Work() {
  return (
    <section className="work" id="how-it-works">
      <div className="work__wrap">
        <header className="work__head">
          <span>How it works</span>
          <h2>Six steps from upload to finished photo</h2>
          <p>Upload once and the editor runs every step for you, showing each one as it happens.</p>
        </header>

        <ol className="work__steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="work__step">
              <span className="work__dot" aria-hidden="true" />
              <h3 className="work__title">
                {/* The list already numbers the steps for screen readers. */}
                <span className="work__num" aria-hidden="true">
                  {index + 1}.
                </span>{" "}
                {step.title}
              </h3>
              <p className="work__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
