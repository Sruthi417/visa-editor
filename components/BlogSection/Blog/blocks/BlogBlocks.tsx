import RichText from "../../shared/RichText/RichText";
import type { BlogBlock } from "../../types";
import BlogCallout from "./BlogCallout/BlogCallout";
import BlogChecklist from "./BlogChecklist/BlogChecklist";
import BlogDistance from "./BlogDistance/BlogDistance";
import BlogFigure from "./BlogFigure/BlogFigure";
import BlogPairs from "./BlogPairs/BlogPairs";
import BlogSettings from "./BlogSettings/BlogSettings";
import BlogSpecs from "./BlogSpecs/BlogSpecs";
import BlogSplit from "./BlogSplit/BlogSplit";
import BlogStats from "./BlogStats/BlogStats";
import BlogSteps from "./BlogSteps/BlogSteps";
import BlogTable from "./BlogTable/BlogTable";
import BlogTiles from "./BlogTiles/BlogTiles";

/** Turns a section's blocks into their components. Each `type` in the JSON has one. */
export default function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="blog-prose__p">
                <RichText text={block.text} />
              </p>
            );
          case "subheading":
            return (
              <h3 key={index} className="blog-prose__h3">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={index} className="blog-prose__list">
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "tiles":
            return <BlogTiles key={index} data={block} />;
          case "table":
            return <BlogTable key={index} data={block} />;
          case "specs":
            return <BlogSpecs key={index} data={block} />;
          case "stats":
            return <BlogStats key={index} data={block} />;
          case "distance":
            return <BlogDistance key={index} data={block} />;
          case "settings":
            return <BlogSettings key={index} data={block} />;
          case "steps":
            return <BlogSteps key={index} data={block} />;
          case "checklist":
            return <BlogChecklist key={index} data={block} />;
          case "callout":
            return <BlogCallout key={index} data={block} />;
          case "pairs":
            return <BlogPairs key={index} data={block} />;
          case "figure":
            return <BlogFigure key={index} image={block.image} aspect={block.aspect} />;
          case "split":
            return (
              <BlogSplit key={index} data={block}>
                <BlogBlocks blocks={block.blocks} />
              </BlogSplit>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
