import GuideHero from "../shared/GuideHero/GuideHero";
import { GUIDE_STATS } from "../shared/GuideHero/guideStats";
import GuideLayout from "../shared/GuideLayout/GuideLayout";
import GuideCheck from "./GuideCheck/GuideCheck";
import GuideCta from "./GuideCta/GuideCta";
import GuideFaq from "./GuideFaq/GuideFaq";
import GuideMistakes from "./GuideMistakes/GuideMistakes";
import GuideNeeds from "./GuideNeeds/GuideNeeds";
import GuideNote from "./GuideNote/GuideNote";
import GuideSteps from "./GuideSteps/GuideSteps";
import type { Guide } from "../types";

/** One guide. Each section is its own component with its own id; this puts them in order. */
export default function GuidePage({ data }: { data: Guide }) {
  const { hero } = data;

  return (
    <GuideLayout
      hero={
        <GuideHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Photo guide", href: "/guide" },
            { label: data.breadcrumb },
          ]}
          title={hero.title}
          intro={hero.intro}
          image={hero.image}
          stats={GUIDE_STATS}
        />
      }
      after={
        <>
          <GuideFaq data={data.faq} />
          <GuideCta data={data.next} />
        </>
      }
    >
  
      <GuideNeeds data={data.needs} />
      <GuideSteps data={data.steps} />
      <GuideCheck data={data.check} />
      <GuideMistakes data={data.mistakes} />
      <GuideNote data={data.note} />
    </GuideLayout>
  );
}
