import GuideHero from "../shared/GuideHero/GuideHero";
import GuideLayout from "../shared/GuideLayout/GuideLayout";
import GuideHubList from "./GuideHubList/GuideHubList";
import hub from "../data/hub.json";

/** The /guide index: a card for every guide. Each card opens /guide/{slug}. */
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
    >
      <GuideHubList title={hub.title} cards={hub.cards} />
    </GuideLayout>
  );
}
