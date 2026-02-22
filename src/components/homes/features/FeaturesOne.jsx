import React from "react";

import { Link } from "react-router-dom";
import { featureOne } from "../../../data/features";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function LearnNewSkill({ featuresData }) {
  const featureList = featuresData?.featureList || featureOne;
  const heading = featuresData?.heading || "Practice smarter for board exams with Edunoble.";
  const description = featuresData?.description || "Use the list below to see how our secure online sample papers help Class 8, 9, 10, 11 and 12 students prepare with confidence.";
  const ctaButtonText = featuresData?.ctaButtonText || "Browse Resources";
  const imageUrl = featuresData?.imageUrl;

  return (
    <section className="layout-pt-lg layout-pb-lg bg-beige-1">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content">
              <h2
                className="about-content__title customSized"
                data-aos="fade-up"
              >
                {heading.split(" ").map((word, i) => 
                  word.toLowerCase() === "practice" ? (
                    <span key={i}>{word} </span>
                  ) : (
                    <React.Fragment key={i}>{word}{i < heading.split(" ").length - 1 ? " " : ""}</React.Fragment>
                  )
                )}
              </h2>
              <p className="about-content__text" data-aos="fade-up">
                {description}
              </p>
              <div className="y-gap-20 pt-30">
                {featureList.map((elm, i) => (
                  <div
                    key={elm._id || i}
                    className="d-flex items-center"
                    data-aos="fade-up"
                  >
                    <div className="about-content-list__icon">
                      <span
                        className="text-white"
                        style={{
                          fontSize: "10px",
                          fontWeight: "300",
                        }}
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </div>
                    <div className="about-content-list__title">{elm.text || elm.title}</div>
                  </div>
                ))}
              </div>

              <div className="d-inline-block mt-30">
                <Link
                  to="/resources"
                  className="button -md -purple-1 text-white"
                >
                  {ctaButtonText}
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
          >
            <div className="about-image">
              <img
                style={{ height: "100%", width: "100%" }}
                src={imageUrl || "/assets/img/about/1.png"}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
