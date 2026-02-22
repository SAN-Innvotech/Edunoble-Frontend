import React from "react";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Terms of Use || Edunoble",
  description: "Terms of Use for Edunoble - Understand the rules and regulations governing the use of our platform.",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "32px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>{title}</h2>
    <div style={{ color: "#555", lineHeight: "1.8", fontSize: "15px" }}>{children}</div>
  </div>
);

export default function TermsOfUsePage() {
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
            <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, marginBottom: "12px" }}>Terms of Use</h1>
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
                  Welcome to <strong>Edunoble</strong>. By accessing or using our website and services, you agree to be
                  bound by these Terms of Use. Please read them carefully before using our platform.
                </p>

                <Section title="1. Acceptance of Terms">
                  <p>
                    By accessing and using the Edunoble platform, you confirm that you have read, understood, and agreed
                    to these Terms of Use. If you do not agree to these terms, please do not use our services.
                  </p>
                </Section>

                <Section title="2. Use of Services">
                  <ul style={{ paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "8px" }}>You must be at least 13 years of age to use our services.</li>
                    <li style={{ marginBottom: "8px" }}>You agree to use our platform solely for lawful educational purposes.</li>
                    <li style={{ marginBottom: "8px" }}>You must not misuse, copy, distribute, or modify any content without permission.</li>
                    <li style={{ marginBottom: "8px" }}>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  </ul>
                </Section>

                <Section title="3. Intellectual Property">
                  <p>
                    All content on this website — including study materials, sample papers, text, images, and graphics —
                    is the intellectual property of Edunoble and is protected by applicable copyright laws. Unauthorised
                    reproduction or distribution is strictly prohibited.
                  </p>
                </Section>

                <Section title="4. Educational Content Disclaimer">
                  <p>
                    Edunoble provides educational resources for informational and practice purposes only. While we strive
                    for accuracy, we do not guarantee that all content is complete, up-to-date, or error-free. Results
                    may vary based on individual effort and circumstances.
                  </p>
                </Section>

                <Section title="5. Prohibited Conduct">
                  <ul style={{ paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "8px" }}>Uploading or transmitting harmful, illegal, or offensive content.</li>
                    <li style={{ marginBottom: "8px" }}>Attempting to gain unauthorised access to any part of our systems.</li>
                    <li style={{ marginBottom: "8px" }}>Using automated tools to scrape or extract data from the platform.</li>
                    <li style={{ marginBottom: "8px" }}>Impersonating any person or entity.</li>
                  </ul>
                </Section>

                <Section title="6. Limitation of Liability">
                  <p>
                    Edunoble shall not be liable for any indirect, incidental, or consequential damages arising out of
                    your use of, or inability to use, our services. Our total liability, in any event, shall not exceed
                    the amount you paid for the service in question.
                  </p>
                </Section>

                <Section title="7. Termination">
                  <p>
                    We reserve the right to suspend or terminate your access to our services at any time, without notice,
                    if we believe you have violated these Terms of Use or engaged in any conduct harmful to Edunoble or
                    other users.
                  </p>
                </Section>

                <Section title="8. Governing Law">
                  <p>
                    These Terms of Use shall be governed by and construed in accordance with the laws of India. Any
                    disputes shall be subject to the exclusive jurisdiction of courts in Indore, Madhya Pradesh.
                  </p>
                </Section>

                <Section title="9. Changes to These Terms">
                  <p>
                    We may revise these Terms of Use at any time. Changes will be effective upon posting to this page.
                    Continued use of our services constitutes your acceptance of the revised terms.
                  </p>
                </Section>

                <Section title="10. Contact Us">
                  <p>
                    For questions or concerns regarding these Terms, please reach out:<br />
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
