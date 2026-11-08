import BlogFigure from "../BlogFigure/BlogFigure";
import type { SplitBlock } from "../../../types";
import "./BlogSplit.scss";

type Props = {
  data: SplitBlock;
  /** The split's own blocks, already turned into components by BlogBlocks. */
  children: React.ReactNode;
};

/** Text on one side and a picture on the other. On a phone the text comes first. */
export default function BlogSplit({ data, children }: Props) {
  const side = data.imageSide ?? "right";

  return (
    <div className={`blog-split blog-split--image-${side}`}>
      <div className="blog-split__copy">{children}</div>
      <BlogFigure
        image={data.image}
        aspect={data.aspect ?? "4/5"}
        sizes="(max-width: 720px) 100vw, 320px"
        className="blog-split__media"
      />
    </div>
  );
}
