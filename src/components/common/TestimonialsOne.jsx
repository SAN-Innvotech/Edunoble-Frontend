import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// import 'swiper/swiper.min.css';
import { counters as defaultCounters } from "../../data/count";
import { getApiUrl } from "@/config/api";
// SwiperCore.use([Pagination]);

// Generate a consistent color from a name for avatar fallback
function colorFromName(name) {
  const palette = ["#6c3fc5", "#00b894", "#0984e3", "#e17055", "#fdcb6e", "#a29bfe", "#fd79a8", "#00cec9"];
  if (!name) return palette[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

// Inline default avatar — colored circle with the student's initial
function DefaultAvatar({ name, size = 64 }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colorFromName(name),
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.round(size * 0.42),
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

// Star row — gold filled, gray unfilled, up to 5
function Stars({ count }) {
  const filled = Math.max(0, Math.min(5, Math.round(count || 0)));
  if (!filled) return null;
  return (
    <div
      role="img"
      aria-label={`${filled} out of 5 stars`}
      style={{ display: "inline-flex", gap: "2px", lineHeight: 1, fontSize: "16px" }}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= filled ? "#FFC107" : "#E0E0E0" }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsOne({ heading, description, statistics }) {
  const [showSlider, setShowSlider] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayCounters = statistics || defaultCounters;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("testimonials"));

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }

        const result = await response.json();

        if (result.isSuccess && result.data) {
          // Filter active testimonials, sort by order, and map to component format
          const mappedTestimonials = result.data
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item) => ({
              id: item._id,
              name: item.authorName,
              position: item.authorDetails,
              comment: item.heading,
              description: item.quote,
              photoUrl: item.photoUrl || null,
              rating: typeof item.rating === "number" ? item.rating : null,
            }));
          setTestimonials(mappedTestimonials);
        } else {
          throw new Error(result.message || "Failed to fetch testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
        setShowSlider(true);
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <section className="layout-pt-lg mt-80 layout-pb-lg bg-purple-1">
      <div className="container ">
        <div className="row justify-center text-center">
          <div className="col-auto">
              <div className="sectionTitle ">
                <h2 className="sectionTitle__title text-green-1">
                  {heading || "What Students & Teachers Say"}
                </h2>

                <p className="sectionTitle__text text-white">
                  {description || "Hear how Edunoble sample papers are helping Classes 10, 11 and 12 prepare smarter for board exams."}
                </p>
              </div>
          </div>
        </div>

        <div className="js-section-slider pt-50">
          {showSlider && !loading && testimonials.length > 0 && (
            <Swiper
              className="overflow-visible"
              // {...setting}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".icon-arrow-right",
                prevEl: ".icon-arrow-left",
              }}
              loop={testimonials.length > 1}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 576px
                450: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  // when window width is >= 992px
                  slidesPerView: 3,
                },
              }}
            >
              {testimonials.map((elm, i) => (
                <SwiperSlide key={elm.id} className="swiper-slide">
                  <div
                    className="testimonials -type-1"
                    data-aos="fade-left"
                    data-aos-duration={(i + 1) * 550}
                  >
                    <div className="testimonials__content">
                      {elm.rating ? (
                        <div style={{ marginBottom: "12px" }}>
                          <Stars count={elm.rating} />
                        </div>
                      ) : null}
                      <h4 className="testimonials__title">{elm.comment}</h4>
                      <p className="testimonials__text">
                        {`"${elm.description}"`}
                      </p>

                      <div className="testimonials-footer" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div className="testimonials-footer__image" style={{ flexShrink: 0 }}>
                          {elm.photoUrl ? (
                            <img
                              src={elm.photoUrl}
                              alt={`${elm.name} - EduNoble student`}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.nextSibling) {
                                  e.currentTarget.nextSibling.style.display = "flex";
                                }
                              }}
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          ) : null}
                          {elm.photoUrl ? (
                            <div style={{ display: "none" }}>
                              <DefaultAvatar name={elm.name} size={64} />
                            </div>
                          ) : (
                            <DefaultAvatar name={elm.name} size={64} />
                          )}
                        </div>

                        <div className="testimonials-footer__content">
                          <div className="testimonials-footer__title">
                            {elm.name}
                          </div>
                          <div className="testimonials-footer__text">
                            {elm.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="d-flex x-gap-20 items-center justify-end pt-60 lg:pt-40">
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-prev">
                <i className="icon icon-arrow-left text-24"></i>
              </button>
            </div>
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-next">
                <i className="icon icon-arrow-right text-24"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 counter__row justify-center">
          {displayCounters
            .filter((elm) => !(elm.label || elm.title || "").toLowerCase().includes("classes covered"))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((elm, i) => (
            <div
              key={elm._id || elm.id || i}
              className="col-lg-4 col-sm-4"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 350}
            >
              <div className="counter -type-1">
                <div className="counter__number">{elm.number}</div>
                <div className="counter__title">{elm.label || elm.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
