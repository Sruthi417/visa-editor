import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckListIcon,
  Clock01Icon,
  Globe02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import GuideButton from "../../shared/GuideButton/GuideButton";
import GuideSplit from "../../shared/GuideSplit/GuideSplit";
import type { CheckStatIcon, Guide } from "../../types";
import "./GuideCheck.scss";

const STAT_ICONS: Record<CheckStatIcon, typeof StarIcon> = {
  checks: CheckListIcon,
  countries: Globe02Icon,
  speed: Clock01Icon,
};

/** The photo checker: a small card with the button on the left, the title and content on the right. */
export default function GuideCheck({ data }: { data: Guide["check"] }) {
  return (
    <GuideSplit id={data.id} heading={data.heading} text={data.text} more={data.more} narrow>
      <div className="guide-check">
        <div className="guide-check__media">
          <span className="guide-check__chip">
            <HugeiconsIcon icon={StarIcon} size={13} strokeWidth={1.8} />
            {data.chip}
          </span>

          {/* Only a picture of the idea, so it is hidden from screen readers. */}
          <div className="guide-check__frame" aria-hidden="true">
            <Image src="/images/guide/guide-check-photo.webp" alt="" width={579} height={579} sizes="190px" />
          </div>
        </div>

        <div className="guide-check__body">
          <h3 className="guide-check__title">{data.title}</h3>
          <p className="guide-check__text">{data.cardText}</p>

          <ul className="guide-check__stats">
            {data.stats.map((stat) => (
              <li key={stat.icon}>
                <HugeiconsIcon icon={STAT_ICONS[stat.icon]} size={16} strokeWidth={1.7} />
                <strong>{stat.value}</strong>
                {stat.label && <span>{stat.label}</span>}
              </li>
            ))}
          </ul>

          <div className="guide-check__action">
            <GuideButton label={data.cta.label} />
          </div>
        </div>
      </div>
    </GuideSplit>
  );
}
