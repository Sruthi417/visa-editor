import type { Blog } from "../types";

// Drops the **bold** and [label](url) marks, keeping the words.
function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
}

/** Structured data for search engines: the article itself and its questions and answers. */
export default function BlogJsonLd({ data }: { data: Blog }) {
  const graph = [
    {
      "@type": "BlogPosting",
      headline: data.hero.title,
      description: data.seo.description,
      dateModified: data.checkedOn,
      author: { "@type": "Organization", name: "FlyFrame" },
      publisher: { "@type": "Organization", name: "FlyFrame" },
      ...(data.sources ? { citation: data.sources.items.map((source) => source.url) } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: data.faq.items.map((item) => ({
        "@type": "Question",
        name: plain(item.q),
        acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // The JSON comes from our own data file. "<" is escaped so the text can't close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
