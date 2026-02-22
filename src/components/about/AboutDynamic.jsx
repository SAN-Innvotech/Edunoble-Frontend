import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApiUrl } from "@/config/api";

// Converts ALL CAPS CMS titles to Title Case, preserving brand name casing
const toTitleCase = (str) => {
  if (!str) return str;
  const titled = str.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  return titled.replace(/Edunoble/gi, "EduNoble");
};

// Six education photos — 3 unique images per section
const MOSAIC = [
  "/assets/img/about-custom/1.jpg",
  "/assets/img/about-custom/2.jpg",
  "/assets/img/about-custom/3.jpg",
  "/assets/img/about-custom/4.jpg",
  "/assets/img/about-custom/5.jpg",
  "/assets/img/about-custom/6.jpg",
];

export default function AboutDynamic() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(getApiUrl("content-pages/about"));
        if (!response.ok) throw new Error(`Failed to fetch about content: ${response.status}`);
        const result = await response.json();
        if (result.isSuccess && result.data) {
          const filteredContent = result.data
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setContent(filteredContent);
        } else {
          throw new Error(result.message || "Failed to fetch about content");
        }
      } catch (err) {
        console.error("Error fetching about content:", err);
        setError(err.message);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  if (loading) {
    return (
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="text-center">
            <div className="text-16 text-dark-1">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="text-center">
            <div className="text-16 text-red-1">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "#ffffff", padding: "80px 0 100px" }}>
      <div className="container">
        {content.map((item, index) => {
          const isLast = index === content.length - 1;
          const isImageLeft = index % 2 === 0;

          // Each section gets its own unique block of 3 images
          const mainImg   = item.pictureUrl || MOSAIC[(index * 3) % MOSAIC.length];
          const topImg    = MOSAIC[(index * 3 + 1) % MOSAIC.length];
          const bottomImg = MOSAIC[(index * 3 + 2) % MOSAIC.length];

          return (
            <div key={item._id} style={{ marginBottom: isLast ? 0 : "90px" }}>
              <div className="row y-gap-50 items-center">

                {/* ── Image mosaic ── */}
                <div className={`col-lg-6${!isImageLeft ? " order-lg-2" : ""}`}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridTemplateRows: "210px 210px",
                      gap: "14px",
                    }}
                  >
                    {/* Large image — spans both rows on the left column */}
                    <img
                      src={mainImg}
                      alt={item.title}
                      style={{
                        gridColumn: "1",
                        gridRow: "1 / 3",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                    {/* Top-right smaller */}
                    <img
                      src={topImg}
                      alt=""
                      style={{
                        gridColumn: "2",
                        gridRow: "1",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                    {/* Bottom-right smaller */}
                    <img
                      src={bottomImg}
                      alt=""
                      style={{
                        gridColumn: "2",
                        gridRow: "2",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                </div>

                {/* ── Text content ── */}
                <div className={`col-lg-6${!isImageLeft ? " order-lg-1" : ""}`}>
                  <div style={{ paddingLeft: isImageLeft ? "48px" : "0", paddingRight: !isImageLeft ? "48px" : "0" }}>

                    <h2
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                        fontWeight: 700,
                        color: "#1a1050",
                        marginBottom: "20px",
                        lineHeight: 1.35,
                      }}
                    >
                      {toTitleCase(item.title)}
                    </h2>

                    <div
                      style={{ color: "#666", fontSize: "16px", lineHeight: "1.85" }}
                      dangerouslySetInnerHTML={{ __html: item.content || "" }}
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
