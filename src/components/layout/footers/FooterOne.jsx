import React from "react";
import { Link } from "react-router-dom";
import Socials from "@/components/common/Socials";
import { useContextElement } from "@/context/Context";

export default function FooterOne() {
  const { appLogo } = useContextElement();

  return (
    <footer className="footer -type-1 bg-dark-1 -green-links">
      <div className="container">

        {/* ── Top: Logo + Social ── */}
        <div className="footer-header">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <Link to="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                <img src={appLogo} style={{ height: "40px", width: "auto", maxWidth: "160px" }} alt="Edunoble logo" />
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#00e5a0", letterSpacing: "0.5px", marginTop: "2px", lineHeight: 1 }}>✦ AI Powered</span>
              </Link>
            </div>
            <div className="col-auto">
              <div className="footer-header-socials">
                <div className="footer-header-socials__title text-white">
                  Follow us on social media
                </div>
                <div className="footer-header-socials__list">
                  <Socials
                    componentsClass="size-40 d-flex justify-center items-center text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Columns ── */}
        <div className="footer-columns pt-60 pb-30">
          <div className="row y-gap-40">

            {/* Quick Links */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="text-17 fw-500 text-white uppercase mb-25">
                Quick Links
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Home",         to: "/" },
                  { label: "Resources",    to: "/resources" },
                  { label: "About Us",     to: "/about" },
                  { label: "Vision",       to: "/vision" },
                  { label: "Testimonials", to: "/testimonials" },
                  { label: "Contact",      to: "/contact" },
                ].map((item) => (
                  <li key={item.to} style={{ marginBottom: "12px" }}>
                    <Link
                      to={item.to}
                      className="text-white opac-70"
                      style={{ textDecoration: "none" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="text-17 fw-500 text-white uppercase mb-25">
                Subjects
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Economics",
                  "Business Studies",
                  "Accountancy",
                  "Mathematics",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: "12px" }}>
                    <Link
                      to="/resources"
                      className="text-white opac-70"
                      style={{ textDecoration: "none" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="text-17 fw-500 text-white uppercase mb-25">
                Contact Us
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "16px" }}>
                  <a
                    href="tel:8878868600"
                    className="text-white opac-70"
                    style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <i className="fa fa-phone" style={{ fontSize: "13px", flexShrink: 0 }} />
                    <span>8878868600</span>
                  </a>
                </li>
                <li style={{ marginBottom: "16px" }}>
                  <a
                    href="tel:8878868600"
                    className="text-white opac-70"
                    style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <i className="fa fa-phone" style={{ fontSize: "13px", flexShrink: 0 }} />
                    <span>8878868699</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:edunoble.learning@gmail.com"
                    className="text-white opac-70"
                    style={{ textDecoration: "none", display: "flex", alignItems: "flex-start", gap: "10px" }}
                  >
                    <i className="fa fa-envelope" style={{ fontSize: "13px", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ wordBreak: "break-all" }}>edunoble.learning@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <div className="text-17 fw-500 text-white uppercase mb-25">
                Get in Touch
              </div>
              <p className="text-white opac-70 mb-20" style={{ lineHeight: "1.6" }}>
                Have a question or want to learn more about our programs? We'd love to hear from you.
              </p>
              <Link
                to="/contact"
                className="button -md -green-1 text-dark-1"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>

        {/* ── Bottom: Copyright ── */}
        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white">
                © {new Date().getFullYear()} Edunoble. All Right Reserved.
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex x-gap-20 text-white opac-70">
                <Link to="/privacy-policy" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</Link>
                <Link to="/terms-of-use"   style={{ textDecoration: "none", color: "inherit" }}>Terms of Use</Link>
                <Link to="/cookie-policy"  style={{ textDecoration: "none", color: "inherit" }}>Cookie Notice</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
