import { HugeiconsIcon } from "@hugeicons/react";

import RichText from "../../../shared/RichText/RichText";
import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { CalloutBlock } from "../../../types";
import "./BlogCallout.scss";

/**
 * A tinted note box with an icon. Text that starts with **Note:** is a short aside, shown
 * smaller with "Note:" kept inline rather than as a heading line.
 */
export default function BlogCallout({ data }: { data: CalloutBlock }) {
  const isNote = data.text.startsWith("**Note:**");

  return (
    <div className={`blog-callout${isNote ? " blog-callout--note" : ""}`}>
      <span className="blog-callout__icon" aria-hidden="true">
        <HugeiconsIcon icon={BLOG_ICONS[data.icon]} size={isNote ? 20 : 24} strokeWidth={1.6} />
      </span>
      <p className="blog-callout__text">
        <RichText text={data.text} />
      </p>
    </div>
  );
}
