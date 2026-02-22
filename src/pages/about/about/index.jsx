import Preloader from "@/components/common/Preloader";
import AboutDynamic from "@/components/about/AboutDynamic";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About Us || Edunoble - Sample Papers for Class 8th, 9th, 10th, 11th and 12th",
  description:
    "Learn more about Edunoble - a leading educational platform providing high-quality sample papers and study materials for students across various boards.",
};

export default function AboutPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div
        className="content-wrapper js-content-wrapper overflow-hidden"
        style={{ marginTop: "60px", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 60px)" }}
      >
        <div style={{ flex: 1 }}>
          <AboutDynamic />
        </div>
        <FooterOne />
      </div>
    </div>
  );
}
