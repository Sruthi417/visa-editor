import Image from "next/image";
import Link from "next/link";

import "./Footer.scss";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#process" },
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
              <Image
                src="/images/logo/flyframe.webp"
                alt="FlyFrame"
                width={145}
                height={36}
              />
            </Link>

            <p className="footer__about">
              FlyFrame turns an everyday snapshot into a passport or visa
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
      </div>
    </footer>
  );
}
