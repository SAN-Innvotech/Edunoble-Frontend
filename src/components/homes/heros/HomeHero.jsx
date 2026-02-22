import gsap from "gsap";
import { Link } from "react-router-dom";
import { ShapeRendering } from "../../../svg/index";
import React, { useEffect } from "react";

const defaultMastheadInfo = [
  {
    id: 1,
    icon: "/assets/img/masthead/icons/1.svg",
    text: "Latest sample papers",
  },
  {
    id: 2,
    icon: "/assets/img/masthead/icons/2.svg",
    text: "CBSE, ICSE & State Boards",
  },
  {
    id: 3,
    icon: "/assets/img/masthead/icons/3.svg",
    text: "Secure, read-only access",
  },
];

const defaultHeroContent = {
  title: "Practice Sample Papers for",
  text_underline: "Class 8, 9, 10, 11 & 12",
  info_hero: (
    <>
      Access high‑quality sample papers for Class 8, 9, 10, 11 and 12 in a secure
      <br /> online environment. No downloads, just focused exam practice.
    </>
  ),
  starts: [
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
  ],
};

const HomeHero = ({ heroData }) => {
  // Build masthead_info from API data or use defaults
  const masthead_info = heroData?.features ? [
    {
      id: 1,
      icon: "/assets/img/masthead/icons/1.svg",
      text: heroData.features.feature1 || defaultMastheadInfo[0].text,
    },
    {
      id: 2,
      icon: "/assets/img/masthead/icons/2.svg",
      text: heroData.features.feature2 || defaultMastheadInfo[1].text,
    },
    {
      id: 3,
      icon: "/assets/img/masthead/icons/3.svg",
      text: heroData.features.feature3 || defaultMastheadInfo[2].text,
    },
  ] : defaultMastheadInfo;

  // Build hero content from API data or use defaults
  const hero_content = heroData ? {
    title: heroData.headline || defaultHeroContent.title,
    text_underline: heroData.subheading || defaultHeroContent.text_underline,
    info_hero: heroData.description ? (
      <>
        {heroData.description.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    ) : defaultHeroContent.info_hero,
    starts: defaultHeroContent.starts,
    samplePaperCount: heroData.samplePaperCount || "1000+",
    studentReview: heroData.studentReview,
    pictureUrl1: heroData.pictureUrl1,
    pictureUrl2: heroData.pictureUrl2,
    pictureUrl3: heroData.pictureUrl3,
  } : defaultHeroContent;

  const { title, text_underline, info_hero, starts, samplePaperCount, studentReview, pictureUrl1, pictureUrl2, pictureUrl3 } = hero_content;
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);

  return (
    <>
      <section className="masthead -type-1 js-mouse-move-container">
        <div className="masthead__bg">
          <img src={"/assets/img/home-1/hero/bg.png"} alt="image" />
        </div>

        <div className="container">
          <div className="row y-gap-30 justify-between items-start">
            <div className="col-xl-6 col-lg-6 col-sm-10">
              <div
                className="masthead__content"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h1 className="masthead__title">
                  {title}{" "}
                  <span className="text-green-1">
                    {text_underline}
                  </span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-duration="100"
                  className="masthead__text"
                >
                  {info_hero}
                </p>
                <div
                  data-aos="fade-up"
                  data-aos-duration="200"
                  className="masthead__buttons row x-gap-10 y-gap-10"
                >
                  <div className="col-12 col-sm-auto">
                    <a
                      href="#courses-section"
                      className="button -md -green-1 text-dark-1"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Explore Courses
                    </a>
                  </div>
                  <div className="col-12 col-sm-auto">
                    <a
                      href="tel:8878868600"
                      className="button -md -outline-green-1 text-green-1"
                    >
                      Career Counseling
                    </a>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="300"
                  className="masthead-info row y-gap-15 sm:d-none"
                >
                  {masthead_info.map((item, i) => (
                    <div
                      key={i}
                      className="masthead-info__item d-flex items-center text-white"
                    >
                      <div className="masthead-info__icon mr-10">
                        <img src={item.icon} alt="icon" />
                      </div>
                      <div className="masthead-info__title lh-1">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="col-xl-6 col-lg-6"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              {/* gridTemplateColumns flipped: small col left, big col right. Gap reduced to shorten right image */}
              <div className="masthead-image" style={{ gridTemplateColumns: "0.4fr 0.6fr", gap: "20px" }}>

                {/* el2 → top LEFT — js-mouse-move on wrapper so image+overlay move together */}
                <div className="masthead-image__el2" style={{ gridColumn: "1", gridRow: "1" }}>
                  <div
                    className="js-mouse-move"
                    data-move="70"
                    style={{ position: "relative", display: "inline-block", lineHeight: 0 }}
                  >
                    <img
                      src={pictureUrl2 || "/assets/img/masthead/2.png"}
                      style={{ objectFit: "cover", display: "block" }}
                      alt="image"
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "rgba(10, 10, 40, 0.65)",
                      backdropFilter: "blur(4px)",
                      color: "#fff", padding: "8px 14px",
                      fontSize: "13px", fontWeight: 500, lineHeight: "1.4",
                      borderRadius: "0 0 6px 6px",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {studentReview?.name || "Concept depth over rote learning"}
                    </div>
                  </div>
                </div>

                {/* el3 → bottom LEFT */}
                <div className="masthead-image__el3" style={{ gridColumn: "1", gridRow: "2" }}>
                  <div
                    className="js-mouse-move"
                    data-move="40"
                    style={{ position: "relative", display: "inline-block", lineHeight: 0 }}
                  >
                    <img
                      src={pictureUrl3 || "/assets/img/masthead/3.png"}
                      style={{ objectFit: "cover", display: "block" }}
                      alt="image"
                    />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "rgba(10, 10, 40, 0.65)",
                      backdropFilter: "blur(4px)",
                      color: "#fff", padding: "8px 14px",
                      fontSize: "13px", fontWeight: 500, lineHeight: "1.4",
                      borderRadius: "0 0 6px 6px",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      Structured preparation systems
                    </div>
                  </div>
                </div>

                {/* el1 → RIGHT column, spans 2 rows */}
                <div
                  className="masthead-image__el1 js-mouse-move"
                  data-move="40"
                  style={{
                    gridColumn: "2", gridRow: "1 / span 2",
                    paddingTop: "0", position: "relative",
                    alignSelf: "stretch",
                  }}
                >
                  <img
                    style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                    src={pictureUrl1 || "/assets/img/masthead/1.png"}
                    alt="image"
                  />
                  <div style={{
                    position: "absolute",
                    top: "auto",
                    left: 0, right: 0, bottom: 0,
                    background: "rgba(10, 10, 40, 0.65)",
                    backdropFilter: "blur(4px)",
                    color: "#fff", padding: "8px 14px",
                    fontSize: "13px", fontWeight: 500,
                    borderRadius: "0 0 6px 6px",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    Integrated career guidance
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* animated shape start */}
        <ShapeRendering />
        {/* animated shape end */}
      </section>
    </>
  );
};

export default HomeHero;
