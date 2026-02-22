import React from "react";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Privacy Policy || Edunoble",
  description: "Privacy Policy for Edunoble - Learn how we collect, use and protect your personal information.",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "32px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>{title}</h2>
    <div style={{ color: "#555", lineHeight: "1.8", fontSize: "15px" }}>{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
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
            <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, marginBottom: "12px" }}>Privacy Policy</h1>
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
                  At <strong>Edunoble</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website or use our services. Please read
                  this policy carefully.
                </p>

                <Section title="1. Information We Collect">
                  <p>We may collect the following types of information:</p>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    <li style={{ marginBottom: "8px" }}><strong>Personal Information:</strong> Name, email address, phone number when you contact us or register.</li>
                    <li style={{ marginBottom: "8px" }}><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, and device information.</li>
                    <li style={{ marginBottom: "8px" }}><strong>Cookies:</strong> Small data files stored on your device to improve your experience (see Cookie Policy).</li>
                  </ul>
                </Section>

                <Section title="2. How We Use Your Information">
                  <ul style={{ paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "8px" }}>To provide and improve our educational services.</li>
                    <li style={{ marginBottom: "8px" }}>To respond to your inquiries and send relevant updates.</li>
                    <li style={{ marginBottom: "8px" }}>To analyse website usage and optimise the user experience.</li>
                    <li style={{ marginBottom: "8px" }}>To comply with legal obligations.</li>
                  </ul>
                </Section>

                <Section title="3. Sharing of Information">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share information
                    with trusted service providers who assist us in operating our website, subject to confidentiality agreements.
                    We may also disclose information when required by law.
                  </p>
                </Section>

                <Section title="4. Data Security">
                  <p>
                    We implement appropriate technical and organisational measures to protect your personal information
                    against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission
                    over the internet is 100% secure.
                  </p>
                </Section>

                <Section title="5. Your Rights">
                  <ul style={{ paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "8px" }}>Access and receive a copy of your personal data.</li>
                    <li style={{ marginBottom: "8px" }}>Request correction of inaccurate data.</li>
                    <li style={{ marginBottom: "8px" }}>Request deletion of your data (right to be forgotten).</li>
                    <li style={{ marginBottom: "8px" }}>Withdraw consent at any time.</li>
                  </ul>
                  <p style={{ marginTop: "10px" }}>
                    To exercise these rights, contact us at{" "}
                    <a href="mailto:edunoble.learning@gmail.com" style={{ color: "#22C55E" }}>edunoble.learning@gmail.com</a>.
                  </p>
                </Section>

                <Section title="6. Third-Party Links">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices
                    or content of those sites. We encourage you to review their privacy policies.
                  </p>
                </Section>

                <Section title="7. Children's Privacy">
                  <p>
                    Our services are intended for students aged 13 and above. We do not knowingly collect personal
                    information from children under 13. If you believe a child has provided us with personal data,
                    please contact us immediately.
                  </p>
                </Section>

                <Section title="8. Changes to This Policy">
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                    updated date. Continued use of our services after changes constitutes acceptance.
                  </p>
                </Section>

                <Section title="9. Contact Us">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:<br />
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
