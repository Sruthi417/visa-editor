import { Fragment } from "react";

import BlogHero from "../shared/BlogHero/BlogHero";
import BlogJsonLd from "../shared/BlogJsonLd";
import BlogLayout from "../shared/BlogLayout/BlogLayout";
import BlogHubList from "../BlogHub/BlogHubList/BlogHubList";
import BlogArticleSection from "./BlogArticleSection/BlogArticleSection";
import BlogCheck from "./BlogCheck/BlogCheck";
import BlogCovers from "./BlogCovers/BlogCovers";
import BlogCta from "./BlogCta/BlogCta";
import BlogEditorCard from "./BlogEditorCard/BlogEditorCard";
import BlogFaq from "./BlogFaq/BlogFaq";
import BlogQuickAnswer from "./BlogQuickAnswer/BlogQuickAnswer";
import BlogRelatedReading from "./BlogRelatedReading/BlogRelatedReading";
import BlogSources from "./BlogSources/BlogSources";
import BlogToc from "./BlogToc/BlogToc";
import { formatDate, readingMinutes } from "../blogs";
import hub from "../data/hub.json";
import type { Blog, BlogHubCard } from "../types";
import "./BlogPage.scss";

/**
 * One blog post: "On this page" on the left, the article in the middle and the photo editor
 * card on the right. Each section is its own component with its own id; this puts them in order.
 */
export default function BlogPage({ data }: { data: Blog }) {
  const { hero } = data;

  // The "On this page" list: every section with an id, in the order it appears.
  const contents = [
    ...(data.quickAnswer
      ? [{ id: data.quickAnswer.id, label: data.quickAnswer.title }]
      : []),
    ...data.sections.map((section) => ({ id: section.id, label: section.nav })),
    { id: data.related.id, label: data.related.title },
    { id: data.check.id, label: data.check.title },
    { id: data.faq.id, label: data.faq.eyebrow },
    ...(data.next ? [{ id: data.next.id, label: data.next.title }] : []),
    ...(data.sources
      ? [{ id: data.sources.id, label: data.sources.title }]
      : []),
  ];

  // Up to three other posts, never the one being shown.
  const others = (hub.cards as BlogHubCard[])
    .filter((card) => card.slug !== data.slug)
    .slice(0, 3);

  return (
    <BlogLayout
      hero={
        <BlogHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: data.breadcrumb },
          ]}
          title={hero.title}
          intro={hero.intro}
          image={hero.image}
          versus={hero.versus}
          meta={[
            {
              icon: "calendar",
              label: `Facts checked ${formatDate(data.checkedOn)}`,
            },
            { icon: "clock", label: `${readingMinutes(data)} min read` },
          ]}
        />
      }
      aside={<BlogToc items={contents} />}
      rail={<BlogEditorCard data={data.editor} variant="rail" />}
      after={
        others.length > 0 ? (
          <div className="blog-related">
            <BlogHubList title="More articles" cards={others} />
          </div>
        ) : undefined
      }
    >
      <BlogJsonLd data={data} />

      <article className="blog-article">
        {/* Only for a post whose JSON has a "quickAnswer". */}
        {data.quickAnswer && <BlogQuickAnswer data={data.quickAnswer} />}
        {/* <BlogCovers data={data.covers} /> */}

        {data.sections.map((section) => (
          <Fragment key={section.id}>
            <BlogArticleSection data={section} />
            {/* The editor card's place in the post, for screens without the right column. */}
            {section.id === data.editor.inlineAfter && (
              <BlogEditorCard data={data.editor} variant="inline" />
            )}
          </Fragment>
        ))}

        <BlogRelatedReading data={data.related} />

        <BlogFaq data={data.faq} />
        <BlogCheck data={data.check} />
        {data.next && <BlogCta data={data.next} />}
        {data.sources && <BlogSources data={data.sources} />}
      </article>
    </BlogLayout>
  );
}
