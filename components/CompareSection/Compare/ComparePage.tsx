import CompareCta from "./CompareCta/CompareCta";
import CompareHero from "../shared/CompareHero/CompareHero";
import CompareHubList from "../shared/CompareHubList/CompareHubList";

import CompareJumpNav from "./CompareJumpNav/CompareJumpNav";
import CompareLayout from "../shared/CompareLayout/CompareLayout";
import CompareStrengths from "./CompareStrengths/CompareStrengths";
import CompareSummary from "./CompareSummary/CompareSummary";
import CompareTable from "./CompareTable/CompareTable";
import { formatDate } from "../comparisons";
import hub from "../data/hub.json";
import type { Comparison } from "../types";

/** One comparison page. Each section is its own component; this only puts them in order. */
export default function ComparePage({ data }: { data: Comparison }) {
  const { hero, product, competitor } = data;
  // Up to three other comparisons, never the one being shown.
  const others = hub.cards.filter((card) => card.slug !== data.slug).slice(0, 3);

  return (
    <CompareLayout
      hero={
        <CompareHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
            { label: competitor.name },
          ]}
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

      {data.groups.map((group, index) => (
        <CompareTable
          key={group.id}
          group={group}
          // The main title and the jump links sit above the first table.
          mainTitle={index === 0 ? data.features.title : undefined}
          intro={index === 0 ? <CompareJumpNav items={data.groups} /> : undefined}
          productName={product.name}
          competitorName={competitor.name}
        />
      ))}

      <CompareStrengths strengths={data.strengths} />
      <CompareCta cta={data.cta} />

      {others.length > 0 && <CompareHubList title="More comparisons" cards={others} />}
    </CompareLayout>
  );
}
