import Image from "next/image";
import Link from "next/link";

import "./GetStartedPrepare.scss";

// What to have ready, each pictured with the same woman against the same soft cloudy sky (640 x 480).
const NEEDS = [
  {
    title: "A phone with a camera",
    text: "The rear camera gives the sharpest photo. Stand 1–2 m away, or hold it 40–50 cm away for a selfie.",
    image: "/images/get-started/prep-phone-sky.webp",
    alt: "A woman standing 16 to 20 inches, 40 to 50 cm, from a phone on a tripod",
  },
  {
    title: "A plain, light wall",
    text: "Stand in front of a plain white or light wall, with nothing behind you.",
    image: "/images/get-started/prep-wall-sky.webp",
    alt: "A woman facing the camera in front of a plain light wall",
  },
  {
    title: "Daylight from a window",
    text: "Face a window for soft, even light, with no shadows on your face or the wall.",
    image: "/images/get-started/prep-light-sky.webp",
    alt: "Her photo half in shadow, marked wrong, beside the same photo evenly lit, marked correct",
  },
  {
    title: "A helper or a timer",
    text: "Ask someone to take the photo, or prop the phone up and use the timer.",
    image: "/images/get-started/prep-helper-sky.webp",
    alt: "A helper holding a phone to photograph her against a plain wall, marked correct",
  },
];

/** What to have ready before taking the photo, then where to read more. */
export default function GetStartedPrepare() {
  return (
    <section className="gs-prep" id="before-you-start">
      <div className="gs-prep__wrap">
        <header className="gs-prep__head">
          <span>Before you start</span>
          <h2>What you need to take the photo</h2>
          <p>Four things you already have at home. Set them up before you take the photo.</p>
        </header>

        <ul className="gs-prep__grid">
          {NEEDS.map((need) => (
            <li key={need.title} className="gs-prep__card">
              <div className="gs-prep__media">
                <Image
                  src={need.image}
                  alt={need.alt}
                  width={640}
                  height={480}
                  sizes="(max-width: 1000px) 46vw, 260px"
                />
              </div>
              <h3 className="gs-prep__title">{need.title}</h3>
              <p className="gs-prep__text">{need.text}</p>
            </li>
          ))}
        </ul>

        <p className="gs-prep__more">
          Read the full guide on{" "}
          <Link href="/guide/take-a-photo-at-home">how to take a photo at home</Link>, or see{" "}
          <Link href="/blog/rear-vs-front-camera">whether the rear or front camera is better</Link>.
        </p>
      </div>
    </section>
  );
}
