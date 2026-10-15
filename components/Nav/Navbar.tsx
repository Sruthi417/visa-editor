import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload01Icon } from "@hugeicons/core-free-icons";

import "./Navbar.scss";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src="/logo.png"
            alt="Logo"
            width={38}
            height={38}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Button */}
        <Link href="/upload" className="navbar__button">
          <HugeiconsIcon
            icon={Upload01Icon}
            size={20}
            color="currentColor"
            strokeWidth={1.5}
          />
          <span>Upload</span>
        </Link>

      </nav>
    </header>
  );
}