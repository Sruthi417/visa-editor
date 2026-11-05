import CompareCta from "./CompareCta/CompareCta";
import CompareHero from "./CompareHero/CompareHero";
import CompareHowToRead from "./CompareHowToRead/CompareHowToRead";
import CompareJumpNav from "./CompareJumpNav/CompareJumpNav";
import CompareLayout from "./CompareLayout/CompareLayout";
import CompareSources from "./CompareSources/CompareSources";
import CompareStrengths from "./CompareStrengths/CompareStrengths";
import CompareSummary from "./CompareSummary/CompareSummary";
import CompareTable from "./CompareTable/CompareTable";
import { formatDate } from "./comparisons";
import type { Comparison } from "./types";

/** One comparison page. Each section is its own component; this only puts them in order. */
export default function ComparePage({ data }: { data: Comparison }) {
  const { hero, product, competitor } = data;

  return (
    <CompareLayout
      hero={
        <CompareHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }]}
          title={hero.title}
          intro={hero.intro}
          versus={{
            left: { name: product.name, logo: product.logo },
            right: { name: competitor.name, logo: competitor.logo },
            badge: hero.badge,
          }}
          cta={hero.cta}
          points={[...hero.points, `Checked ${formatDate(data.checkedOn)}`]}
        />
      }
    >
      <CompareSummary summary={data.summary} />
      <CompareHowToRead howToRead={data.howToRead} />
      <CompareJumpNav items={data.groups} />

      {data.groups.map((group, index) => (
        <CompareTable
          key={group.id}
          group={group}
          index={index}
          productName={product.name}
          competitorName={competitor.name}
        />
      ))}

      <CompareStrengths strengths={data.strengths} />
      <CompareCta cta={data.cta} />
      <CompareSources sources={data.sources} />
    </CompareLayout>
  );
}
