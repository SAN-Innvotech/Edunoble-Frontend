import React from "react";
import { steps } from "../../data/steps";

// Original icons for the 3 steps
const stepIcons = [
  "icon-online-learning-4 text-64 text-green-1",
  "icon-graduation-1 text-64 text-green-1",
  "icon-working-at-home-2 text-64 text-green-1",
];

export default function WhyCourse({ processData }) {
  const stepsList = processData?.steps || steps;
  const heading = processData?.heading || "Why prepare with Edunoble sample papers?";
  const subtitle = processData?.subtitle || "See how our simple three-step flow helps Class 10-12 students get exam-ready with realistic, secure online practice.";

  return (
    <section className="layout-pt-lg layout-pb-lg bg-dark-2">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2
                className="sectionTitle__title text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                {heading}
              </h2>

              <p
                className="sectionTitle__text text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {stepsList.map((elm, i) => (
            <div
              key={elm._id || elm.id || i}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-duration={(i + 1) * 400}
            >
              <div className="stepCard -type-1 -stepCard-hover">
                <div className="stepCard__content">
                  <div className="stepCard__icon">
                    <i className={stepIcons[i] || stepIcons[0]}></i>
                  </div>
                  <h4 className="stepCard__title">
                    {elm.stepNumber ? `${elm.stepNumber}. ${elm.title}` : elm.title}
                  </h4>
                  <p className="stepCard__text">{elm.description || elm.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
