import Link from "next/link";

import HeroVisual from "./HeroVisual";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero-bg">
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Passport &amp; visa photos, ready in seconds
          </h1>
          <p className="hero__description">
            Upload any portrait and get a compliant, correctly sized photo for
            your passport or visa application. Background, crop and
            proportions are handled for you.
          </p>
          <Link href="/upload" className="hero__button">
            Get started
          </Link>
        </div>

        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
