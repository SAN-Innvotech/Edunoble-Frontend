import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseListThree from "@/components/courseList/CourseListThree";
import StatsSection from "@/components/common/StatsSection";
import WhyCourse from "@/components/homes/WhyCourse";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import { useHomepageData } from "@/hooks/useHomepageData";

const metadata = {
  title: "Sample Papers | EduNoble - Practice for Class 10, 11 & 12 Board Exams",
  description:
    "Browse and practice with free sample papers for Class 10, 11, and 12 students. CBSE, ICSE, and State Board sample papers available in a secure online viewing environment.",
};

export default function CourseListPage3() {
  const { homepageData } = useHomepageData();

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
              Sample Papers
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Explore sample papers curated for Grade 8th, 9th, 10th, 11th and 12th.
            </p>
          </div>
        </section>

        {/* <PageLinks /> */}
        <CourseListThree />
        <StatsSection statistics={homepageData?.statistics} />
        <WhyCourse processData={homepageData?.process} />
        <FooterOne />
      </div>
    </div>
  );
}
