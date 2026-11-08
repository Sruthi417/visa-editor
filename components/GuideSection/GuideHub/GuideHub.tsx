import GuideFaq from "../Guide/GuideFaq/GuideFaq";
import GuideHero from "../shared/GuideHero/GuideHero";
import GuideLayout from "../shared/GuideLayout/GuideLayout";
import GuideHubList from "./GuideHubList/GuideHubList";
import hub from "../data/hub.json";

/** The /guide index: a card for every guide, then the FAQ. Each card opens /guide/{slug}. */
export default function GuideHub() {
  const { hero } = hub;

  return (
    <GuideLayout
      wide
      hero={
        <GuideHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Photo guide" }]}
          title={hero.title}
          intro={hero.intro}
        />
      }
      after={<GuideFaq data={hub.faq} wide />}
    >
      <GuideHubList title={hub.title} cards={hub.cards} />
    </GuideLayout>
  );
}
