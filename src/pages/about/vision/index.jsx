import Preloader from "@/components/common/Preloader";
import VisionDynamic from "@/components/about/VisionDynamic";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Our Vision | EduNoble - Empowering Student Excellence",
  description:
    "Discover EduNoble's vision — empowering every student to achieve academic excellence through smart, structured practice with high-quality sample papers.",
};

export default function VisionPage() {
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
              Our Vision & Mission
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Empowering every student to achieve academic excellence through smart, structured practice.
            </p>
          </div>
        </section>

        <VisionDynamic />
        <FooterOne />
      </div>
    </div>
  );
}
