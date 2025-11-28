import React from "react";
import SamplePaperCard from "../courseCards/SamplePaperCard";
import { samplePapersData, samplePaperClasses } from "../../../data/courses";
import { useState, useEffect } from "react";
export default function Courses() {
  const [filtered, setFiltered] = useState();
  const [selectedClass, setSelectedClass] = useState("All Classes");
  useEffect(() => {
    if (selectedClass === "All Classes") {
      setFiltered();
    } else {
      const filteredData = samplePapersData.filter(
        (paper) => paper.class === selectedClass,
      );
      setFiltered(filteredData);
    }
  }, [selectedClass]);

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle ">
            <h2 className="sectionTitle__title sm:text-24">
              Featured Sample Papers
            </h2>

            <p className="sectionTitle__text ">
              Practice with curated sample papers for Class 10, 11 and 12 across
              major subjects and boards.
            </p>
          </div>
        </div>
      </div>
      <div className="tabs__controls flex-wrap  pt-50 d-flex justify-center x-gap-10 js-tabs-controls">
        {samplePaperClasses.map((classLabel, i) => (
          <div onClick={() => setSelectedClass(classLabel)} key={i}>
            <button
              className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
                selectedClass === classLabel ? "tabActive" : ""
              } `}
              data-tab-target=".-tab-item-2"
              type="button"
            >
              {classLabel}
            </button>
          </div>
        ))}
      </div>

      <div
        className="pt-60 m-auto row y-gap-30 container pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        {filtered
          ? filtered.map((paper, index) => (
              <SamplePaperCard
                key={index}
                paper={paper}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          : samplePapersData
              .slice(0, 8)
              .map((paper, index) => (
                <SamplePaperCard key={index} paper={paper} index={index} />
              ))}
      </div>
    </section>
  );
}
