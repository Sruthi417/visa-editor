import Image from "next/image";

import GetStartedButton from "../DocumentModal/GetStartedButton";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero-bg" id="home">
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Passport &amp; visa
            <br className="hero__br" />
            photos in seconds
          </h1>
          <p className="hero__description">
            Create passport and visa photos that
            <br className="hero__br" />
            match your destination&apos;s requirements
          </p>
          <GetStartedButton className="hero__button" />
        </div>

        <div className="hero__visual">
          <Image
            className="hero__image"
            src="/hero2.png"
            alt="Passport and visa photo preview with before and after comparison"
            width={1920}
            height={1080}
            priority
          />
        </div>
      </div>
    </section>
  );
}
