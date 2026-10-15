"use client";

import { ArrowUp2, Apple, GooglePlay } from "iconsax-react";
import "./Footer.scss";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
     
      <section className="footer__visual">
        {/* Background */}
        <div className="footer__visual-bg" />

        {/* Grain */}
        <div className="footer__grain" />

        <div className="footer__visual-content">
          {/* HEADING */}
          <h2 className="footer__visual-title">Think Money Differently.</h2>

          {/* DESCRIPTION */}
          <p className="footer__visual-description">
            Stay ahead of the trends and insights reshaping
            <br />
            how the world thinks about personal finance.
          </p>

          {/* STORE BUTTONS */}
          <div className="footer__stores">
            <a href="#" className="footer__store footer__store--primary">
              <Apple size="22" variant="Bold"     color="#000"/>

              <span>App Store</span>
            </a>

            <a href="#" className="footer__store footer__store--secondary">
              <GooglePlay size="21" variant="Bold" color="#fff" />

              <span>Google Play</span>
            </a>
          </div>

          {/* PHONES */}
          <div className="footer__phones">
            <img
              src="/phone.png"
              alt="Hibo finance application"
              className="footer__phone"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER INFORMATION
      ===================================================== */}
      <section className="footer__bottom">
        <div className="footer__bottom-container">
          {/* LEFT */}
          <div className="footer__brand">
            {/* LOGO ONLY HERE */}
            <div className="footer__brand-logo">
              <img src="/logo.png" alt="Hibo" />
            </div>

            <p className="footer__brand-description">
              The smarter way to manage your
              <br />
              finance. Available on iOS and Android.
            </p>

            {/* EMAIL */}
            <form className="footer__newsletter">
              <input type="email" placeholder="Email Address" />

              <button type="submit">Submit</button>
            </form>
          </div>

          {/* RIGHT LINKS */}
          <div className="footer__links">
            <div className="footer__link-column">
              <span className="footer__link-title">PRODUCT</span>

              <a href="#features">Features</a>

              <a href="#pricing">Pricing</a>

              <a href="#changelog">Changelog</a>

              <a href="#blog">Blog</a>
            </div>

            <div className="footer__link-column">
              <span className="footer__link-title">COMPANY</span>

              <a href="#about">About</a>

              <a href="#privacy">Privacy Policy</a>

              <a href="#terms">Terms of Service</a>

              <a href="#cookies">Cookie Settings</a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer__copyright">
          <div className="footer__copyright-left">
            <span>
              Template by <strong> Peace Ez. Badejo</strong>
            </span>
          </div>

          <div className="footer__copyright-center">
            <span className="footer__copyright-icon">©</span>

            <span>2026, Hibo. All rights reserved</span>
          </div>

          <button
            type="button"
            className="footer__top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp2 size="24" color="#111" variant="Linear" />
          </button>
        </div>
      </section>
    </footer>
  );
}
