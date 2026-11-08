import BlogHero from "../shared/BlogHero/BlogHero";
import BlogLayout from "../shared/BlogLayout/BlogLayout";
import BlogHubList from "./BlogHubList/BlogHubList";
import hub from "../data/hub.json";
import type { BlogHubCard } from "../types";

/** The /blog index: the newest post as a wide card, then a card for every other post. */
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
    >
      <BlogHubList title={hub.title} cards={hub.cards as BlogHubCard[]} featured />
    </BlogLayout>
  );
}
