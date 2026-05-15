import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { getApiUrl } from "@/config/api";

// Deterministic color from a string for the cover-image fallback block
function colorFromName(name) {
  const palette = ["#6c3fc5", "#00b894", "#0984e3", "#e17055", "#fdcb6e", "#a29bfe", "#fd79a8", "#00cec9"];
  if (!name) return palette[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </span>
      <span style={{ color: "#ffffff", fontSize: "15px", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchCourse = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(getApiUrl(`courses/${slug}`));
        const result = await response.json();
        if (cancelled) return;
        if (response.ok && result.isSuccess && result.data) {
          setCourse(result.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchCourse();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const metadata = {
    title: course ? `${course.name} | EduNoble` : "Course | EduNoble",
    description:
      course?.description ||
      "Explore this EduNoble coaching program — expert-led learning for Class 8 to 12 students.",
    canonical: `https://www.edunoble.in/courses/${slug}`,
    ogImage: course?.coverImage || "https://www.edunoble.in/og/default.png",
  };

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">

        {loading ? (
          <section
            style={{
              background: "linear-gradient(135deg, #1a1050 0%, #2d1b7e 50%, #1a1050 100%)",
              paddingTop: "120px",
              paddingBottom: "120px",
              textAlign: "center",
            }}
          >
            <div className="container">
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px" }}>Loading course…</p>
            </div>
          </section>
        ) : notFound || !course ? (
          <section
            style={{
              background: "linear-gradient(135deg, #1a1050 0%, #2d1b7e 50%, #1a1050 100%)",
              paddingTop: "120px",
              paddingBottom: "120px",
              textAlign: "center",
            }}
          >
            <div className="container">
              <h1
                style={{
                  color: "#00e5a0",
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Course not found
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", marginBottom: "28px" }}>
                Sorry, we couldn&rsquo;t find the course you were looking for.
              </p>
              <Link to="/courses" className="button -md -green-1 text-dark-1">
                Browse all courses
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Hero banner */}
            <section
              style={{
                background: "linear-gradient(135deg, #1a1050 0%, #2d1b7e 50%, #1a1050 100%)",
                paddingTop: "120px",
                paddingBottom: "60px",
              }}
            >
              <div className="container">
                <Link
                  to="/courses"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  &larr; All Courses
                </Link>

                <h1
                  style={{
                    color: "#00e5a0",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    marginBottom: "8px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {course.name}
                </h1>

                {course.description ? (
                  <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "16px", maxWidth: "640px", marginBottom: "28px" }}>
                    {course.description}
                  </p>
                ) : null}

                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "32px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <MetaItem label="Class" value={course.classLevel} />
                  <MetaItem label="Subject" value={course.subject} />
                  <MetaItem label="Mode" value={course.mode} />
                  <MetaItem label="Duration" value={course.duration} />
                  <MetaItem label="Fees" value={course.feeRange} />
                </div>
              </div>
            </section>

            {/* Content — white background */}
            <section style={{ background: "#ffffff", padding: "60px 0 80px" }}>
              <div className="container">
                <div className="row y-gap-40">
                  {/* Main column */}
                  <div className="col-lg-8">
                    {/* Cover image */}
                    {course.coverImage ? (
                      <img
                        src={course.coverImage}
                        alt={`${course.name} - EduNoble course`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        style={{
                          width: "100%",
                          maxHeight: "380px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          marginBottom: "36px",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        style={{
                          width: "100%",
                          height: "240px",
                          background: colorFromName(course.subject || course.name),
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "72px",
                          borderRadius: "16px",
                          marginBottom: "36px",
                        }}
                      >
                        {(course.subject || course.name || "?").trim().charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Long description (HTML) */}
                    {course.longDescription ? (
                      <div
                        style={{ color: "#444", fontSize: "16px", lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: course.longDescription }}
                      />
                    ) : null}

                    {/* Highlights checklist */}
                    {Array.isArray(course.highlights) && course.highlights.length > 0 ? (
                      <div style={{ marginTop: "40px" }}>
                        <h2 style={{ color: "#1a1050", fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
                          Course Highlights
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                          {course.highlights.map((item, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                              <span
                                aria-hidden="true"
                                style={{
                                  flexShrink: 0,
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  background: "rgba(0,184,148,0.14)",
                                  color: "#00966f",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "13px",
                                  fontWeight: 700,
                                  marginTop: "1px",
                                }}
                              >
                                ✓
                              </span>
                              <span style={{ color: "#444", fontSize: "15px", lineHeight: 1.6 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {/* Sidebar — enroll CTA */}
                  <div className="col-lg-4">
                    <div
                      style={{
                        background: "linear-gradient(135deg, #1a1050 0%, #2d1b7e 100%)",
                        borderRadius: "16px",
                        padding: "36px 32px",
                        position: "sticky",
                        top: "100px",
                        textAlign: "center",
                      }}
                    >
                      <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                        Ready to get started?
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", lineHeight: 1.7, marginBottom: "8px" }}>
                        Speak with our team and find the right plan for you.
                      </p>
                      {course.feeRange ? (
                        <p style={{ color: "#00e5a0", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>
                          {course.feeRange}
                        </p>
                      ) : (
                        <div style={{ height: "12px" }} />
                      )}
                      <Link
                        to="/contact"
                        className="button -md -green-1 text-dark-1"
                        style={{ width: "100%" }}
                      >
                        {course.enrollCtaText || "Book a Free Demo"}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Back link */}
                <div style={{ marginTop: "48px" }}>
                  <Link
                    to="/courses"
                    style={{ color: "#6c3fc5", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
                  >
                    &larr; All Courses
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        <FooterOne />
      </div>
    </div>
  );
}
