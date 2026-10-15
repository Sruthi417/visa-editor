import GetStartedButton from "../DocumentModal/GetStartedButton";
import HeroVisual from "./HeroVisual";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero-bg">
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Passport &amp; visa photos in seconds</h1>
          <p className="hero__description">
            Create passport and visa photos that match your destination&apos;s
            requirements
          </p>
          <GetStartedButton className="hero__button" />
        </div>

        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
