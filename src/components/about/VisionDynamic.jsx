import React, { useState, useEffect } from "react";
import { getApiUrl } from "@/config/api";

export default function VisionDynamic() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisionContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(getApiUrl("content-pages/vision"));

        if (!response.ok) {
          throw new Error(`Failed to fetch vision content: ${response.status}`);
        }

        const result = await response.json();

        if (result.isSuccess && result.data) {
          // Filter active items and sort by order
          const filteredContent = result.data
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setContent(filteredContent);
        } else {
          throw new Error(result.message || "Failed to fetch vision content");
        }
      } catch (err) {
        console.error("Error fetching vision content:", err);
        setError(err.message);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVisionContent();
  }, []);

  if (loading) {
    return (
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center">
            <div className="col-12 text-center py-50">
              <div className="text-16 text-dark-1">Loading...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center">
            <div className="col-12 text-center py-50">
              <div className="text-16 text-red-1">Error: {error}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row y-gap-60">
          {content.map((item, index) => {
            // Determine if image should be on left or right based on order
            // Even order (0, 2, 4...) = image on left, odd order (1, 3, 5...) = image on right
            const isImageOnLeft = (item.order || index) % 2 === 0;

            if (!item.pictureUrl) {
              // No image: Center title, paragraph below
              return (
                <div key={item._id} className="col-12">
                  <div className="row justify-center">
                    <div className="col-lg-10 col-xl-8">
                      <div className="text-center">
                        <h2 className="text-40 lh-1 fw-700 text-dark-1 mb-20">
                          {item.title}
                        </h2>
                        <p className="text-16 lh-1_6 text-light-1">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Has image: Alternate left/right layout
            return (
              <div key={item._id} className="col-12">
                <div className="row y-gap-30 items-center">
                  {isImageOnLeft ? (
                    <>
                      {/* Image on left */}
                      <div className="col-lg-6">
                        <div className="rounded-8 overflow-hidden">
                          <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="w-100"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      {/* Content on right */}
                      <div className="col-lg-6">
                        <h3 className="text-30 lh-1 fw-600 text-dark-1 mb-15">
                          {item.title}
                        </h3>
                        <p className="text-16 lh-1_6 text-light-1">
                          {item.content}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content on left */}
                      <div className="col-lg-6 order-lg-1">
                        <h3 className="text-30 lh-1 fw-600 text-dark-1 mb-15">
                          {item.title}
                        </h3>
                        <p className="text-16 lh-1_6 text-light-1">
                          {item.content}
                        </p>
                      </div>
                      {/* Image on right */}
                      <div className="col-lg-6 order-lg-2">
                        <div className="rounded-8 overflow-hidden">
                          <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="w-100"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
