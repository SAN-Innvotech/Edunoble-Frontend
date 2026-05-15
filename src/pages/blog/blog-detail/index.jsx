import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { getApiUrl } from "@/config/api";

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
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const backLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "#6c3fc5",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchBlog = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(getApiUrl(`blogs/${slug}`));
        const result = await response.json();
        if (cancelled) return;
        if (response.ok && result.isSuccess && result.data) {
          setBlog(result.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchBlog();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const metadata = {
    title: blog?.title ? `${blog.title} | EduNoble` : "Blog | EduNoble",
    description:
      blog?.excerpt ||
      "Study tips, exam strategies and career guidance from EduNoble.",
    canonical: `https://www.edunoble.in/blog/${slug}`,
    ogImage: blog?.coverImage || "https://www.edunoble.in/og/default.png",
  };

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
            {blog ? (
              <>
                {blog.category ? (
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(0,229,160,0.15)",
                      color: "#00e5a0",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "5px 14px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "16px",
                    }}
                  >
                    {blog.category}
                  </span>
                ) : null}
                <h1
                  style={{
                    color: "#00e5a0",
                    fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)",
                    fontWeight: 700,
                    marginBottom: "16px",
                    letterSpacing: "-0.5px",
                    maxWidth: "780px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {blog.title}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", margin: 0 }}>
                  {blog.author ? <span>By {blog.author}</span> : null}
                  {blog.author && blog.publishedAt ? <span>  •  </span> : null}
                  {blog.publishedAt ? <span>{formatDate(blog.publishedAt)}</span> : null}
                </p>
              </>
            ) : (
              <h1
                style={{
                  color: "#00e5a0",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                EduNoble Blog
              </h1>
            )}
          </div>
        </section>

        {/* Article body — white background */}
        <section style={{ background: "#ffffff", padding: "60px 0 100px" }}>
          <div className="container">
            <div style={{ maxWidth: "780px", margin: "0 auto" }}>
              {/* Back link */}
              <Link to="/blog" style={{ ...backLinkStyle, marginBottom: "32px" }}>
                ← Back to Blog
              </Link>

              {loading ? (
                <div style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
                  Loading article…
                </div>
              ) : notFound || !blog ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <h2 style={{ color: "#1a1050", fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>
                    Article not found
                  </h2>
                  <p style={{ color: "#888", fontSize: "15px", marginBottom: "20px" }}>
                    The article you are looking for doesn’t exist or may have been moved.
                  </p>
                  <Link to="/blog" style={backLinkStyle}>
                    ← Back to Blog
                  </Link>
                </div>
              ) : (
                <article>
                  {/* Cover image (fallback to colored block) */}
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title || "Blog cover"}
                      style={{
                        width: "100%",
                        maxHeight: 420,
                        objectFit: "cover",
                        borderRadius: "16px",
                        display: "block",
                        marginTop: "24px",
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        width: "100%",
                        height: 280,
                        background: colorFromString(blog.title || blog.slug),
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: "56px",
                        fontWeight: 700,
                        marginTop: "24px",
                      }}
                    >
                      {(blog.title || "?").trim().charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Content as HTML */}
                  <div
                    style={{
                      color: "#333",
                      fontSize: "16px",
                      lineHeight: 1.85,
                      marginTop: "36px",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                  />

                  {/* Tags */}
                  {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "40px" }}>
                      {blog.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: "rgba(108,63,197,0.1)",
                            color: "#6c3fc5",
                            fontSize: "13px",
                            fontWeight: 500,
                            padding: "4px 12px",
                            borderRadius: "999px",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Bottom back link */}
                  <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #eee" }}>
                    <Link to="/blog" style={backLinkStyle}>
                      ← Back to Blog
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <FooterOne />
      </div>
    </div>
  );
}
