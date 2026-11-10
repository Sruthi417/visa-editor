import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeliveryTruck01Icon,
  Download01Icon,
  MagicWand01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";

import "./FeaturesOptions.scss";

// The choices offered at checkout (see DocumentModal/CheckoutView.tsx). Prices are left out:
// the checkout's are still placeholders.
const OPTIONS = [
  {
    icon: Download01Icon,
    kind: "Photo",
    title: "Digital photo",
    text: "An instant download for online applications and printing at home.",
  },
  {
    icon: DeliveryTruck01Icon,
    kind: "Photo",
    title: "Digital photo + prints",
    text: "Printed photos delivered to your door, with a digital copy for online forms.",
  },
  {
    icon: UserCheck01Icon,
    kind: "Extra",
    title: "Expert review",
    text: "A photo specialist double-checks your photo against the official requirements.",
  },
  {
    icon: MagicWand01Icon,
    kind: "Extra",
    title: "Light retouching",
    text: "Touch-ups for blemishes and stray hairs, without changing how you look.",
  },
];

/** What you can get once the photo is ready: the two photo options and the two extras. */
export default function FeaturesOptions() {
  return (
    <section className="foptions" id="options">
      <div className="foptions__wrap">
        <header className="foptions__head">
          <span>Your photo</span>
          <h2>Download it, or have it printed</h2>
          <p>Choose how you want the finished photo at checkout, and add an expert check if you like.</p>
        </header>

        <div className="foptions__body">
          <div className="foptions__picture">
            <Image
              src="/images/how-it-works/step-3-download.webp"
              alt="A printer printing a sheet of six passport photos"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 90vw, 480px"
            />
          </div>

          <ul className="foptions__cards">
            {OPTIONS.map((option) => (
              <li key={option.title} className="foptions__card">
                <div className="foptions__card-head">
                  <span className="foptions__icon" aria-hidden="true">
                    <HugeiconsIcon icon={option.icon} size={22} strokeWidth={1.8} />
                  </span>
                  <span className={`foptions__kind foptions__kind--${option.kind.toLowerCase()}`}>
                    {option.kind}
                  </span>
                </div>
                <h3 className="foptions__title">{option.title}</h3>
                <p className="foptions__text">{option.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
