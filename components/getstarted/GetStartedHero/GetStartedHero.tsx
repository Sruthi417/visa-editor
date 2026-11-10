import { COUNTRY_COUNT, SPEC_COUNT } from "../../features/featureData";
import StartPanel from "./StartPanel";
import "./GetStartedHero.scss";

/** The sky header: what to do on the left, the start panel on the right. */
export default function GetStartedHero() {
  return (
    <section className="gs-hero" id="top">
      <div className="gs-hero__wrap">
        <div className="gs-hero__copy">
          <h1 className="gs-hero__title">Start your passport or visa photo</h1>
          <p className="gs-hero__sub">
            Choose your document and country, upload a photo, and see every requirement checked
            before you pay.
          </p>

          <ul className="gs-hero__facts">
            <li>{SPEC_COUNT} photo specs</li>
            <li>{COUNTRY_COUNT} countries and Schengen</li>
            <li>Free preview</li>
          </ul>
        </div>

        <StartPanel />
      </div>
    </section>
  );
}
