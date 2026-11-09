import BlogBlocks from "../blocks/BlogBlocks";
import { twoLineTitle } from "../../shared/twoLineTitle";
import type { BlogSectionData } from "../../types";
import "./BlogArticleSection.scss";

/** One h2 section of the post: its title, then its blocks in order. */
export default function BlogArticleSection({ data }: { data: BlogSectionData }) {
  return (
    <section id={data.id} className="blog-section">
      <h2 className="blog-section__title" style={twoLineTitle(data.title, data.titleWrap)}>
        {data.title}
      </h2>
      <div className="blog-section__body">
        <BlogBlocks blocks={data.blocks} />
      </div>
    </section>
  );
}
