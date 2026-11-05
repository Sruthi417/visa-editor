import { HugeiconsIcon } from "@hugeicons/react";
import { Globe02Icon, Rocket01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareStrengths.scss";

export default function CompareStrengths({ strengths }: { strengths: Comparison["strengths"] }) {
  const plans = [
    { key: "flyframe", icon: Rocket01Icon, featured: true, ...strengths.flyframe },
    { key: "competitor", icon: Globe02Icon, featured: false, ...strengths.competitor },
  ];

  return (
    <Reveal className="compare-strengths" id="stronger">
      <h2 className="compare-strengths__title">{strengths.title}</h2>

      <div className="compare-strengths__plans">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`compare-strengths__plan${plan.featured ? " compare-strengths__plan--featured" : ""}`}
          >
            <span className="compare-strengths__icon">
              <HugeiconsIcon icon={plan.icon} size={24} strokeWidth={1.8} />
            </span>
            <h3 className="compare-strengths__name">{plan.heading}</h3>
            <ul className="compare-strengths__ticks">
              {plan.points.map((point) => (
                <li key={point}>
                  <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
