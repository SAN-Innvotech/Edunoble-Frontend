import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import Terms from "@/components/terms/Terms";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Terms || EduNoble - Empowered with personalized career guidance.",
  description:
    "Where Learning Meets Direction Offline & Online academic mastery for ambitious minds.",
};
export default function TermsPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <Terms />
        <FooterOne />
      </div>
    </div>
  );
}
