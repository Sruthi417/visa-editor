import Footer from "../../Footer/Footer";
import Navbar from "../../Nav/Navbar";
import "./CompareLayout.scss";

type Props = {
  /** The full-width header above the content. */
  hero: React.ReactNode;
  children: React.ReactNode;
};

/** The page frame shared by the hub and every comparison: navbar, hero, content column, footer. */
export default function CompareLayout({ hero, children }: Props) {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="compare-layout">
        {hero}
        <div className="compare-layout__body">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
