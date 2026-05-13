import React, { useEffect, useState } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getApiUrl } from "@/config/api";

export default function FaqsSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl("contact/faq"))
      .then((r) => r.json())
      .then((res) => {
        if (res?.isSuccess && Array.isArray(res.data)) {
          const active = res.data
            .filter((f) => f.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setFaqs(active);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Inject FAQPage JSON-LD when FAQs are loaded
  useEffect(() => {
    if (!faqs.length) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "homepage-faq-jsonld";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("homepage-faq-jsonld")?.remove();
    };
  }, [faqs]);

  if (loading || !faqs.length) return null;

  return (
    <section className="layout-pt-lg layout-pb-lg" id="faqs">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-8 col-lg-9 col-md-11">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                Frequently Asked Questions
              </h2>
              <p className="sectionTitle__text mt-10">
                Everything you wanted to know about EduNoble
              </p>
            </div>

            <div className="accordion -block text-left pt-60 lg:pt-40 js-accordion">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={faq._id || i}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`accordion__item ${isOpen ? "is-active" : ""}`}
                  >
                    <div
                      className="accordion__button"
                      role="button"
                      aria-expanded={isOpen}
                    >
                      <div className="accordion__icon">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="icon"
                          data-feather="plus"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="icon"
                          data-feather="minus"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </div>
                      </div>
                      <span className="text-17 fw-500 text-dark-1">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      style={isOpen ? { maxHeight: "500px" } : {}}
                      className="accordion__content"
                    >
                      <div className="accordion__content__inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
