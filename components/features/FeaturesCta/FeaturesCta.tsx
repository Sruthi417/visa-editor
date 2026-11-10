import GetStartedButton from "../../DocumentModal/GetStartedButton";
import "./FeaturesCta.scss";

/** The last call to action: a sky banner with the upload button. */
export default function FeaturesCta() {
  return (
    <section className="fcta" id="start">
      <div className="fcta__panel">
        <h2>Make your passport or visa photo now</h2>
        <p>Upload a photo, pick your country and see your checks in seconds.</p>
        <GetStartedButton className="fcta__button">Upload a photo</GetStartedButton>
      </div>
    </section>
  );
}
