import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon } from "@hugeicons/core-free-icons";

import "./Footer.scss";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Upload photo", href: "/upload" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Photo guide", href: "/#photo-tips" },
      { label: "Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <span className="footer__logo-mark">
                <HugeiconsIcon icon={Camera01Icon} size={22} strokeWidth={1.6} />
              </span>
              <span className="footer__logo-name">Visa Editor</span>
            </Link>

            <p className="footer__about">
              Visa Editor turns an everyday snapshot into a passport or visa
              photo that meets your destination&apos;s rules, in seconds.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {columns.map((column) => (
              <div className="footer__column" key={column.title}>
                <h3 className="footer__column-title">{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* <p className="footer__copyright">
          &copy;2026 VISA EDITOR. All rights reserved.
        </p> */}
      </div>
    </footer>
  );
}
