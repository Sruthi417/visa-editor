import rearVsFrontCamera from "./data/rear-vs-front-camera.json";
import type { Blog } from "./types";

// To add a blog: drop its JSON file in ./data, list it here, and add its card to
// ./data/hub.json. The route, the page and the hub list pick it up from there.
const blogs: Blog[] = [rearVsFrontCamera as Blog];

export function getBlogs(): Blog[] {
  return blogs;
}

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogs.map((blog) => blog.slug);
}

/** "2026-11-07" -> "7 November 2026". Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Keys that hold ids, paths and settings rather than words someone reads.
const NOT_READ = new Set([
  "slug",
  "id",
  "href",
  "url",
  "src",
  "alt",
  "icon",
  "type",
  "state",
  "tone",
  "position",
  "imageSide",
  "badge",
  "seo",
  "checkedOn",
  "width",
  "height",
  "aspect",
  "fit",
  "zoom",
  // The editor card and the related cards point elsewhere; they aren't part of the reading.
  "editor",
  "related",
]);

function countWords(value: unknown): number {
  if (typeof value === "string") {
    // Links and bold marks count as their visible words only.
    const text = value.replace(/\]\([^)]*\)/g, "]").replace(/[*[\]]/g, "");
    return text.split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + countWords(item), 0);
  if (value && typeof value === "object") {
    return Object.entries(value).reduce(
      (sum, [key, item]) => (NOT_READ.has(key) ? sum : sum + countWords(item)),
      0,
    );
  }
  return 0;
}

/** Minutes to read the whole post, at about 220 words a minute. */
export function readingMinutes(blog: Blog): number {
  return Math.max(1, Math.round(countWords(blog) / 220));
}
