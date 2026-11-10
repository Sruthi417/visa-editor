import Image from "next/image";
import Link from "next/link";

import "./GetStartedPrepare.scss";

// What to have ready, with the photo guide's own pictures. Each picture is framed on its subject.
const NEEDS = [
  {
    title: "A phone with a camera",
    text: "The rear camera gives the sharpest photo. Stand 1–2 m away, or hold it 40–50 cm away for a selfie.",
    image: "/images/photo-tips/photo-1.webp",
    alt: "A man standing in front of a phone on a tripod, measured 16 to 20 inches away",
    width: 1000,
    height: 1573,
    position: "50% 58%",
  },
  {
    title: "A plain, light wall",
    text: "Stand in front of a plain white or light wall, with nothing behind you.",
    image: "/images/photo-tips/photo-5.webp",
    alt: "The same portrait in front of a plain wall, marked correct, and a bookshelf, marked wrong",
    width: 1000,
    height: 1573,
    position: "50% 50%",
  },
  {
    title: "Daylight from a window",
    text: "Face a window for soft, even light, with no shadows on your face or the wall.",
    image: "/images/photo-tips/photo-2.webp",
    alt: "A face half in shadow, marked wrong, and half evenly lit, marked correct",
    width: 1001,
    height: 1570,
    position: "50% 46%",
  },
  {
    title: "A helper or a timer",
    text: "Ask someone to take the photo, or prop the phone up and use the timer.",
    image: "/images/get-started/need-helper.webp",
    alt: "A helper holding a phone to photograph a woman against a plain wall, marked correct",
    width: 826,
    height: 778,
    position: "50% 50%",
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
                  width={need.width}
                  height={need.height}
                  sizes="(max-width: 1000px) 46vw, 260px"
                  style={{ objectPosition: need.position }}
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
