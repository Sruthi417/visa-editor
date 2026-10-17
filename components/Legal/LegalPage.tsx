import Link from "next/link";

import Footer from "../Footer/Footer";
import Navbar from "../Nav/Navbar";
import LegalToc from "./LegalToc";
import type { LegalDocument } from "./legalContent";
import "./Legal.scss";

type Props = {
  document: LegalDocument;
  /** The other legal page, linked at the end. */
  related: { label: string; href: string };
};

export default function LegalPage({ document, related }: Props) {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="legal">
        <header className="legal__header">
          <div className="legal__header-inner">
            <span className="legal__eyebrow">{document.eyebrow}</span>
            <h1 className="legal__title">{document.title}</h1>
            <p className="legal__intro">{document.intro}</p>
            <p className="legal__updated">Last updated {document.updated}</p>
          </div>
        </header>

        <div className="legal__body">
          <LegalToc items={document.sections.map(({ id, title }) => ({ id, title }))} />

          <div className="legal__content">
            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="legal__section">
                <h2 className="legal__heading">
                  <span className="legal__number">{index + 1}</span>
                  {section.title}
                </h2>

                {section.blocks.map((block, i) =>
                  block.type === "p" ? (
                    <p key={i} className="legal__text">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={i} className="legal__list">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}

            <Link href={related.href} className="legal__related">
              <span>
                <small>Also read</small>
                {related.label}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
