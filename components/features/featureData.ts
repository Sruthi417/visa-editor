import { photoSpecs, type CountrySpecs, type PhotoSpec } from "../DocumentModal/specs";

// Everything the Features page says about countries and sizes is read from the editor's own
// photo specs, so the page always matches what the editor does.

export { photoSpecs };
export type { CountrySpecs, PhotoSpec };

/** Every passport and visa photo spec the editor knows. */
export const SPEC_COUNT = photoSpecs.reduce(
  (sum, entry) => sum + (entry.passport ? 1 : 0) + (entry.visa ? 1 : 0),
  0,
);

/** Countries, not counting the Schengen Area visa. */
export const COUNTRY_COUNT = photoSpecs.filter((entry) => entry.code !== "SCH").length;

/** Countries whose authority only accepts an unedited background. */
export const CROP_ONLY = photoSpecs.filter((entry) => entry.cropOnly).map((entry) => entry.country);

/** "A, B and C" */
export function listJoin(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** The flag-icons class for a country, the same as the editor's country picker. */
export function flagClass(code: string): string {
  return `fi fi-${(code === "SCH" ? "eu" : code).toLowerCase()}`;
}

/** "35 × 45 mm", or "2 × 2 in" where the authority quotes inches. */
export function sizeText(spec: PhotoSpec): string {
  // The specs write inches as "2x2 in".
  if (spec.imperial) return spec.imperial.replace("x", " × ");
  return `${spec.widthMm} × ${spec.heightMm} mm`;
}

/** 900 → "900 KB", 5000 → "4.9 MB", as the editor writes file sizes. */
export function kbLabel(kb: number): string {
  return kb >= 1024 ? `${Math.round((kb / 1024) * 10) / 10} MB` : `${kb} KB`;
}

/** The spec shown in the hero: the German passport, which asks for a light grey background. */
export const HERO_ENTRY = photoSpecs.find((entry) => entry.code === "DE") as CountrySpecs;
export const HERO_SPEC = HERO_ENTRY.passport as PhotoSpec;

/** The distinct background colours across all specs, each with the countries that ask for it. */
export const BACKGROUNDS = (() => {
  const byColour = new Map<string, { label: string; color: string; countries: string[] }>();
  for (const entry of photoSpecs) {
    for (const spec of [entry.passport, entry.visa]) {
      if (!spec) continue;
      const found = byColour.get(spec.backgroundColor);
      if (found) {
        if (!found.countries.includes(entry.country)) found.countries.push(entry.country);
      } else {
        byColour.set(spec.backgroundColor, {
          label: spec.background,
          color: spec.backgroundColor,
          countries: [entry.country],
        });
      }
    }
  }
  return [...byColour.values()];
})();

/** The checks the editor runs on every photo, in the order it shows them. */
export function checksFor(spec: PhotoSpec): string[] {
  return [
    "Face is recognized",
    "Only one face is allowed",
    "Minimum dimension",
    "Correct photo proportions",
    "Even lighting",
    `${spec.background} background`,
    "File size",
  ];
}
