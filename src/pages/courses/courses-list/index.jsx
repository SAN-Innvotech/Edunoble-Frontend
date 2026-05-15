import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { getApiUrl } from "@/config/api";

const metadata = {
  title: "Courses & Programs | EduNoble",
  description:
    "Explore EduNoble's offline & online coaching programs for Class 8 to 12 — expert-led courses across subjects with flexible modes, durations and transparent fees.",
  canonical: "https://www.edunoble.in/courses",
  ogImage: "https://www.edunoble.in/og/default.png",
};

// Deterministic color from a string for the cover-image fallback block
function colorFromName(name) {
  const palette = ["#6c3fc5", "#00b894", "#0984e3", "#e17055", "#fdcb6e", "#a29bfe", "#fd79a8", "#00cec9"];
  if (!name) return palette[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function CoverFallback({ label }) {
  const initial = (label || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "180px",
        background: colorFromName(label),
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "64px",
      }}
    >
      {initial}
    </div>
  );
}

function MetaPill({ children, accent }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: accent ? "rgba(0,184,148,0.12)" : "#f0f0f6",
        color: accent ? "#00966f" : "#6c3fc5",
        fontSize: "12px",
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: "20px",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

function CourseCard({ course, index }) {
  const slug = course.slug || course._id;
  return (
    <Link
      to={`/courses/${slug}`}
      data-aos="fade-up"
      data-aos-duration={(index % 6 + 1) * 150}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: "1px solid #e8e8f0",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        textDecoration: "none",
        color: "inherit",
        height: "100%",
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
      {/* Cover image (or fallback colored block) */}
      {course.coverImage ? (
        <img
          src={course.coverImage}
          alt={`${course.name} - EduNoble course`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.nextSibling) {
              e.currentTarget.nextSibling.style.display = "flex";
            }
          }}
          style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
        />
      ) : null}
      {course.coverImage ? (
        <div style={{ display: "none" }}>
          <CoverFallback label={course.subject || course.name} />
        </div>
      ) : (
        <CoverFallback label={course.subject || course.name} />
      )}

      {/* Body */}
      <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
        {/* Meta pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {course.classLevel ? <MetaPill>{course.classLevel}</MetaPill> : null}
          {course.subject ? <MetaPill>{course.subject}</MetaPill> : null}
          {course.mode ? <MetaPill accent>{course.mode}</MetaPill> : null}
        </div>

        {/* Name */}
        <h3 style={{ color: "#1a1050", fontSize: "19px", fontWeight: 700, margin: 0, lineHeight: 1.35 }}>
          {course.name}
        </h3>

        {/* Duration + fee */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", color: "#777", fontSize: "13px", fontWeight: 500 }}>
          {course.duration ? <span>⏱ {course.duration}</span> : null}
          {course.feeRange ? <span style={{ color: "#00966f", fontWeight: 600 }}>💰 {course.feeRange}</span> : null}
        </div>

        {/* Short description */}
        {course.description ? (
          <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
            {course.description}
          </p>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}

        {/* CTA */}
        <span
          className="button -md -green-1 text-dark-1"
          style={{ width: "100%", marginTop: "8px", textAlign: "center" }}
        >
          {course.enrollCtaText || "View Course"}
        </span>
      </div>
    </Link>
  );
}

export default function CoursesListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(getApiUrl("courses"));
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.isSuccess && Array.isArray(result.data)) {
          setCourses(result.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
              Our Courses & Programs
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Offline & online coaching for Class 8&ndash;12 — expert-led programs designed to help every student excel.
            </p>
          </div>
        </section>

        {/* Courses grid — white background */}
        <section style={{ background: "#ffffff", padding: "80px 0 100px" }}>
          <div className="container">
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                Loading courses…
              </div>
            ) : courses.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                <p style={{ fontSize: "17px", margin: 0 }}>No courses available right now.</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>Please check back soon — new programs are added regularly.</p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "32px",
                }}
              >
                {courses.map((course, i) => (
                  <CourseCard key={course._id || course.slug || i} course={course} index={i} />
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
