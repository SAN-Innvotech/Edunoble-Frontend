import React from "react";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cookie Policy || Edunoble",
  description: "Cookie Policy for Edunoble - Learn how we use cookies and similar technologies.",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "32px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>{title}</h2>
    <div style={{ color: "#555", lineHeight: "1.8", fontSize: "15px" }}>{children}</div>
  </div>
);

const cookieTypes = [
  { name: "Strictly Necessary", desc: "Essential for the website to function. Cannot be disabled.", example: "Session authentication, security tokens." },
  { name: "Performance / Analytics", desc: "Help us understand how visitors interact with our site.", example: "Page views, time on site, error tracking." },
  { name: "Functional", desc: "Remember your preferences to provide an enhanced experience.", example: "Language preference, theme selection." },
  { name: "Marketing", desc: "Used to deliver relevant advertisements (currently not used).", example: "Ad tracking, retargeting." },
];

export default function CookiePolicyPage() {
  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div
        className="content-wrapper js-content-wrapper overflow-hidden"
        style={{ marginTop: "60px", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 60px)" }}
      >
        {/* Hero */}
        <div style={{ background: "#1a1a2e", padding: "60px 0 40px" }}>
          <div className="container">
            <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, marginBottom: "12px" }}>Cookie Policy</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px" }}>
              Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "60px 0" }}>
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-10 col-xl-8">

                <p style={{ color: "#555", lineHeight: "1.8", fontSize: "15px", marginBottom: "32px" }}>
                  This Cookie Policy explains how <strong>Edunoble</strong> uses cookies and similar tracking technologies
                  when you visit our website. By using our site, you consent to the use of cookies as described in this policy.
                </p>

                <Section title="1. What Are Cookies?">
                  <p>
                    Cookies are small text files stored on your device (computer, tablet, or phone) when you visit a website.
                    They help websites remember information about your visit, making your next visit easier and the site more useful.
                  </p>
                </Section>

                <Section title="2. Types of Cookies We Use">
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
                      <thead>
                        <tr style={{ background: "#1a1a2e", color: "#fff" }}>
                          <th style={{ padding: "12px 16px", textAlign: "left", borderRadius: "8px 0 0 0" }}>Type</th>
                          <th style={{ padding: "12px 16px", textAlign: "left" }}>Purpose</th>
                          <th style={{ padding: "12px 16px", textAlign: "left", borderRadius: "0 8px 0 0" }}>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookieTypes.map((c, i) => (
                          <tr key={c.name} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                            <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1a1a2e" }}>{c.name}</td>
                            <td style={{ padding: "12px 16px" }}>{c.desc}</td>
                            <td style={{ padding: "12px 16px", color: "#777" }}>{c.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>

                <Section title="3. How to Manage Cookies">
                  <p>
                    You can control and manage cookies in several ways:
                  </p>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    <li style={{ marginBottom: "8px" }}>
                      <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings menu.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      <strong>Cookie Banner:</strong> When you first visit our site, you can accept or decline non-essential cookies using our cookie consent banner.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      <strong>Opt-Out Tools:</strong> Third-party analytics providers (e.g., Google Analytics) offer opt-out mechanisms.
                    </li>
                  </ul>
                  <p style={{ marginTop: "12px" }}>
                    Please note that disabling cookies may affect the functionality of our website.
                  </p>
                </Section>

                <Section title="4. Third-Party Cookies">
                  <p>
                    We may use third-party services such as Google Analytics to understand site usage. These services
                    may set their own cookies. We recommend reviewing the privacy and cookie policies of these third parties.
                  </p>
                </Section>

                <Section title="5. Cookie Retention">
                  <p>
                    Session cookies are deleted when you close your browser. Persistent cookies remain on your device
                    for a set period or until you delete them manually. The retention period varies by cookie type.
                  </p>
                </Section>

                <Section title="6. Updates to This Policy">
                  <p>
                    We may update this Cookie Policy periodically. Changes will be reflected on this page with an updated date.
                    Please check back regularly.
                  </p>
                </Section>

                <Section title="7. Contact Us">
                  <p>
                    For questions about our use of cookies:<br />
                    <strong>Email:</strong> <a href="mailto:edunoble.learning@gmail.com" style={{ color: "#22C55E" }}>edunoble.learning@gmail.com</a><br />
                    <strong>Phone:</strong> <a href="tel:8878868600" style={{ color: "#22C55E" }}>8878868600</a>
                  </p>
                </Section>

              </div>
            </div>
          </div>
        </div>

        <FooterOne />
      </div>
    </div>
  );
}
