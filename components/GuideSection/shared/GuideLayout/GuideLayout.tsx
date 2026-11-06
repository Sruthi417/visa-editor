import Footer from "../../../Footer/Footer";
import Navbar from "../../../Nav/Navbar";
import "./GuideLayout.scss";

type Props = {
  /** The full-width header above the content. */
  hero: React.ReactNode;
  /** A wider content column, for the hub's row of cards. */
  wide?: boolean;
  /** Full-width content below the column, such as the FAQ. */
  after?: React.ReactNode;
  children: React.ReactNode;
};

/** The page frame shared by the guide hub and every guide: navbar, hero, content column, footer. */
export default function GuideLayout({ hero, wide = false, after, children }: Props) {
  const body = [
    "guide-layout__body",
    wide ? "guide-layout__body--wide" : "",
    after ? "guide-layout__body--before-section" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="main-layout">
      <Navbar />

      <main className="guide-layout">
        {hero}
        <div className={body}>{children}</div>
        {after}
      </main>

      <Footer />
    </div>
  );
}
