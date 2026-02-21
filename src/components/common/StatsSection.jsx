import React from "react";
import { counters as defaultCounters } from "@/data/count";

export default function StatsSection({ statistics }) {
  const displayCounters = statistics || defaultCounters;

  return (
    <section className="layout-pt-lg layout-pb-lg bg-purple-1">
      <div className="container">
        <div className="row y-gap-30 counter__row justify-center">
          {displayCounters
            .filter((elm) => !(elm.label || elm.title || "").toLowerCase().includes("classes covered"))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((elm, i) => (
              <div
                key={elm._id || elm.id || i}
                className="col-lg-3 col-sm-6"
                data-aos="fade-left"
                data-aos-duration={(i + 1) * 350}
              >
                <div className="counter -type-1">
                  <div className="counter__number">{elm.number}</div>
                  <div className="counter__title">{elm.label || elm.title}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
