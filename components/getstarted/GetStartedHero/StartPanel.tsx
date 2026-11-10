"use client";

import { useMemo, useState } from "react";

import CountrySelect from "../../DocumentModal/CountrySelect";
import GetStartedButton from "../../DocumentModal/GetStartedButton";
import { countriesFor, type DocumentType } from "../../DocumentModal/specs";
import { kbLabel, sizeText } from "../../features/featureData";

const TYPES: { id: DocumentType; label: string }[] = [
  { id: "passport", label: "Passport" },
  { id: "visa", label: "Visa" },
];

/**
 * The start panel: pick passport or visa and a country, see that photo's rules, and upload with
 * both already chosen in the editor.
 */
export default function StartPanel() {
  const [type, setType] = useState<DocumentType>("passport");
  const [code, setCode] = useState("US");

  const countries = useMemo(() => countriesFor(type), [type]);
  // Keep the country when it has the other document too, otherwise fall back to the first.
  const entry = countries.find((item) => item.code === code) ?? countries[0];
  const spec = entry[type]!;

  const rows = [
    { label: "Photo size", value: sizeText(spec) },
    ...(spec.headMm
      ? [{ label: "Head height", value: `${spec.headMm[0]}–${spec.headMm[1]} mm` }]
      : []),
    { label: "File", value: `${spec.format}, ${kbLabel(spec.fileKb[0])} – ${kbLabel(spec.fileKb[1])}` },
  ];

  return (
    <div className="start-panel">
      <div className="start-panel__head">
        <span className="start-panel__label">Your document</span>
        <div className="start-panel__toggle" role="radiogroup" aria-label="Document type">
          {TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={type === item.id}
              className={`start-panel__type${type === item.id ? " is-on" : ""}`}
              onClick={() => setType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <CountrySelect
        label="Country"
        value={entry.code}
        options={countries.map((item) => ({ value: item.code, label: item.country }))}
        onChange={setCode}
      />

      {/* The chosen photo's rules, read from the editor's own specs. */}
      <dl className="start-panel__specs" aria-live="polite">
        {rows.map((row) => (
          <div key={row.label} className="start-panel__spec">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
        <div className="start-panel__spec">
          <dt>Background</dt>
          <dd>
            <span className="start-panel__swatch" style={{ background: spec.backgroundColor }} />
            {spec.background}
          </dd>
        </div>
      </dl>

      {entry.cropOnly && (
        <p className="start-panel__notice">
          {entry.country} only accepts an unedited background, so the editor crops your photo and
          keeps the background. Take it against a plain, light wall.
        </p>
      )}

      <GetStartedButton className="start-panel__button" type={type} code={entry.code}>
        Upload a photo
      </GetStartedButton>
      <p className="start-panel__small">JPG, PNG or WebP up to 15 MB, prepared on your device.</p>
    </div>
  );
}
