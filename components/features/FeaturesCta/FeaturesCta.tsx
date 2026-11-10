import CompareCta from "../../CompareSection/Compare/CompareCta/CompareCta";
import "./FeaturesCta.scss";

/** The last call to action: the compare page's sky banner, with this page's words. */
export default function FeaturesCta() {
  return (
    <section className="fcta" id="start">
      <CompareCta
        cta={{
          title: "Make your passport or visa photo now",
          text: "Upload a photo, pick your country and see your checks.",
          label: "Upload a photo",
          href: "/drop",
        }}
      />
    </section>
  );
}
