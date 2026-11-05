import { HugeiconsIcon } from "@hugeicons/react";
import { MinusSignIcon } from "@hugeicons/core-free-icons";

import "./StatusChip.scss";

export type ChipTone = "planned" | "live" | "tbd" | "not-stated";

type Props = {
  tone: ChipTone;
  children: React.ReactNode;
};

/** The small coloured label for a feature's status ("Planned", "Not stated"...). */
export default function StatusChip({ tone, children }: Props) {
  return (
    <span className={`status-chip status-chip--${tone}`}>
      {tone === "not-stated" && <HugeiconsIcon icon={MinusSignIcon} size={12} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
