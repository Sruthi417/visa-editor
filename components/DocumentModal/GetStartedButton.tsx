"use client";

import { useCallback, useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

import DocumentModal from "./DocumentModal";
import type { DocumentType } from "./specs";

/**
 * The hero's call to action: opens the "Choose a document" window, on a given document and
 * country when the page passes them.
 */
export default function GetStartedButton({
  className,
  children,
  type,
  code,
}: {
  className?: string;
  children?: React.ReactNode;
  type?: DocumentType;
  code?: string;
}) {
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
        <span className="hero__button-text">{children ?? "Upload"}</span>
        <span className="hero__button-icon" aria-hidden="true">
          <HugeiconsIcon
            icon={Upload01Icon}
            size={22}
            color="#131313"
            strokeWidth={2.2}
          />
        </span>
      </button>

      <DocumentModal
        key={session}
        open={open}
        onClose={close}
        initialType={type}
        initialCode={code}
      />
    </>
  );
}
