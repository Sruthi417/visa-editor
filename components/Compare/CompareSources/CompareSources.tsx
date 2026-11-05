import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import { formatDate } from "../comparisons";
import Reveal from "../Reveal";
import type { Comparison } from "../types";
import "./CompareSources.scss";

export default function CompareSources({ sources }: { sources: Comparison["sources"] }) {
  return (
    <Reveal className="compare-sources" id="sources">
      <h2 className="compare-sources__heading">{sources.title}</h2>
      <p className="compare-sources__text">Pages opened on {formatDate(sources.openedOn)}.</p>

      <ul className="compare-sources__links">
        {sources.links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} />
            </a>
          </li>
        ))}
      </ul>

      <p className="compare-sources__text compare-sources__text--muted">{sources.notUsed}</p>
      <p className="compare-sources__text compare-sources__text--muted">{sources.disclaimer}</p>
    </Reveal>
  );
}
