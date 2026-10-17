"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Menu01Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import DocumentModal from "../DocumentModal/DocumentModal";
import "./Navbar.scss";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Process", href: "#process" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

// The links collapse into the menu below this width. Keep in sync with the
// breakpoint in Navbar.scss.
const MOBILE_QUERY = "(max-width: 768px)";

const EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.22, ease: EASE },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadSession, setUploadSession] = useState(0);
  const menuId = useId();

  // Close the menu with Escape, and when the window grows past the breakpoint
  // (the desktop links are visible again).
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const query = window.matchMedia(MOBILE_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    query.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      query.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);

  const handleOpenUpload = () => {
    setUploadSession((val) => val + 1);
    setUploadOpen(true);
    setOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      close();
      const id = href.replace(/^#/, "");
      if (id === "home" || !id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      {/* Dims the page behind the open menu; a tap on it closes the menu. */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            className="navbar__backdrop"
            aria-label="Close menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      <header className="navbar-wrapper">
        <nav className="navbar" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="#home"
            className="navbar__logo"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            <Image
              src="/logo1.png"
              alt="FlyFrame"
              width={150}
              height={50}
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Button - opens Country Selection popup */}
          <button
            type="button"
            className="navbar__button"
            aria-haspopup="dialog"
            onClick={handleOpenUpload}
          >
            <span>Upload</span>
            <HugeiconsIcon
              icon={Upload01Icon}
              size={20}
              color="currentColor"
              strokeWidth={1.5}
            />
          </button>

          {/* Menu button, shown on small screens */}
          <button
            type="button"
            className="navbar__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                className="navbar__toggle-icon"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <HugeiconsIcon
                  icon={open ? Cancel01Icon : Menu01Icon}
                  size={22}
                  strokeWidth={1.8}
                />
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* The menu: the links, then the main action */}
        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              className="navbar__menu"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ul className="navbar__menu-list">
                {navLinks.map((link) => (
                  <motion.li key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  className="navbar__menu-cta"
                  aria-haspopup="dialog"
                  onClick={handleOpenUpload}
                >
                  <span>Upload</span>
                  <HugeiconsIcon
                    icon={Upload01Icon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Country & Document Selection Modal */}
      <DocumentModal
        key={uploadSession}
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </>
  );
}
