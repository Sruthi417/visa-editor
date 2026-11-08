import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPage from "@/components/BlogSection/Blog/BlogPage";
import { getBlog, getBlogSlugs } from "@/components/BlogSection/blogs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getBlog(slug);
  if (!data) return {};

  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      type: "article",
      modifiedTime: data.checkedOn,
    },
  };
}

export default async function BlogRoute({ params }: Props) {
  const { slug } = await params;
  const data = getBlog(slug);
  if (!data) notFound();

  return <BlogPage data={data} />;
}
