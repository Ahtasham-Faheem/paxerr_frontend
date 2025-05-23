// components/SemiCircleProgress.jsx
"use client";

import React, { useEffect, useRef } from "react";

// Store ProgressBar as a global variable outside component
let ProgressBar;
if (typeof window !== "undefined") {
  ProgressBar = require("progressbar.js");
}

const SemiCircleProgress = ({ progress, completed, daysLeft, status }) => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Only create the progress bar if it doesn't exist yet
    if (containerRef.current && !initializedRef.current && ProgressBar) {
      // Create a new SemiCircle instance
      progressBarRef.current = new ProgressBar.SemiCircle(
        containerRef.current,
        {
          strokeWidth: 10,
          color: "#E75F34",
          trailColor: status === "canceled" ? "#000000" : "#333333",
          trailWidth: 10,
          easing: "easeInOut",
          duration: 1400,
          svgStyle: {
            width: "110%",
            height: "100%",
            strokeLinecap: "round",
            display: "block",
          },
          text: {
            style: {
              position: "absolute",
              left: "56%",
              top: "50%",
              padding: 0,
              margin: 0,
              transform: "translate(-50%, -50%)",
              fontSize: completed ? "1rem" : "1.2rem",
              fontWeight: "bold",
              color: "#E75F34",
              textAlign: "center",
              display: status === "canceled" ? "none" : "block",
            },
            autoStyleContainer: true,
          },
          step: (state, bar) => {
            if (completed) {
              const barCompleted = `<div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_179_30452)">
                <path d="M25.9146 12.6426C25.4756 8.07933 21.6764 4.49902 17 4.49902C13.3798 4.49902 10.2817 6.64712 8.85349 9.72936C8.42244 9.59231 7.97539 9.49935 7.50037 9.49935C5.0152 9.49935 3.00013 11.5154 3.00013 13.9996C3.00013 14.4936 3.09913 14.9607 3.24614 15.4037C1.31206 16.5309 0 18.6 0 20.9981C0 24.5884 2.91018 27.4985 6.50044 27.4985V27.5005H24.5015V27.4985C28.6448 27.4985 32 24.1413 32 19.9981C31.999 16.3418 29.3798 13.3046 25.9146 12.6426ZM20.7683 19.123L16.9871 22.8502C16.224 23.6152 15.754 23.5902 15.0129 22.8502L11.2317 19.123C10.6897 18.2379 11.1327 17.5139 12.2188 17.5139H13.9999V13.5016C13.9999 12.9486 14.448 12.4996 15 12.4996H17C17.553 12.4996 18.0001 12.9486 18.0001 13.5016V17.5139H19.7792C20.8653 17.5139 21.3113 18.2379 20.7683 19.123Z" fill="#EB5939"/>
                </g>
                <defs>
                <clipPath id="clip0_179_30452">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>`;
              bar.setText(barCompleted);

              const textElement =
                containerRef.current.querySelector(".progressbar-text");
              if (textElement) {
                textElement.style.width = "40px";
                textElement.style.height = "40px";
                textElement.style.borderRadius = "50%";
                textElement.style.display = "flex";
                textElement.style.alignItems = "center";
                textElement.style.justifyContent = "center";
              }
            } else if (status === "canceled") {
              bar.setText("");
            } else {
              const daysContent = `<div>${daysLeft}<div style="font-size: 0.5rem; font-weight: normal; color: #BABABA">Days Left</div></div>`;
              bar.setText(daysContent);
            }
          },
        }
      );

      // Mark as initialized
      initializedRef.current = true;

      // Animate to the target progress
      progressBarRef.current.animate(progress);
    } else if (progressBarRef.current) {
      // Just update the progress if the component already exists
      progressBarRef.current.animate(progress);

      // Update text content if needed
      if (progressBarRef.current.text) {
        if (completed) {
          const barCompleted = `<div>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_179_30452)">
            <path d="M25.9146 12.6426C25.4756 8.07933 21.6764 4.49902 17 4.49902C13.3798 4.49902 10.2817 6.64712 8.85349 9.72936C8.42244 9.59231 7.97539 9.49935 7.50037 9.49935C5.0152 9.49935 3.00013 11.5154 3.00013 13.9996C3.00013 14.4936 3.09913 14.9607 3.24614 15.4037C1.31206 16.5309 0 18.6 0 20.9981C0 24.5884 2.91018 27.4985 6.50044 27.4985V27.5005H24.5015V27.4985C28.6448 27.4985 32 24.1413 32 19.9981C31.999 16.3418 29.3798 13.3046 25.9146 12.6426ZM20.7683 19.123L16.9871 22.8502C16.224 23.6152 15.754 23.5902 15.0129 22.8502L11.2317 19.123C10.6897 18.2379 11.1327 17.5139 12.2188 17.5139H13.9999V13.5016C13.9999 12.9486 14.448 12.4996 15 12.4996H17C17.553 12.4996 18.0001 12.9486 18.0001 13.5016V17.5139H19.7792C20.8653 17.5139 21.3113 18.2379 20.7683 19.123Z" fill="#EB5939"/>
            </g>
            <defs>
            <clipPath id="clip0_179_30452">
            <rect width="32" height="32" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>`;
          progressBarRef.current.setText(barCompleted);
        } else if (status !== "canceled") {
          const daysContent = `<div>${daysLeft}<div style="font-size: 0.5rem; font-weight: normal;">Days Left</div></div>`;
          progressBarRef.current.setText(daysContent);
        }
      }
    }

    // Cleanup function - only destroy when component unmounts
    return () => {
      // We don't want to destroy on re-render, only on unmount
    };
  }, [progress, completed, daysLeft, status]);

  // Cleanup on component unmount only
  useEffect(() => {
    return () => {
      if (progressBarRef.current) {
        progressBarRef.current.destroy();
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-24 h-16">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

export default SemiCircleProgress;
