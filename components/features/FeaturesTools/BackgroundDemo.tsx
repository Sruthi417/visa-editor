"use client";

import Image from "next/image";
import { useState } from "react";

import { BACKGROUNDS, listJoin } from "../featureData";

const ORIGINAL = "original";

/** The colours the circles offer: the original photo first, then each spec's background. */
const CHOICES = [
  { id: ORIGINAL, label: "Original photo", note: "As it was taken", color: null },
  ...BACKGROUNDS.map((bg) => ({
    id: bg.color,
    label: bg.label,
    note: `For ${listJoin(bg.countries)}`,
    color: bg.color,
  })),
];

/**
 * The background step, live: the same cut-out on each background colour the editor's specs ask
 * for, or the original photo. Choosing a colour changes the picture.
 */
export default function BackgroundDemo() {
  // Light grey, as for the German passport in the hero.
  const [selected, setSelected] = useState<string>(
    CHOICES.find((choice) => choice.label === "Light grey")?.id ?? CHOICES[1].id,
  );
  const current = CHOICES.find((choice) => choice.id === selected) ?? CHOICES[0];

  return (
    <div className="ftools__demo">
      <div className="ftools__stage" style={{ background: current.color ?? undefined }}>
        {current.color === null ? (
          <Image
            src="/images/sample/sample-original.webp"
            alt="The original photo, taken outdoors by a lake"
            width={1200}
            height={800}
            sizes="(max-width: 992px) 90vw, 450px"
          />
        ) : (
          <Image
            src="/images/features/sample-cutout-soft.webp"
            alt={`The same photo with the background replaced by plain ${current.label.toLowerCase()}`}
            width={1200}
            height={800}
            sizes="(max-width: 992px) 90vw, 450px"
          />
        )}
      </div>

      <div className="ftools__picker">
        <p className="ftools__readout" aria-live="polite">
          <strong>{current.label}</strong>
          <span>{current.note}</span>
        </p>

        <div className="ftools__swatches" role="group" aria-label="Background colour">
          {CHOICES.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="ftools__swatch"
              aria-pressed={selected === choice.id}
              aria-label={choice.label}
              title={choice.label}
              onClick={() => setSelected(choice.id)}
            >
              <span
                className={`ftools__dot${choice.color === null ? " ftools__dot--original" : ""}`}
                style={choice.color ? { background: choice.color } : undefined}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
