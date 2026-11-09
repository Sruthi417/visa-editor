import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";

import { publicFileExists } from "../../../../publicFile";
import RichText from "../../../shared/RichText/RichText";
import { BLOG_ICONS } from "../../../shared/blogIcons";
import BlogSlider from "../BlogSlider/BlogSlider";
import type { DistanceBlock } from "../../../types";
import "./BlogDistance.scss";

/**
 * A picture beside one card per camera, each with its distance in large type. With `slides`
 * (and all their files saved), the picture becomes a slider: the first slide by default.
 */
export default function BlogDistance({ data }: { data: DistanceBlock }) {
  const { image } = data;
  const slides =
    data.slides && data.slides.every((slide) => publicFileExists(slide.image.src)) ? data.slides : null;

  return (
    <div className={`blog-distance${slides ? " blog-distance--slides" : ""}`}>
      <ul className="blog-distance__cards">
        {data.items.map((item) => (
          <li key={item.label} className="blog-distance__card">
            <div className="blog-distance__head">
              <span className="blog-distance__icon" aria-hidden="true">
                <HugeiconsIcon icon={BLOG_ICONS[item.icon]} size={20} strokeWidth={1.7} />
              </span>
              <h3 className="blog-distance__label">{item.label}</h3>
            </div>

            <p className="blog-distance__value">
              {item.value}
              <span className="blog-distance__sub">{item.sub}</span>
            </p>

            <p className="blog-distance__text">
              <RichText text={item.text} />
            </p>
          </li>
        ))}
      </ul>

      {slides ? (
        <div className="blog-distance__slider">
          <BlogSlider
            label="Distance from the phone for each camera"
            items={slides}
            sizes="(max-width: 720px) 100vw, 420px"
            fill
          />
        </div>
      ) : (
        <div className="blog-distance__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 720px) 100vw, 300px"
            style={{ "--blog-img-pos": image.position } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
}
