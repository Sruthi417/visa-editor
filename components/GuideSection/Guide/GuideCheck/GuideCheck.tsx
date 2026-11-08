import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

import GuideButton from "../../shared/GuideButton/GuideButton";
import GuideSplit from "../../shared/GuideSplit/GuideSplit";
import type { Guide } from "../../types";
import "./GuideCheck.scss";

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

          <div className="guide-check__action">
            <GuideButton label={data.cta.label} />
          </div>
        </div>
      </div>
    </GuideSplit>
  );
}
