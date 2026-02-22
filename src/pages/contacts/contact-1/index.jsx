import Faq from "@/components/common/Faq";
import Preloader from "@/components/common/Preloader";
import ContactOne from "@/components/contacts/ContactOne";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact Us | EduNoble - We'd Love to Hear From You",
  description:
    "Get in touch with EduNoble. Have questions about our sample papers, need support, or want to share feedback? Reach out and we'll get back to you.",
};

export default function ContactPage1() {
  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />

      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">

        {/* Hero banner */}
        <section
          style={{
            background: "linear-gradient(135deg, #1a1050 0%, #2d1b7e 50%, #1a1050 100%)",
            paddingTop: "120px",
            paddingBottom: "80px",
            textAlign: "center",
          }}
        >
          <div className="container">
            <h1
              style={{
                color: "#00e5a0",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                marginBottom: "16px",
                letterSpacing: "-0.5px",
              }}
            >
              Get in Touch
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Have a question or feedback? We'd love to hear from you and help in any way we can.
            </p>
          </div>
        </section>

        <ContactOne />
        <Faq />

        <FooterOne />
      </div>
    </div>
  );
}
