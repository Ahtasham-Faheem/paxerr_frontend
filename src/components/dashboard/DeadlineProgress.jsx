"use client";
import React, { useEffect, useRef } from "react";

const DeadlineProgress = ({ orderStatusCounts }) => {
  const progressRef = useRef(null);
  const progressBarInstance = useRef(null);

  useEffect(() => {
    const loadProgressBar = async () => {
      if (typeof window !== "undefined" && progressRef.current) {
        const ProgressBar = (await import("progressbar.js")).default;
        if (progressBarInstance.current) {
          progressBarInstance.current.destroy();
        }
        const bar = new ProgressBar.Line(progressRef.current, {
          strokeWidth: 2,
          easing: "easeInOut",
          duration: 1400,
          color: "#EB5939",
          trailColor: "#090909",
          trailWidth: 2,
          svgStyle: {
            width: "100%",
            height: "100%",
            borderRadius: "999px",
            strokeLinecap: "round",
          },
          text: {
            style: {
              color: "#BABABA",
              position: "absolute",
              right: "0",
              top: "-35px",
              padding: 0,
              margin: 20,
              transform: null,
            },
            autoStyleContainer: false,
          },
          step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + "%");
          },
        });

        // Animate to the percentage value
        bar.animate(0.89); // 89%

        // Store the instance for cleanup
        progressBarInstance.current = bar;
      }
    };

    loadProgressBar();

    // Cleanup on unmount
    return () => {
      if (progressBarInstance.current) {
        progressBarInstance.current.destroy();
      }
    };
  }, []);

  console.log('consome', orderStatusCounts)

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <span className="text-gray-300 text-sm">Deadlines Met / Overdue</span>
      <div className="mt-2 mb-8 relative" style={{ height: "2px" }}>
        <div ref={progressRef} className="w-full h-2 text-base"></div>
      </div>
      <div className="flex w-full justify-between mb-10 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-400 text-sm">{orderStatusCounts.in_progress} Orders</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <span className="text-gray-400 text-sm">{orderStatusCounts.canceled} Orders</span>
        </div>
      </div>
    </div>
  );
};

export default DeadlineProgress;
