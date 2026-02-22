import Preloader from "@/components/common/Preloader";
import AboutDynamic from "@/components/about/AboutDynamic";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About Us | EduNoble - Who We Are & Our Mission",
  description:
    "Learn more about EduNoble - a leading educational platform providing high-quality sample papers and study materials for students across various boards.",
};

export default function AboutPage() {
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
              About EduNoble
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Learn who we are and what drives our mission to help every student excel in their board exams.
            </p>
          </div>
        </section>

        <div style={{ flex: 1 }}>
          <AboutDynamic />
        </div>
        <FooterOne />
      </div>
    </div>
  );
}
