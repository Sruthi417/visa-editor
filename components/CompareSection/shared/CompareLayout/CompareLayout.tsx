import Footer from "../../../Footer/Footer";
import Navbar from "../../../Nav/Navbar";
import "./CompareLayout.scss";

type Props = {
  /** The full-width header above the content. */
  hero: React.ReactNode;
  /** A wider content column, for the hub's row of cards. */
  wide?: boolean;
  /** Full-width content below the column, such as the FAQ. */
  after?: React.ReactNode;
  children: React.ReactNode;
};

/** The page frame shared by the hub and every comparison: navbar, hero, content column, footer. */
export default function CompareLayout({ hero, wide = false, after, children }: Props) {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="compare-layout">
        {hero}
        <div
          className={`compare-layout__body${wide ? " compare-layout__body--wide" : ""}${after ? " compare-layout__body--before-section" : ""}`}
        >
          {children}
        </div>
        {after}
      </main>

      <Footer />
    </div>
  );
}
