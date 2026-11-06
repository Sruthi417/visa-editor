import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GuidePage from "@/components/GuideSection/Guide/GuidePage";
import { getGuide, getGuideSlugs } from "@/components/GuideSection/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getGuide(slug);
  if (!data) return {};

  return {
    title: data.seo.title,
    description: data.seo.description,
    openGraph: { title: data.seo.title, description: data.seo.description },
  };
}

export default async function GuideRoute({ params }: Props) {
  const { slug } = await params;
  const data = getGuide(slug);
  if (!data) notFound();

  return <GuidePage data={data} />;
}
