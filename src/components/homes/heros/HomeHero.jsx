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
          <div className="row y-gap-30 justify-between items-end">
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
                    <Link
                      data-barba
                      to="/papers"
                      className="button -md -outline-green-1 text-green-1"
                    >
                      View Sample Papers
                    </Link>
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
              <div className="masthead-image">
                <div className="masthead-image__el1">
                  <img
                    className="js-mouse-move"
                    data-move="40"
                    style={{ objectFit: "cover" }}
                    src={pictureUrl1 || "/assets/img/masthead/1.png"}
                    alt="image"
                  />
                  <div
                    data-move="30"
                    className="lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                      <img src={"/assets/img/masthead/1.svg"} alt="icon" />
                    </div>
                    <div className="ml-20">
                      <div className="text-orange-1 text-16 fw-500 lh-1">
                        {samplePaperCount || "1000+"}
                      </div>
                      <div className="mt-3">Sample Papers</div>
                    </div>
                  </div>
                </div>

                <div className="masthead-image__el2">
                  <img
                    className="js-mouse-move"
                    data-move="70"
                    src={pictureUrl2 || "/assets/img/masthead/2.png"}
                    style={{ objectFit: "cover" }}
                    alt="image"
                  />
                  <div
                    data-move="60"
                    className="lg:d-none img-el -w-260 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <img src={studentReview?.imageUrl || "/assets/img/masthead/4.png"} alt="student review" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                    <div className="ml-20">
                      <div className="text-dark-1 text-16 fw-500 lh-1">
                        {studentReview?.name || "Ali Tufan"}
                      </div>
                      <div className="mt-3">{studentReview?.class || "Class 12th Student"}</div>
                      <div className="d-flex x-gap-5 mt-3">
                        {starts.map((start, index) => (
                          <div key={index}>
                            <div className={start}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="masthead-image__el3">
                  <img
                    className="js-mouse-move"
                    data-move="40"
                    src={pictureUrl3 || "/assets/img/masthead/3.png"}
                    style={{ objectFit: "cover" }}
                    alt="image"
                  />
                  <div
                    data-move="30"
                    className="shadow-4 img-el -w-260 px-30 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <div className="img-el__side">
                      <div className="size-50 d-flex justify-center items-center bg-purple-1 rounded-full">
                        <img
                          style={{ objectFit: "cover" }}
                          src={"/assets/img/masthead/2.svg"}
                          alt="icon"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="text-purple-1 text-16 fw-500 lh-1">
                        Great!
                      </div>
                      <div className="mt-3">You’re ready to start practicing</div>
                    </div>
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
