import HeroDashboard from "./HeroDashboard";
import "./AboutHero.scss";

/** The sky header: who FlyFrame is for and what it does, with its photo report rising below. */
export default function AboutHero() {
  return (
    <section className="ab-hero" id="top">
      <div className="ab-hero__content">
        <h1 className="ab-hero__title">Passport and visa photos, made right at home</h1>
        <p className="ab-hero__sub">
          FlyFrame turns an everyday snapshot into a passport or visa photo that meets your
          destination&apos;s rules, in seconds.
        </p>
      </div>

      {/* Only the top of the dashboard shows: the hero's foot cuts it off. */}
      <div className="ab-hero__window">
        <HeroDashboard />
      </div>
    </section>
  );
}
