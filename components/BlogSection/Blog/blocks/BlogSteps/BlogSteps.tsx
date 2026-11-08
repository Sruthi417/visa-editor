import Image from "next/image";

import RichText from "../../../shared/RichText/RichText";
import type { StepsBlock } from "../../../types";
import "./BlogSteps.scss";

/** Numbered steps joined by a line, with an optional picture beside them. */
export default function BlogSteps({ data }: { data: StepsBlock }) {
  const { image } = data;
  const side = data.imageSide ?? "right";

  return (
    <div className={`blog-steps${image ? ` blog-steps--media blog-steps--image-${side}` : ""}`}>
      <ol className="blog-steps__list" role="list">
        {data.items.map((item, index) => (
          <li key={item} className="blog-steps__item">
            <span className="blog-steps__number" aria-hidden="true">
              {index + 1}
            </span>
            <p className="blog-steps__text">
              <RichText text={item} />
            </p>
          </li>
        ))}
      </ol>

      {image && (
        <div className="blog-steps__media">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 720px) 100vw, 360px"
            style={
              { "--blog-img-pos": image.position, "--blog-img-zoom": image.zoom } as React.CSSProperties
            }
          />
        </div>
      )}
    </div>
  );
}
