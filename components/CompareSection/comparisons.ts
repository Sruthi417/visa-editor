import visafoto from "./data/visafoto.json";
import type { Comparison } from "./types";

// To add a competitor: drop its JSON file in ./data and list it here. The
// route, the page and the sitemap pick it up from this one place.
const comparisons: Comparison[] = [visafoto as Comparison];

export function getComparisons(): Comparison[] {
  return comparisons;
}

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return comparisons.map((comparison) => comparison.slug);
}

/** "2026-11-04" -> "4 November 2026". Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
