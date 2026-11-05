import Faq from "../../landing/Faq/Faq";
import CompareHero from "../shared/CompareHero/CompareHero";
import CompareHubList from "../shared/CompareHubList/CompareHubList";
import CompareLayout from "../shared/CompareLayout/CompareLayout";
import hub from "../data/hub.json";

/** The /compare index: a card for every comparison, then the FAQ. */
export default function CompareHub() {
  const { faq } = hub;

  return (
    <CompareLayout
      wide
      hero={
        <CompareHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
          title="How FlyFrame compares"
          intro="Side-by-side looks at FlyFrame and other passport and visa photo tools, built only from what each one states publicly."
        />
      }
      after={
        <Faq eyebrow={faq.eyebrow} title={faq.title} sub={faq.sub} faqs={faq.items} />
      }
    >
      <CompareHubList title={hub.title} cards={hub.cards} />
    </CompareLayout>
  );
}
