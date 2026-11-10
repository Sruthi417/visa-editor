import CompareCta from "../../CompareSection/Compare/CompareCta/CompareCta";
import "./AboutCta.scss";

/** The last call to action: the compare page's sky banner, leading to Get started. */
export default function AboutCta() {
  return (
    <section className="ab-cta" id="start">
      <CompareCta
        cta={{
          title: "Make your passport or visa photo",
          text: "Choose your country, upload a photo and see it checked against the rules.",
          label: "Get started",
          href: "/get-started",
        }}
      />
    </section>
  );
}
