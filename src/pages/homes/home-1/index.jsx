// import HomeOne from "@/components/homes/home";
import Header from "@/components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";
import React, { useEffect } from "react";
import { useHomepageData } from "@/hooks/useHomepageData";

import HomeHero from "@/components/homes/heros/HomeHero";

import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/categories/Categories";
import CoursesOffered from "@/components/homes/courses/CoursesOffered";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import WhyCourse from "@/components/homes/WhyCourse";
import Instructors from "@/components/common/Instructors";
import GetApp from "@/components/homes/getApp/GetApp";
import Blog from "@/components/homes/blogs/Blog";
import Join from "@/components/homes/join/Join";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Edunoble - Sample Papers for Class 8, 9, 10, 11 & 12 | Free Practice Papers",
  description:
    "Access free sample papers for Class 8, 9, 10, 11, and 12 students. Practice with CBSE, ICSE, and State Board sample papers to excel in your board exams. Secure online viewing environment.",
};

export default function HomePage1() {
  const { homepageData, loading, error } = useHomepageData();
  // Logo is managed locally (white-text version) — not overridden from CMS
  // const { setAppLogo } = useContextElement();
  // useEffect(() => {
  //   if (homepageData?.hero?.logo) {
  //     setAppLogo(homepageData.hero.logo);
  //   }
  // }, [homepageData, setAppLogo]);

  // Show error state if API fails
  if (error) {
    return (
      <>
        <Preloader />
        <MetaComponent meta={metadata} />
        <Header />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <section className="layout-pt-lg layout-pb-lg">
            <div className="container">
              <div className="row justify-center">
                <div className="col-12 text-center py-100">
                  <div className="text-24 fw-700 text-dark-1 mb-20">
                    Unable to Load Homepage
                  </div>
                  <div className="text-16 text-red-1 mb-30">
                    {error}
                  </div>
                  <div className="text-14 text-light-1">
                    Please refresh the page or try again later. If the problem persists, please contact support.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FooterOne />
        </div>
      </>
    );
  }

  // Don't render content until data is loaded
  if (loading || !homepageData) {
    return (
      <>
        <Preloader />
        <MetaComponent meta={metadata} />
        <Header />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <section className="layout-pt-lg layout-pb-lg">
            <div className="container">
              <div className="row justify-center">
                <div className="col-12 text-center py-100">
                  <div className="text-16 text-dark-1">Loading homepage...</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <HomeHero heroData={homepageData.hero} />
        {/* <Brands /> */}
        {/* <Categories
          heading={homepageData.mostViewedPapers?.heading}
          description={homepageData.mostViewedPapers?.description}
        /> */}
        <CoursesOffered
          heading={homepageData.featuredPapers?.heading}
          description={homepageData.featuredPapers?.description}
        />
        <TestimonialsOne 
          heading={homepageData.studentsSay?.heading}
          description={homepageData.studentsSay?.description}
          statistics={homepageData.statistics}
        />
        <FeaturesOne featuresData={homepageData.features} />
        <WhyCourse processData={homepageData.process} />
        {/* <Instructors /> */}
        {/* <GetApp /> */}
        {/* <Blog /> */}
        {/* <Join /> */}
        <FooterOne />
      </div>
    </>
  );
}
