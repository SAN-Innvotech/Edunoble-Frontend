import React, { useState, useEffect } from "react";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { useHomepageData } from "@/hooks/useHomepageData";
import { getApiUrl } from "@/config/api";

const metadata = {
  title: "Testimonials | EduNoble - What Students & Teachers Say",
  description:
    "Read what students, parents, and teachers say about EduNoble's sample papers. Real experiences from Grade 10, 11 and 12 learners preparing smarter for board exams.",
};

export default function TestimonialsPage() {
  const { homepageData } = useHomepageData();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(getApiUrl("testimonials"));
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.isSuccess && result.data) {
          const mapped = result.data
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item) => ({
              id: item._id,
              name: item.authorName,
              position: item.authorDetails,
              comment: item.heading,
              description: item.quote,
            }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const heading = homepageData?.studentsSay?.heading || "From Confusion to Clarity";
  const description =
    homepageData?.studentsSay?.description ||
    "Parents' and Students' Feedback – Moments shaped by our pursuit of excellence.";

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
              {heading}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              {description}
            </p>
          </div>
        </section>

        {/* Testimonials grid — white background */}
        <section style={{ background: "#ffffff", padding: "80px 0 100px" }}>
          <div className="container">
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                Loading testimonials…
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "32px",
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={t.id}
                    data-aos="fade-up"
                    data-aos-duration={(i + 1) * 150}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e8e8f0",
                      borderRadius: "16px",
                      padding: "36px 32px 32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                      transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(74,48,180,0.12)";
                      e.currentTarget.style.borderColor = "rgba(74,48,180,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
                      e.currentTarget.style.borderColor = "#e8e8f0";
                    }}
                  >
                    {/* Headline */}
                    <h4 style={{ color: "#1a1050", fontSize: "17px", fontWeight: 600, margin: 0 }}>
                      {t.comment}
                    </h4>

                    {/* Quote body */}
                    <p
                      style={{
                        color: "#555",
                        fontSize: "15px",
                        lineHeight: "1.75",
                        margin: 0,
                        flexGrow: 1,
                        fontStyle: "italic",
                      }}
                    >
                      {t.description}
                    </p>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "#eee" }} />

                    {/* Author */}
                    <div>
                      <div style={{ color: "#1a1050", fontWeight: 600, fontSize: "15px" }}>{t.name}</div>
                      <div style={{ color: "#6c3fc5", fontSize: "13px", marginTop: "4px" }}>{t.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <FooterOne />
      </div>
    </div>
  );
}
