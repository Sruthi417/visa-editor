import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { PassportIcon, StampIcon } from "@hugeicons/core-free-icons";

import GuideSplit from "../../shared/GuideSplit/GuideSplit";
import type { Guide } from "../../types";
import "./GuideNote.scss";

/** Passport and visa photos: a small picture card on the left, the title and content on the right. */
export default function GuideNote({ data }: { data: Guide["note"] }) {
  return (
    <GuideSplit id={data.id} heading={data.heading} text={data.text} more={data.more}>
      <div className="guide-note">
        <div className="guide-note__head">
          <span className="guide-note__circle" aria-hidden="true">
            <HugeiconsIcon icon={PassportIcon} size={18} strokeWidth={1.7} />
          </span>
          <h3 className="guide-note__title">{data.title}</h3>
          <span className="guide-note__circle" aria-hidden="true">
            <HugeiconsIcon icon={StampIcon} size={18} strokeWidth={1.7} />
          </span>
        </div>

        <div className="guide-note__panel">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={1536}
            height={1024}
            sizes="(max-width: 820px) calc(100vw - 110px), 480px"
            className="guide-note__image"
          />
        </div>
      </div>
    </GuideSplit>
  );
}
