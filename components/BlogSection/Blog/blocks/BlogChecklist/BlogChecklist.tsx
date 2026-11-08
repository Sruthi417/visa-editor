import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";

import RichText from "../../../shared/RichText/RichText";
import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { ChecklistBlock } from "../../../types";
import "./BlogChecklist.scss";

/** A wide picture, then a grid of things to check, each with an icon and a bold label. */
export default function BlogChecklist({ data }: { data: ChecklistBlock }) {
  const { image } = data;

  return (
    <div className="blog-checklist">
      {image && (
        <div className="blog-checklist__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1080px) 100vw, 800px"
            style={{ "--blog-img-pos": image.position } as React.CSSProperties}
          />
        </div>
      )}

      <ul className="blog-checklist__list">
        {data.items.map((item) => (
          <li key={item.label} className="blog-checklist__item">
            <span className="blog-checklist__icon" aria-hidden="true">
              <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={20} strokeWidth={1.7} />
            </span>
            <p className="blog-checklist__text">
              <strong>{item.label}:</strong> <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
