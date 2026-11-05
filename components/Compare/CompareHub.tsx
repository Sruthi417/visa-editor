import CompareHero from "./CompareHero/CompareHero";
import CompareHubList from "./CompareHubList/CompareHubList";
import CompareLayout from "./CompareLayout/CompareLayout";
import { getComparisons } from "./comparisons";

/** The /compare index: a card for every comparison. */
export default function CompareHub() {
  return (
    <CompareLayout
      hero={
        <CompareHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
          title="How FlyFrame compares"
          intro="Side-by-side looks at FlyFrame and other passport and visa photo tools, built only from what each one states publicly."
        />
      }
    >
      <CompareHubList items={getComparisons()} />
    </CompareLayout>
  );
}
