import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

import BlogButton from "../../shared/BlogButton/BlogButton";
import type { Blog } from "../../types";
import "./BlogCheck.scss";

/** The photo checker: a white card with the photo being checked, the text and the upload button. */
export default function BlogCheck({ data }: { data: Blog["check"] }) {
  return (
    <section id={data.id} className="blog-check">
      <div className="blog-check__media">
        <span className="blog-check__chip">
          <HugeiconsIcon icon={StarIcon} size={13} strokeWidth={1.8} />
          {data.chip}
        </span>

        {/* Only a picture of the idea, so it is hidden from screen readers. */}
        <div className="blog-check__frame" aria-hidden="true">
          <Image src={data.image.src} alt={data.image.alt} width={579} height={579} sizes="180px" />
        </div>
      </div>

      <div className="blog-check__body">
        <h2 className="blog-check__title">{data.title}</h2>
        <p className="blog-check__text">{data.text}</p>
        <BlogButton label={data.cta.label} className="blog-check__button" />
      </div>
    </section>
  );
}
