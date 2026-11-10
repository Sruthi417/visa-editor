"use client";

import { useCallback, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import DocumentModal from "../../DocumentModal/DocumentModal";
import type { DocumentType } from "../../DocumentModal/specs";
import { flagClass, photoSpecs, sizeText } from "../../features/featureData";
import "./GetStartedCountries.scss";

type Pick = { type: DocumentType; code: string };

/**
 * Every country the editor supports, as buttons. Each opens the editor with that country and
 * its passport (or, where there is no passport spec, its visa) already chosen.
 */
export default function GetStartedCountries() {
  const [pick, setPick] = useState<Pick | null>(null);
  // A new key each time it opens, so the window starts from the chosen country every time.
  const [session, setSession] = useState(0);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const start = (next: Pick) => {
    setPick(next);
    setSession((value) => value + 1);
    setOpen(true);
  };

  return (
    <section className="gs-countries" id="countries">
      <div className="gs-countries__wrap">
        <header className="gs-countries__head">
          <span>Countries</span>
          <h2>Start with your country</h2>
          <p>Choose a country and the editor opens with its photo rules already set.</p>
        </header>

        <ul className="gs-countries__grid">
          {photoSpecs.map((entry) => {
            const type: DocumentType = entry.passport ? "passport" : "visa";
            const spec = entry[type]!;
            return (
              <li key={entry.code}>
                <button
                  type="button"
                  className="gs-countries__button"
                  aria-haspopup="dialog"
                  onClick={() => start({ type, code: entry.code })}
                >
                  <span className={`gs-countries__flag ${flagClass(entry.code)}`} aria-hidden="true" />
                  <span className="gs-countries__text">
                    <span className="gs-countries__name">{entry.country}</span>
                    <span className="gs-countries__size">
                      <span className="gs-countries__doc">
                        {type === "passport" ? "Passport" : "Visa"} ·{" "}
                      </span>
                      {sizeText(spec)}
                    </span>
                  </span>
                  <span className="gs-countries__arrow" aria-hidden="true">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <DocumentModal
        key={session}
        open={open}
        onClose={close}
        initialType={pick?.type}
        initialCode={pick?.code}
      />
    </section>
  );
}
