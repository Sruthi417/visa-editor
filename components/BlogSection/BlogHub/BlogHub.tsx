import GuideFaq from "../../GuideSection/Guide/GuideFaq/GuideFaq";
import BlogHero from "../shared/BlogHero/BlogHero";
import BlogLayout from "../shared/BlogLayout/BlogLayout";
import BlogHubList from "./BlogHubList/BlogHubList";
import hub from "../data/hub.json";
import type { BlogHubCard } from "../types";

/**
 * The /blog index: a card for every post, then the FAQ. The same as the Guide hub, which it
 * shares the FAQ component with.
 */
export default function BlogHub() {
  const { hero } = hub;

  return (
    <BlogLayout
      wide
      hero={
        <BlogHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          title={hero.title}
          intro={hero.intro}
        />
      }
      after={<GuideFaq data={hub.faq} wide />}
    >
      <BlogHubList title={hub.title} cards={hub.cards as BlogHubCard[]} />
    </BlogLayout>
  );
}
