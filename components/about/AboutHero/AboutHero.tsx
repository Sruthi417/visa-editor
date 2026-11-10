import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import "./AboutHero.scss";

/** The sky header: who FlyFrame is for and what it does, with finished photos rising below. */
export default function AboutHero() {
  return (
    <section className="ab-hero" id="top">
      <div className="ab-hero__content">
        <span className="ab-hero__pill">About FlyFrame</span>
        <h1 className="ab-hero__title">Passport and visa photos, made right at home</h1>
        <p className="ab-hero__sub">
          FlyFrame turns an everyday snapshot into a passport or visa photo that meets your
          destination&apos;s rules, in seconds.
        </p>

        <div className="ab-hero__actions">
          <Link href="/get-started" className="ab-hero__primary">
            <span className="hero__button-text">Get started</span>
            <span className="hero__button-icon" aria-hidden="true">
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} color="#131313" strokeWidth={2.2} />
            </span>
          </Link>
          <Link href="/features" className="ab-hero__secondary">
            See all features
          </Link>
        </div>
      </div>

      <div className="ab-hero__picture">
        <Image
          src="/images/hero/hero-sub.webp"
          alt="Finished passport photos of a woman, an older man and a baby, beside a passport"
          width={1272}
          height={1237}
          sizes="(max-width: 700px) 86vw, 540px"
          priority
        />
      </div>
    </section>
  );
}
