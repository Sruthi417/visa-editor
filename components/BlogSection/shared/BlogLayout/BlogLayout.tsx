import Footer from "../../../Footer/Footer";
import Navbar from "../../../Nav/Navbar";
import "./BlogLayout.scss";

type Props = {
  /** The full-width header above the content. */
  hero: React.ReactNode;
  /** The sticky column on the left of the post, such as "On this page". Wide screens only. */
  aside?: React.ReactNode;
  /** The sticky column on the right of the post, such as the photo editor card. Wide screens only. */
  rail?: React.ReactNode;
  /** A wider content column, for the hub's cards. */
  wide?: boolean;
  /** Full-width content below the column, such as more articles. */
  after?: React.ReactNode;
  children: React.ReactNode;
};

/** The page frame shared by the blog hub and every post: navbar, hero, content, footer. */
export default function BlogLayout({ hero, aside, rail, wide = false, after, children }: Props) {
  const body = [
    "blog-layout__body",
    aside ? "blog-layout__body--with-aside" : "",
    rail ? "blog-layout__body--with-rail" : "",
    wide ? "blog-layout__body--wide" : "",
    after ? "blog-layout__body--before-section" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="main-layout">
      <Navbar />

      <main className="blog-layout">
        {hero}
        <div className={body}>
          {aside && <aside className="blog-layout__aside">{aside}</aside>}
          <div className="blog-layout__content">{children}</div>
          {rail && <aside className="blog-layout__rail">{rail}</aside>}
        </div>
        {after}
      </main>

      <Footer />
    </div>
  );
}
