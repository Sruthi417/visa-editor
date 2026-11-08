import Image from "next/image";

import type { BlogAspect, BlogImage } from "../../../types";
import "./BlogFigure.scss";

type Props = {
  image: BlogImage;
  aspect?: BlogAspect;
  /** The width the picture is shown at, for the browser to pick the right file. */
  sizes?: string;
  className?: string;
};

/** One framed picture, cropped to the frame shape. Used on its own and inside a split. */
export default function BlogFigure({ image, aspect = "16/9", sizes, className }: Props) {
  const classes = [
    "blog-figure",
    image.fit === "contain" ? "blog-figure--contain" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes ?? "(max-width: 1023px) 100vw, 760px"}
        style={
          {
            "--blog-img-pos": image.position,
            "--blog-aspect": aspect.replace("/", " / "),
          } as React.CSSProperties
        }
      />
    </div>
  );
}
