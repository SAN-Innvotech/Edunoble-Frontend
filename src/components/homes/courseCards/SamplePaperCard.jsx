import React, { useState } from "react";
import { Chip } from "@mui/material";
import SecureDocumentViewer from "../../common/SecureDocumentViewer";

export default function SamplePaperCard({ paper }) {
  const [showViewer, setShowViewer] = useState(false);

  const handleViewPaper = (e) => {
    e.preventDefault();
    setShowViewer(true);
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
                >
                  View Sample Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showViewer && (
        <SecureDocumentViewer
          fileUrl={paper.fileUrl}
          onClose={handleCloseViewer}
          title={paper.title}
        />
      )}
    </>
  );
}


