import {
  BackgroundArt,
  CheckArt,
  CropArt,
  ExportArt,
  ResizeArt,
  UploadArt,
} from "./PipelineArt";
import "./FeaturesPipeline.scss";

// Upload, then the editor's own processing steps (see DocumentModal/processPhoto.ts).
const STEPS = [
  {
    title: "Upload your photo",
    text: "Drop in a JPG, PNG or WebP from your phone or computer, up to 15 MB.",
    art: <UploadArt />,
  },
  {
    title: "Crop and align",
    text: "Finds your face, centres it and sets eye level to the official guide.",
    art: <CropArt />,
  },
  {
    title: "Remove background",
    text: "Separates you from the backdrop and fills it with the plain colour your country asks for.",
    art: <BackgroundArt />,
  },
  {
    title: "Resize to spec",
    text: "Scales the photo to the exact size, such as 35 × 45 mm, at 300 DPI.",
    art: <ResizeArt />,
  },
  {
    title: "Check requirements",
    text: "Checks your face, lighting, background and file against the rules.",
    art: <CheckArt />,
  },
  {
    title: "Export photo",
    text: "Saves a JPEG inside your country's file-size limits, ready to submit.",
    art: <ExportArt />,
  },
];

/** The six steps from upload to finished photo, as cards with a small picture of each. */
export default function FeaturesPipeline() {
  return (
    <section className="fpipe" id="how-it-works">
      <div className="fpipe__wrap">
        <header className="fpipe__head">
          <span>How it works</span>
          <h2>Six steps from upload to finished photo</h2>
          <p>Upload once and the editor runs every step for you, showing each one as it happens.</p>
        </header>

        <ol className="fpipe__grid">
          {STEPS.map((step) => (
            <li key={step.title} className="fpipe__card">
              <div className="fpipe__art" aria-hidden="true">
                {step.art}
              </div>
              <h3 className="fpipe__title">{step.title}</h3>
              <p className="fpipe__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
