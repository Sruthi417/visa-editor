import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { BlogImage, PairsBlock } from "../../../types";
import "./BlogPairs.scss";

function Photo({ image, kind }: { image: BlogImage; kind: "dont" | "do" }) {
  return (
    <div className={`blog-pairs__photo blog-pairs__photo--${kind}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 45vw, 160px"
      />
      {/* The alt text already says which is which, so the mark is only a picture. */}
      <span className="blog-pairs__mark" aria-hidden="true">
        <HugeiconsIcon icon={kind === "do" ? Tick02Icon : Cancel01Icon} size={14} strokeWidth={3} />
      </span>
    </div>
  );
}

/** One card per point: its label, then the wrong way (a cross) beside the right way (a tick). */
export default function BlogPairs({ data }: { data: PairsBlock }) {
  return (
    <div className="blog-pairs">
      <ul className="blog-pairs__list">
      {data.items.map((item) => (
        <li key={item.label} className="blog-pairs__card">
          <p className="blog-pairs__label">
            <span className="blog-pairs__icon" aria-hidden="true">
              <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={18} strokeWidth={1.7} />
            </span>
            {item.label}
          </p>

          <div className="blog-pairs__photos">
            <Photo image={item.dont} kind="dont" />
            <Photo image={item.do} kind="do" />
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}
