import takeAPhotoAtHome from "./data/take-a-photo-at-home.json";
import type { Guide } from "./types";

// To add a guide: drop its JSON file in ./data, list it here, and add its card to
// ./data/hub.json. The route, the page and the hub list pick it up from there.
const guides: Guide[] = [takeAPhotoAtHome as Guide];

export function getGuides(): Guide[] {
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

/** "2026-11-06" -> "6 November 2026". Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
