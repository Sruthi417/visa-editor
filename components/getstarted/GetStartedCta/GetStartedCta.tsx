import CompareCta from "../../CompareSection/Compare/CompareCta/CompareCta";
import "./GetStartedCta.scss";

/** The last call to action: the compare page's sky banner, with this page's words. */
export default function GetStartedCta() {
  return (
    <section className="gs-cta" id="start">
      <CompareCta
        cta={{
          title: "Ready to make your photo?",
          text: "Upload a photo and see it checked against your country's rules.",
          label: "Upload a photo",
          href: "/drop",
        }}
      />
    </section>
  );
}
