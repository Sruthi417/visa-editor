import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, ImageCropIcon } from "@hugeicons/core-free-icons";

import type { Blog } from "../../types";
import "./BlogEditorCard.scss";

type Props = {
  data: Blog["editor"];
  /**
   * `rail` is the tall card in the right column. `inline` is the wide card inside the post,
   * shown only when the right column is hidden.
   */
  variant: "rail" | "inline";
};

/** The card that sends readers to the photo editor: a picture of a crop, a short line and a button. */
export default function BlogEditorCard({ data, variant }: Props) {
  const { image } = data;

  return (
    <div className={`blog-editor blog-editor--${variant}`}>
      <div className="blog-editor__media">
        <span className="blog-editor__chip">
          <HugeiconsIcon icon={ImageCropIcon} size={14} strokeWidth={1.9} />
          {data.chip}
        </span>

        <div className="blog-editor__frame">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="200px"
            style={{ "--blog-img-pos": image.position } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="blog-editor__body">
        <p className="blog-editor__title">{data.title}</p>
        <p className="blog-editor__text">{data.text}</p>

        <Link href={data.cta.href} className="blog-editor__button">
          {data.cta.label}
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}
