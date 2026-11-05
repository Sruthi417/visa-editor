import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ComparePage from "@/components/CompareSection/Compare/ComparePage";
import { getComparison, getComparisonSlugs } from "@/components/CompareSection/comparisons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return {};

  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: { title: data.seo.title, description: data.seo.description },
  };
}

export default async function CompareRoute({ params }: Props) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();

  return <ComparePage data={data} />;
}
