"use client";

import { useCallback, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import DocumentModal from "../../../DocumentModal/DocumentModal";
import "./BlogButton.scss";

type Props = {
  label: string;
  /** `dark` is the charcoal button; `light` is white, for the sky banner. */
  variant?: "dark" | "light";
  className?: string;
};

/** A button that opens the same upload window as the navbar's Upload button. */
export default function BlogButton({ label, variant = "dark", className }: Props) {
  const [open, setOpen] = useState(false);
  // A new key each time it opens, so the window always starts from the first screen.
  const [session, setSession] = useState(0);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className={`blog-button blog-button--${variant}${className ? ` ${className}` : ""}`}
        aria-haspopup="dialog"
        onClick={() => {
          setSession((value) => value + 1);
          setOpen(true);
        }}
      >
        {label}
        <HugeiconsIcon icon={ArrowRight02Icon} size={20} strokeWidth={1.8} className="blog-button__arrow" />
      </button>

      <DocumentModal key={session} open={open} onClose={close} />
    </>
  );
}
