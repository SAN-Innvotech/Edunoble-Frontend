import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { getApiUrl } from "@/config/api";

const metadata = {
  title: "Blog | EduNoble",
  description:
    "Study tips, exam strategies and career guidance from EduNoble — practical advice to help students prepare smarter for board exams and beyond.",
  canonical: "https://www.edunoble.in/blog",
  ogImage: "https://www.edunoble.in/og/default.png",
};

// Deterministic color from a string for the cover-image fallback block
function colorFromString(str) {
  const palette = ["#6c3fc5", "#00b894", "#0984e3", "#e17055", "#a29bfe", "#00cec9", "#fd79a8"];
  if (!str) return palette[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(getApiUrl("blogs"));
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        if (result.isSuccess && Array.isArray(result.data)) {
          setBlogs(result.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
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
              EduNoble Blog
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto" }}>
              Study tips, exam strategies and career guidance to help you prepare smarter and reach your goals.
            </p>
          </div>
        </section>

        {/* Blog grid — white background */}
        <section style={{ background: "#ffffff", padding: "80px 0 100px" }}>
          <div className="container">
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                Loading articles…
              </div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                No articles published yet. Please check back soon.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "32px",
                }}
              >
                {blogs.map((blog, i) => (
                  <Link
                    key={blog._id || blog.slug || i}
                    to={`/blog/${blog.slug}`}
                    data-aos="fade-up"
                    data-aos-duration={(i + 1) * 150}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e8e8f0",
                      borderRadius: "16px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                      transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                      textDecoration: "none",
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
                    {/* Cover image (fallback to colored block) */}
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title || "Blog cover"}
                        loading="lazy"
                        style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        style={{
                          width: "100%",
                          height: 200,
                          background: colorFromString(blog.title || blog.slug),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontSize: "40px",
                          fontWeight: 700,
                        }}
                      >
                        {(blog.title || "?").trim().charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                      {/* Category badge */}
                      {blog.category ? (
                        <span
                          style={{
                            alignSelf: "flex-start",
                            background: "rgba(108,63,197,0.1)",
                            color: "#6c3fc5",
                            fontSize: "12px",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: "999px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {blog.category}
                        </span>
                      ) : null}

                      {/* Title */}
                      <h3 style={{ color: "#1a1050", fontSize: "18px", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      {blog.excerpt ? (
                        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
                          {blog.excerpt}
                        </p>
                      ) : null}

                      {/* Author + date */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#888",
                          fontSize: "13px",
                          marginTop: "4px",
                          paddingTop: "12px",
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {blog.author ? <span style={{ color: "#6c3fc5", fontWeight: 600 }}>{blog.author}</span> : null}
                        {blog.author && blog.publishedAt ? <span>•</span> : null}
                        {blog.publishedAt ? <span>{formatDate(blog.publishedAt)}</span> : null}
                      </div>
                    </div>
                  </Link>
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
