import Image from "next/image";

import GetStartedButton from "../DocumentModal/GetStartedButton";
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
          <Image
            className="hero__image"
            src="/hero-sub.png"
            alt="Passport photos of a woman, an older man and a baby, next to a passport"
            width={1272}
            height={1237}
            sizes="(max-width: 900px) 80vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
