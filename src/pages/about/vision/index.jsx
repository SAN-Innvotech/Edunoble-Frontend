import Preloader from "@/components/common/Preloader";
import VisionDynamic from "@/components/about/VisionDynamic";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Vision || Edunoble - Sample Papers for Class 8th, 9th, 10th, 11th and 12th",
  description:
    "Learn more about Edunoble's vision - a leading educational platform providing high-quality sample papers and study materials for students across various boards.",
};

export default function VisionPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ marginTop: "60px" }}>
        <VisionDynamic />
        <FooterOne />
      </div>
    </div>
  );
}
