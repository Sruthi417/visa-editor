import fs from "node:fs";
import path from "node:path";

/**
 * True when a file under /public exists, such as "/images/blog/photo.png". Server components
 * only. Used where a picture is still to be added, so the page keeps its current picture
 * until the new file is saved, rather than showing a broken image.
 */
export function publicFileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
