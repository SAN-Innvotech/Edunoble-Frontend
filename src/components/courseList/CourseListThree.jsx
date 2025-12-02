import { samplePapersData, samplePaperSortingOptions } from "@/data/courses";
import React, { useState, useEffect } from "react";
import PaginationTwo from "../common/PaginationTwo";
import SamplePaperCard from "../homes/courseCards/SamplePaperCard";

export default function CourseListThree() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterClass, setFilterClass] = useState([]);
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterBoard, setFilterBoard] = useState([]);
  const [filterYear, setFilterYear] = useState([]);
  const [filterExamType, setFilterExamType] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Default");

  const [filteredData, setFilteredData] = useState([]);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let refItems = [...samplePapersData];

    let filteredArrays = [];

    if (filterClass.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterClass.includes(elm.class)
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterSubject.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterSubject.includes(elm.subject)
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterBoard.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterBoard.includes(elm.board)
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterYear.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterYear.includes(elm.year.toString())
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterExamType.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterExamType.includes(elm.examType)
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems =
      filteredArrays.length > 0
        ? refItems.filter((item) =>
            filteredArrays.every((array) => array.includes(item))
          )
        : refItems;
    setFilteredData(commonItems);
    setPageNumber(1);
  }, [filterClass, filterSubject, filterBoard, filterYear, filterExamType]);

  useEffect(() => {
    if (currentSortingOption == "Default") {
      setSortedFilteredData(filteredData);
    } else if (currentSortingOption == "Year (Newest)") {
      setSortedFilteredData([...filteredData].sort((a, b) => b.year - a.year));
    } else if (currentSortingOption == "Year (Oldest)") {
      setSortedFilteredData([...filteredData].sort((a, b) => a.year - b.year));
    } else if (currentSortingOption == "Class (Asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => parseInt(a.class) - parseInt(b.class))
      );
    } else if (currentSortingOption == "Class (Desc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => parseInt(b.class) - parseInt(a.class))
      );
    } else if (currentSortingOption == "Subject (A-Z)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.subject.localeCompare(b.subject))
      );
    } else if (currentSortingOption == "Subject (Z-A)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.subject.localeCompare(a.subject))
      );
    }
  }, [currentSortingOption, filteredData]);

  const handleFilterClass = (item) => {
    if (filterClass.includes(item)) {
      const filtered = filterClass.filter((elm) => elm != item);
      setFilterClass([...filtered]);
    } else {
      setFilterClass((pre) => [...pre, item]);
    }
  };
  const handleFilterSubject = (item) => {
    if (filterSubject.includes(item)) {
      const filtered = filterSubject.filter((elm) => elm != item);
      setFilterSubject([...filtered]);
    } else {
      setFilterSubject((pre) => [...pre, item]);
    }
  };
  const handleFilterBoard = (item) => {
    if (filterBoard.includes(item)) {
      const filtered = filterBoard.filter((elm) => elm != item);
      setFilterBoard([...filtered]);
    } else {
      setFilterBoard((pre) => [...pre, item]);
    }
  };
  const handleFilterYear = (item) => {
    if (filterYear.includes(item)) {
      const filtered = filterYear.filter((elm) => elm != item);
      setFilterYear([...filtered]);
    } else {
      setFilterYear((pre) => [...pre, item]);
    }
  };
  const handleFilterExamType = (item) => {
    if (filterExamType.includes(item)) {
      const filtered = filterExamType.filter((elm) => elm != item);
      setFilterExamType([...filtered]);
    } else {
      setFilterExamType((pre) => [...pre, item]);
    }
  };
  return (
    <>
      <section className="page-header -type-1" style={{ marginTop: "60px" }}>
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Sample Papers</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    Explore sample papers curated for Class 10th, 11th and 12th.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="accordion js-accordion">
            <div
              className={`accordion__item ${filterOpen ? "is-active" : ""} `}
            >
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">
                      {filteredData.length}
                    </span>{" "}
                    sample papers
                  </div>
                </div>

                <div className="col-auto">
                  <div className="row x-gap-20 y-gap-20">
                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                          Sort by:
                        </div>

                        <div
                          id="dd61button"
                          className="dropdown js-dropdown js-category-active"
                        >
                          <div
                            className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                            onClick={() => {
                              document
                                .getElementById("dd61button")
                                .classList.toggle("-is-dd-active");
                              document
                                .getElementById("dd61content")
                                .classList.toggle("-is-el-visible");
                            }}
                            data-el-toggle=".js-category-toggle"
                            data-el-toggle-active=".js-category-active"
                          >
                            <span className="js-dropdown-title">
                              {currentSortingOption}
                            </span>
                            <i className="icon text-9 ml-40 icon-chevron-down"></i>
                          </div>

                          <div
                            id="dd61content"
                            className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                          >
                            <div className="text-14 y-gap-15 js-dropdown-list">
                              {samplePaperSortingOptions.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setCurrentSortingOption((pre) =>
                                      pre == elm ? "Default" : elm
                                    );
                                    document
                                      .getElementById("dd61button")
                                      .classList.toggle("-is-dd-active");
                                    document
                                      .getElementById("dd61content")
                                      .classList.toggle("-is-el-visible");
                                  }}
                                >
                                  <span
                                    className={`d-block js-dropdown-link cursor ${
                                      currentSortingOption == elm
                                        ? "activeMenu"
                                        : ""
                                    } `}
                                  >
                                    {elm}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div
                        className="accordion__button w-unset"
                        onClick={() => setFilterOpen((pre) => !pre)}
                      >
                        <button className="button h-50 px-30 -light-7 text-purple-1">
                          <i className="icon-filter mr-10"></i>
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="accordion__content "
                style={filterOpen ? { maxHeight: "1800px" } : {}}
              >
                <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                  <div className="row x-gap-60 y-gap-40">
                    {/* Class Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Class</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterClass([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                readOnly
                                checked={filterClass.length ? false : true}
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {Array.from(
                            new Set(samplePapersData.map((p) => p.class))
                          )
                            .sort()
                            .map((cls, index) => (
                              <div
                                className="sidebar-checkbox__item cursor"
                                key={index}
                                onClick={() => handleFilterClass(cls)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterClass.includes(cls) ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  Class {cls}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    samplePapersData.filter(
                                      (itm) => itm.class === cls
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Subject Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Subject</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterSubject([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                readOnly
                                checked={filterSubject.length ? false : true}
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {Array.from(
                            new Set(samplePapersData.map((p) => p.subject))
                          )
                            .sort()
                            .map((subject, index) => (
                              <div
                                className="sidebar-checkbox__item cursor"
                                key={index}
                                onClick={() => handleFilterSubject(subject)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterSubject.includes(subject)
                                        ? true
                                        : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {subject}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    samplePapersData.filter(
                                      (itm) => itm.subject === subject
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Board Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Board</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterBoard([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                readOnly
                                checked={filterBoard.length ? false : true}
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {Array.from(
                            new Set(
                              samplePapersData
                                .map((p) => p.board)
                                .filter(Boolean)
                            )
                          )
                            .sort()
                            .map((board, index) => (
                              <div
                                className="sidebar-checkbox__item cursor"
                                key={index}
                                onClick={() => handleFilterBoard(board)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterBoard.includes(board) ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {board}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    samplePapersData.filter(
                                      (itm) => itm.board === board
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Year Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Year</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterYear([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                readOnly
                                checked={filterYear.length ? false : true}
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {Array.from(
                            new Set(
                              samplePapersData.map((p) => p.year.toString())
                            )
                          )
                            .sort((a, b) => parseInt(b) - parseInt(a))
                            .map((year, index) => (
                              <div
                                className="sidebar-checkbox__item cursor"
                                key={index}
                                onClick={() => handleFilterYear(year)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterYear.includes(year) ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {year}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    samplePapersData.filter(
                                      (itm) => itm.year.toString() === year
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Exam Type Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Exam Type</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterExamType([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                readOnly
                                checked={filterExamType.length ? false : true}
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {Array.from(
                            new Set(
                              samplePapersData
                                .map((p) => p.examType)
                                .filter(Boolean)
                            )
                          )
                            .sort()
                            .map((examType, index) => (
                              <div
                                className="sidebar-checkbox__item cursor"
                                key={index}
                                onClick={() => handleFilterExamType(examType)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterExamType.includes(examType)
                                        ? true
                                        : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {examType}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    samplePapersData.filter(
                                      (itm) => itm.examType === examType
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row y-gap-30">
            {sortedFilteredData
              .slice((pageNumber - 1) * 12, pageNumber * 12)
              .map((paper, i) => (
                <SamplePaperCard key={i} paper={paper} />
              ))}
          </div>

          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={sortedFilteredData}
                pageCapacity={12}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
