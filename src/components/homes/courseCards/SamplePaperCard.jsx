import React, { useState } from "react";
import { Chip } from "@mui/material";
import SecureDocumentViewer from "../../common/SecureDocumentViewer";
import { createPortal } from "react-dom";
import { getApiUrl } from "@/config/api";

export default function SamplePaperCard({ paper }) {
  const [showViewer, setShowViewer] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    number: "",
    grade: paper?.class || "",
    subject: paper?.subject || "",
  });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState(null);

  // Increment view count in the background
  const incrementViewCount = async () => {
    if (!paper._id) return;

    try {
      await fetch(getApiUrl(`papers/${paper._id}/view`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Silently handle success - no need to show anything to user
    } catch (error) {
      // Silently handle error - don't interrupt user experience
      console.error("Error incrementing view count:", error);
    }
  };

  const handleViewPaper = (e) => {
    e.preventDefault();
    try {
      const isSaved = localStorage.getItem("isLeadSaved") === "true";
      if (isSaved) {
        setShowViewer(true);
        // Call API in background (non-blocking)
        incrementViewCount();
      } else {
        setShowLeadModal(true);
      }
    } catch (err) {
      // If any error reading localStorage, fallback to showing modal
      setShowLeadModal(true);
    }
  };

  const submitLead = async (e) => {
    e && e.preventDefault();
    setLeadLoading(true);
    setLeadError(null);
    try {
      const body = {
        name: leadForm.name,
        number: leadForm.number,
        grade: leadForm.grade,
        subject: leadForm.subject,
      };

      const res = await fetch(getApiUrl("leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Failed to submit lead: ${res.status}`);
      }

      // Mark as saved and proceed to viewer
      localStorage.setItem("isLeadSaved", "true");
      setShowLeadModal(false);
      setShowViewer(true);
      incrementViewCount();
    } catch (err) {
      console.error("Error submitting lead:", err);
      setLeadError(err.message || "Failed to submit lead");
    } finally {
      setLeadLoading(false);
    }
  };

  const handleAlreadySubmitted = () => {
    try {
      localStorage.setItem("isLeadSaved", "true");
    } catch (err) {
      console.error("Error setting lead flag:", err);
    }
    setShowLeadModal(false);
    setShowViewer(true);
    incrementViewCount();
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
  };

  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div>
          <div className="coursesCard -type-1 bg-white samplePaperCard">
            <div className="relative">
              <div className="coursesCard__image overflow-hidden rounded-8 d-flex align-items-center justify-center bg-light-4">
                <div className="w-1/1 d-flex items-center justify-center py-40">
                  <div className="size-60 rounded-full bg-purple-1 d-flex items-center justify-center">
                    <span className="text-white fw-600 text-16">DOC</span>
                  </div>
                </div>
                <div className="coursesCard__image_overlay rounded-8"></div>
              </div>
            </div>

            <div className="h-100 pt-15">
              <div className="text-15 lh-1 text-dark-1 mb-5">
                Class {paper.class} • {paper.subject}
              </div>

              <div className="text-17 lh-15 fw-500 text-dark-1 mt-5">
                {paper.title}
              </div>

              <div className="mt-10 text-13 text-light-1">
                {paper.board && <span>{paper.board}</span>}
                {paper.board && paper.examType && <span> • </span>}
                {paper.examType && <span>{paper.examType}</span>}
                {(paper.board || paper.examType) && <span> • </span>}
                <span>{paper.year}</span>
              </div>

              {paper.description && (
                <div
                  className="mt-10 text-13 text-light-1"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {paper.description}
                </div>
              )}

              {paper.tags && paper.tags.length > 0 && (
                <div className="mt-10 d-flex flex-wrap x-gap-5 y-gap-5">
                  {paper.tags.slice(0, 3).map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      sx={{
                        fontSize: "11px",
                        borderRadius: "999px",
                        marginRight: "5px",
                        bgcolor: "rgba(148, 163, 184, 0.12)",
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="mt-15">
                <button
                  onClick={handleViewPaper}
                  className="button -sm -outline-purple-1 text-purple-1 w-100 text-center"
                  style={{
                    border: "1px solid #6366f1",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#6366f1";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#6366f1";
                  }}
                >
                  View Sample Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showViewer &&
        createPortal(
          <SecureDocumentViewer
            fileUrl={paper.fileUrl}
            onClose={handleCloseViewer}
            title={paper.title}
          />,
          document.body
        )}

      {showLeadModal &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000,
              padding: 20,
            }}
            onClick={() => setShowLeadModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90%",
                maxWidth: 500,
                background: "#fff",
                borderRadius: 8,
                padding: 30,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            >
              <h3 className="text-24 fw-600 mb-20">
                Quick access - submit details
              </h3>
              <p className="text-16 lh-1_6 text-light-1 mb-30">
                Please share a few details to view the sample paper.
              </p>

              <form className="row y-gap-20">
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10 mr-10">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={leadForm.name}
                    onChange={(e) =>
                      setLeadForm({ ...leadForm, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10 mr-10">
                    Phone
                  </label>
                  <input
                    required
                    type="text"
                    name="number"
                    placeholder="Phone..."
                    value={leadForm.number}
                    onChange={(e) =>
                      setLeadForm({ ...leadForm, number: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    placeholder="Grade..."
                    value={leadForm.grade}
                    onChange={(e) =>
                      setLeadForm({ ...leadForm, grade: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject..."
                    value={leadForm.subject}
                    onChange={(e) =>
                      setLeadForm({ ...leadForm, subject: e.target.value })
                    }
                  />
                </div>

                {leadError && (
                  <div className="col-12 text-13 text-red-1">{leadError}</div>
                )}

                <div className="col-12 d-flex x-gap-10 pt-10">
                  <button
                    type="submit"
                    className="button -md -purple-1 text-white"
                    style={{ flex: 1 }}
                    disabled={leadLoading}
                    onClick={submitLead}
                  >
                    {leadLoading ? "Saving..." : "Submit & View"}
                  </button>

                  <button
                    type="button"
                    className="button -md -outline-dark text-dark-1"
                    style={{ flex: 1 }}
                    onClick={handleAlreadySubmitted}
                  >
                    Already submitted
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}


