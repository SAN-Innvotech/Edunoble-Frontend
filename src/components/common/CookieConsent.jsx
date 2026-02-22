import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const COOKIE_KEY = "edunoble_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't pop immediately on load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: "#1a1a2e",
        borderTop: "3px solid #22C55E",
        padding: "20px 24px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.35)",
        animation: "slideUp 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <p style={{ color: "#fff", fontSize: "14px", margin: 0, lineHeight: "1.6" }}>
            🍪 We use cookies to enhance your browsing experience and analyse site traffic.
            By clicking <strong>"Accept"</strong>, you consent to our use of cookies.{" "}
            <Link to="/cookie-policy" style={{ color: "#22C55E", textDecoration: "underline" }}>
              Learn more
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <button
            onClick={decline}
            style={{
              padding: "9px 20px",
              borderRadius: "6px",
              border: "1.5px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
          >
            Decline
          </button>
          <button
            onClick={accept}
            style={{
              padding: "9px 24px",
              borderRadius: "6px",
              border: "none",
              background: "#22C55E",
              color: "#1a1a2e",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#16a34a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#22C55E")}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
