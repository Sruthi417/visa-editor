"use client";

import { useCallback, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

import DocumentModal from "../../../DocumentModal/DocumentModal";

/** Styled like the navbar's Upload button, and opens the same upload window. */
export default function CompareHeroCta({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  // A new key each time it opens, so the window always starts from the first screen.
  const [session, setSession] = useState(0);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className="compare-hero__cta"
        aria-haspopup="dialog"
        onClick={() => {
          setSession((value) => value + 1);
          setOpen(true);
        }}
      >
        <span>{label}</span>
        <HugeiconsIcon icon={Upload01Icon} size={20} color="currentColor" strokeWidth={1.5} />
      </button>

      <DocumentModal key={session} open={open} onClose={close} />
    </>
  );
}
