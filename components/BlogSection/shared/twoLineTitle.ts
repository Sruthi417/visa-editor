/** Titles this many characters or shorter stay on one line. */
const SHORT = 20;

/**
 * How a section title wraps:
 * - `even` (the default): two balanced lines; a short title stays on one line.
 * - `one-line`: one line wherever it fits.
 * - `long-first`: two lines with the first one longer, such as "How to take the photo with the /
 *   rear camera".
 */
export type TitleWrap = "even" | "one-line" | "long-first";

/**
 * A width for a section title, from its length in `ch`, that makes it wrap the way `wrap` asks.
 * On a narrow screen the column is narrower than this, and the title wraps as it needs to.
 */
export function twoLineTitle(text: string, wrap: TitleWrap = "even"): React.CSSProperties | undefined {
  if (wrap === "one-line") return undefined;
  if (wrap === "long-first") {
    // A little under two thirds of the title, so the break falls after most of it.
    return { maxWidth: `${Math.ceil(text.length * 0.65)}ch`, textWrap: "pretty" };
  }
  if (text.length <= SHORT) return undefined;
  return { maxWidth: `${Math.ceil(text.length / 2) + 3}ch` };
}
