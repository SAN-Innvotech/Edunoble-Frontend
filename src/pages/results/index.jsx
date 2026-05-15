import React, { useState, useEffect } from "react";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { getApiUrl } from "@/config/api";

const metadata = {
  title: "Results & Toppers | EduNoble",
  description:
    "Celebrating EduNoble's top scorers and exam toppers. See the results, scores and achievements of students mentored by EduNoble across boards and classes.",
  canonical: "https://www.edunoble.in/results",
  ogImage: "https://www.edunoble.in/og/default.png",
};

// Stats band — static sample numbers
const stats = [
  { value: "2,500+", label: "Students Mentored" },
  { value: "32%", label: "Avg. Improvement" },
  { value: "400+", label: "Top Scorers" },
  { value: "10+", label: "Years of Excellence" },
];

// Deterministic color from name for the fallback avatar
function colorFromName(name) {
  const palette = ["#6c3fc5", "#00b894", "#0984e3", "#e17055", "#fdcb6e", "#a29bfe", "#fd79a8", "#00cec9"];
  if (!name) return palette[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function DefaultAvatar({ name, size = 88 }) {
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

export default function ResultsPage() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const response = await fetch(getApiUrl("toppers"));
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.isSuccess && Array.isArray(result.data)) {
          setToppers(result.data);
        }
      } catch (err) {
        console.error("Error fetching toppers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
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
              Our Results &amp; Toppers
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Hard work, the right guidance and consistency — meet the students who turned their goals into results.
            </p>
          </div>
        </section>

        {/* Stats band */}
        <section style={{ background: "#f6f5fb", padding: "56px 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "24px",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e8e8f0",
                    borderRadius: "16px",
                    padding: "32px 24px",
                    textAlign: "center",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ color: "#6c3fc5", fontSize: "32px", fontWeight: 700, lineHeight: 1.2 }}>
                    {s.value}
                  </div>
                  <div style={{ color: "#555", fontSize: "14px", marginTop: "8px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Toppers grid — white background */}
        <section style={{ background: "#ffffff", padding: "80px 0 100px" }}>
          <div className="container">
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                Loading results…
              </div>
            ) : toppers.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                Results will be published here soon. Please check back.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "32px",
                }}
              >
                {toppers.map((t, i) => (
                  <div
                    key={t._id || i}
                    data-aos="fade-up"
                    data-aos-duration={(i + 1) * 150}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e8e8f0",
                      borderRadius: "16px",
                      padding: "36px 28px 32px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "12px",
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
                    {/* Photo (fallback to colored circle with initial) */}
                    {t.photo ? (
                      <>
                        <img
                          src={t.photo}
                          alt={`${t.studentName} - EduNoble topper`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.nextSibling) {
                              e.currentTarget.nextSibling.style.display = "flex";
                            }
                          }}
                          style={{
                            width: 88,
                            height: 88,
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                            display: "block",
                          }}
                        />
                        <div style={{ display: "none" }}>
                          <DefaultAvatar name={t.studentName} size={88} />
                        </div>
                      </>
                    ) : (
                      <DefaultAvatar name={t.studentName} size={88} />
                    )}

                    {/* Student name */}
                    <h3 style={{ color: "#1a1050", fontSize: "18px", fontWeight: 600, margin: 0 }}>
                      {t.studentName}
                    </h3>

                    {/* Score — large / prominent */}
                    {t.score ? (
                      <div style={{ color: "#00b894", fontSize: "34px", fontWeight: 700, lineHeight: 1.1 }}>
                        {t.score}
                      </div>
                    ) : null}

                    {/* Exam name */}
                    {t.examName ? (
                      <div style={{ color: "#6c3fc5", fontSize: "14px", fontWeight: 600 }}>{t.examName}</div>
                    ) : null}

                    {/* Board + year + class */}
                    {(t.board || t.year || t.classLevel) ? (
                      <div style={{ color: "#888", fontSize: "13px" }}>
                        {[t.classLevel, t.board, t.year].filter(Boolean).join(" • ")}
                      </div>
                    ) : null}

                    {/* Achievement */}
                    {t.achievement ? (
                      <div
                        style={{
                          background: "rgba(0,229,160,0.12)",
                          color: "#00946a",
                          fontSize: "13px",
                          fontWeight: 600,
                          padding: "6px 14px",
                          borderRadius: "999px",
                        }}
                      >
                        {t.achievement}
                      </div>
                    ) : null}

                    {/* Quote (optional) */}
                    {t.quote ? (
                      <p
                        style={{
                          color: "#555",
                          fontSize: "14px",
                          lineHeight: 1.7,
                          fontStyle: "italic",
                          margin: "4px 0 0",
                        }}
                      >
                        “{t.quote}”
                      </p>
                    ) : null}
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
