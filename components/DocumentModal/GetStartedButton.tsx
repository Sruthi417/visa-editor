"use client";

import { useCallback, useState } from "react";

import DocumentModal from "./DocumentModal";

/** The hero's call to action: opens the "Choose a document" window. */
export default function GetStartedButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // A new key each time it opens, so the window always starts from the
  // "Choose a document" screen instead of wherever it was closed.
  const [session, setSession] = useState(0);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => {
          setSession((value) => value + 1);
          setOpen(true);
        }}
      >
        Get started
      </button>

      <DocumentModal key={session} open={open} onClose={close} />
    </>
  );
}
