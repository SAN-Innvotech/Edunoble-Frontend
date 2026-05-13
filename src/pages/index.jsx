import React from "react";
import Wrapper from "./Wrapper";
import HomePage1 from "./homes/home-1";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "EduNoble - Where Learning Meets Direction Offline & Online academic mastery for ambitious minds",
  description:
    "Empowered with personalized career guidance..",
  canonical: "https://www.edunoble.in/",
  ogImage: "https://www.edunoble.in/og/home.png",
};

export default function index() {
  return (
    <Wrapper>
      <MetaComponent meta={metadata} />
      <HomePage1 />
    </Wrapper>
  );
}
