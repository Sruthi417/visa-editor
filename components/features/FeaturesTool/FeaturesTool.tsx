import Link from "next/link";

import { CheckerArt, CompressArt, FinderArt, FormatArt, SizeArt } from "./ToolArt";
import "./FeaturesTool.scss";

// The companion tools around the editor. Each one handles a single job, and the editor
// finishes the photo. Each card links to its tool's page.
const TOOLS = [
  {
    href: "/tools/photo-checker",
    title: "Photo checker",
    text: "Upload a photo and get a pass, borderline or fail for each published rule, with how to fix what fails.",
    art: <CheckerArt />,
  },
  {
    href: "/tools/photo-size-converter",
    title: "Photo size converter",
    text: "Turn millimetres, centimetres or inches into pixels at any DPI, and back, with the formula shown.",
    art: <SizeArt />,
  },
  {
    href: "/tools/compress-image",
    title: "Compress to any KB limit",
    text: "Get the best-quality file under a limit such as 200 KB, and see how much quality it costs.",
    art: <CompressArt />,
  },
  {
    href: "/tools/photo-requirements",
    title: "Country requirement finder",
    text: "Look up any country's photo rules for adults and babies, with a link to the official source.",
    art: <FinderArt />,
  },
  {
    href: "/tools/format-converter",
    title: "File format converter",
    text: "Convert HEIC, PNG, JPEG and WebP, and see what each conversion does to quality first.",
    art: <FormatArt />,
  },
];

/** The companion tools, as cards with a small picture of each: three, then two centred. */
export default function FeaturesTool() {
  return (
    <section className="ftool" id="tools">
      <div className="ftool__wrap">
        <header className="ftool__head">
          <span>Tools</span>
          <h2>Tools for every step of your application</h2>
          <p>
            Check a photo, fix its size or format, and look up your country&apos;s rules. When it&apos;s
            ready, the editor finishes the job.
          </p>
        </header>

        <ol className="ftool__grid">
          {TOOLS.map((tool) => (
            <li key={tool.title} className="ftool__item">
              {/* The whole card is the link to the tool. */}
              <Link href={tool.href} className="ftool__card">
                <div className="ftool__art" aria-hidden="true">
                  {tool.art}
                </div>
                <h3 className="ftool__title">{tool.title}</h3>
                <p className="ftool__text">{tool.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
