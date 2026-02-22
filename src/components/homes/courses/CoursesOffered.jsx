import React, { useState } from "react";

const cbseCourses = [
  // ECONOMICS
  { subject: "Economics", grade: 11, board: "CBSE", title: "CBSE Microeconomics Concept Program" },
  { subject: "Economics", grade: 11, board: "CBSE", title: "Statistics for Economics Mastery" },
  { subject: "Economics", grade: 11, board: "CBSE", title: "Microeconomics Graphs & Application Course" },
  { subject: "Economics", grade: 12, board: "CBSE", title: "CBSE Macroeconomics Clarity Program" },
  { subject: "Economics", grade: 12, board: "CBSE", title: "Indian Economic Development Explained" },
  { subject: "Economics", grade: 12, board: "CBSE", title: "Macroeconomics Numericals & Graphs Lab" },

  // BUSINESS STUDIES
  { subject: "Business Studies", grade: 11, board: "CBSE", title: "Foundations of Business (CBSE Grade 11)" },
  { subject: "Business Studies", grade: 11, board: "CBSE", title: "Understanding Business & Organisation" },
  { subject: "Business Studies", grade: 11, board: "CBSE", title: "Business Concepts to Case Application" },
  { subject: "Business Studies", grade: 12, board: "CBSE", title: "CBSE Principles of Management Mastery" },
  { subject: "Business Studies", grade: 12, board: "CBSE", title: "Marketing & Financial Management Simplified" },
  { subject: "Business Studies", grade: 12, board: "CBSE", title: "Business Studies Case Study Program" },

  // ACCOUNTANCY
  { subject: "Accountancy", grade: 11, board: "CBSE", title: "Accounting Fundamentals Program" },
  { subject: "Accountancy", grade: 11, board: "CBSE", title: "Journal to Final Accounts Mastery" },
  { subject: "Accountancy", grade: 11, board: "CBSE", title: "Depreciation & Financial Statements Course" },
  { subject: "Accountancy", grade: 12, board: "CBSE", title: "Partnership Accounts Mastery" },
  { subject: "Accountancy", grade: 12, board: "CBSE", title: "Company Accounts Simplified" },
  { subject: "Accountancy", grade: 12, board: "CBSE", title: "Cash Flow & Ratio Analysis Program" },

  // MATHEMATICS
  { subject: "Mathematics", grade: 11, board: "CBSE", title: "Applied Mathematics for Commerce" },
  { subject: "Mathematics", grade: 11, board: "CBSE", title: "Statistics & Probability Simplified" },
  { subject: "Mathematics", grade: 11, board: "CBSE", title: "Mathematical Foundations for Business" },
  { subject: "Mathematics", grade: 12, board: "CBSE", title: "Financial Mathematics Mastery" },
  { subject: "Mathematics", grade: 12, board: "CBSE", title: "Business Maths & Data Interpretation" },
  { subject: "Mathematics", grade: 12, board: "CBSE", title: "CBSE Applied Maths Exam Prep" },
];

const icseCourses = [
  // ECONOMICS
  { subject: "Economics", grade: 11, board: "ICSE", title: "ICSE Microeconomics Concept Program" },
  { subject: "Economics", grade: 11, board: "ICSE", title: "Statistics for Economics Mastery" },
  { subject: "Economics", grade: 11, board: "ICSE", title: "Microeconomics Graphs & Application Course" },
  { subject: "Economics", grade: 12, board: "ICSE", title: "ICSE Macroeconomics Clarity Program" },
  { subject: "Economics", grade: 12, board: "ICSE", title: "Indian Economic Development Explained" },
  { subject: "Economics", grade: 12, board: "ICSE", title: "Macroeconomics Numericals & Graphs Lab" },

  // BUSINESS STUDIES
  { subject: "Business Studies", grade: 11, board: "ICSE", title: "Foundations of Business (ICSE Grade 11)" },
  { subject: "Business Studies", grade: 11, board: "ICSE", title: "Understanding Business & Organisation" },
  { subject: "Business Studies", grade: 11, board: "ICSE", title: "Business Concepts to Case Application" },
  { subject: "Business Studies", grade: 12, board: "ICSE", title: "ICSE Principles of Management Mastery" },
  { subject: "Business Studies", grade: 12, board: "ICSE", title: "Marketing & Financial Management Simplified" },
  { subject: "Business Studies", grade: 12, board: "ICSE", title: "Business Studies Case Study Program" },

  // ACCOUNTANCY
  { subject: "Accountancy", grade: 11, board: "ICSE", title: "Accounting Fundamentals Program" },
  { subject: "Accountancy", grade: 11, board: "ICSE", title: "Journal to Final Accounts Mastery" },
  { subject: "Accountancy", grade: 11, board: "ICSE", title: "Depreciation & Financial Statements Course" },
  { subject: "Accountancy", grade: 12, board: "ICSE", title: "Partnership Accounts Mastery" },
  { subject: "Accountancy", grade: 12, board: "ICSE", title: "Company Accounts Simplified" },
  { subject: "Accountancy", grade: 12, board: "ICSE", title: "Cash Flow & Ratio Analysis Program" },

  // MATHEMATICS
  { subject: "Mathematics", grade: 11, board: "ICSE", title: "Applied Mathematics for Commerce" },
  { subject: "Mathematics", grade: 11, board: "ICSE", title: "Statistics & Probability Simplified" },
  { subject: "Mathematics", grade: 11, board: "ICSE", title: "Mathematical Foundations for Business" },
  { subject: "Mathematics", grade: 12, board: "ICSE", title: "Financial Mathematics Mastery" },
  { subject: "Mathematics", grade: 12, board: "ICSE", title: "Business Maths & Data Interpretation" },
  { subject: "Mathematics", grade: 12, board: "ICSE", title: "ICSE Applied Maths Exam Prep" },
];

const coursesData = [...cbseCourses, ...icseCourses];

const boards   = ["All Boards", "CBSE", "ICSE"];
const grades   = ["All Grades", "Grade 11", "Grade 12"];
const subjects = ["All", "Economics", "Business Studies", "Accountancy", "Mathematics"];

const subjectColors = {
  Economics:          { bg: "#6440FB", light: "#f0ebff" },
  "Business Studies": { bg: "#2563EB", light: "#eff6ff" },
  Accountancy:        { bg: "#059669", light: "#ecfdf5" },
  Mathematics:        { bg: "#DC2626", light: "#fef2f2" },
};

const boardColors = {
  CBSE: { bg: "#6440FB", light: "#f0ebff" },
  ICSE: { bg: "#D97706", light: "#fffbeb" },
};

const ITEMS_PER_PAGE = 8;

export default function CoursesOffered({ heading, description }) {
  const [selectedBoard,   setSelectedBoard]   = useState("All Boards");
  const [selectedGrade,   setSelectedGrade]   = useState("All Grades");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [currentPage,     setCurrentPage]     = useState(1);

  const handleBoardChange   = (v) => { setSelectedBoard(v);   setCurrentPage(1); };
  const handleGradeChange   = (v) => { setSelectedGrade(v);   setCurrentPage(1); };
  const handleSubjectChange = (v) => { setSelectedSubject(v); setCurrentPage(1); };

  const filtered = coursesData.filter((course) => {
    const boardMatch   = selectedBoard   === "All Boards" || course.board   === selectedBoard;
    const gradeMatch   = selectedGrade   === "All Grades" || course.grade   === parseInt(selectedGrade.split(" ")[1]);
    const subjectMatch = selectedSubject === "All"        || course.subject === selectedSubject;
    return boardMatch && gradeMatch && subjectMatch;
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">

        {/* Section Title */}
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title sm:text-24">
                {heading || "Courses Offered"}
              </h2>
              <p className="sectionTitle__text">
                {description || "We offer a diverse range of courses designed to meet the unique needs of every student"}
              </p>
            </div>
          </div>
        </div>

        {/* Board Filter Pills */}
        <div className="tabs__controls flex-wrap pt-40 d-flex justify-center x-gap-10 js-tabs-controls">
          {boards.map((board) => (
            <div key={board} onClick={() => handleBoardChange(board)}>
              <button
                className={`tabs__button px-15 py-8 rounded-8 js-tabs-button fw-600 ${selectedBoard === board ? "tabActive" : ""}`}
                type="button"
              >
                {board}
              </button>
            </div>
          ))}
        </div>

        {/* Grade Filter Pills */}
        <div className="tabs__controls flex-wrap pt-15 d-flex justify-center x-gap-10 js-tabs-controls">
          {grades.map((grade) => (
            <div key={grade} onClick={() => handleGradeChange(grade)}>
              <button
                className={`tabs__button px-15 py-8 rounded-8 js-tabs-button fw-600 ${selectedGrade === grade ? "tabActive" : ""}`}
                type="button"
              >
                {grade}
              </button>
            </div>
          ))}
        </div>

        {/* Subject Filter Pills */}
        <div className="tabs__controls flex-wrap pt-15 d-flex justify-center x-gap-10 js-tabs-controls">
          {subjects.map((subject) => (
            <div key={subject} onClick={() => handleSubjectChange(subject)}>
              <button
                className={`tabs__button px-15 py-8 rounded-8 js-tabs-button fw-600 ${selectedSubject === subject ? "tabActive" : ""}`}
                type="button"
              >
                {subject}
              </button>
            </div>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div
          className="row y-gap-30 pt-50"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-duration={600}
        >
          {filtered.length === 0 && (
            <div className="col-12 text-center py-40">
              <p className="text-16 text-light-1">No courses found for the selected filters.</p>
            </div>
          )}

          {paginated.map((course, i) => {
            const subjectColor = subjectColors[course.subject];
            const boardColor   = boardColors[course.board];
            return (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: "12px",
                    padding: "24px 20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(100,64,251,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Badges: Subject · Grade · Board */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ background: subjectColor.light, color: subjectColor.bg, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", letterSpacing: "0.3px", textTransform: "uppercase" }}>
                      {course.subject}
                    </span>
                    <span style={{ background: "#f5f5f5", color: "#555", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>
                      Grade {course.grade}
                    </span>
                    <span style={{ background: boardColor.light, color: boardColor.bg, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>
                      {course.board}
                    </span>
                  </div>

                  {/* Course Title */}
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a2e", lineHeight: "1.5", margin: 0, flex: 1 }}>
                    {course.title}
                  </p>

                  {/* Bottom accent line */}
                  <div style={{ height: "3px", borderRadius: "2px", background: subjectColor.bg, width: "40px", marginTop: "4px" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-center items-center x-gap-15 pt-50">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid #e8e8e8", background: currentPage === 1 ? "#f5f5f5" : "#fff",
                color: currentPage === 1 ? "#bbb" : "#6440FB",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              ‹
            </button>

            <span style={{ fontSize: "14px", fontWeight: 600, color: "#555", minWidth: "90px", textAlign: "center" }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid #e8e8e8", background: currentPage === totalPages ? "#f5f5f5" : "#fff",
                color: currentPage === totalPages ? "#bbb" : "#6440FB",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              ›
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
