"use client";

import { useEffect, useRef } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import OrderStatusIndicator from "../ui/OrderStatusIndicator";

let ProgressBar;
if (typeof window !== "undefined") {
  ProgressBar = require("progressbar.js");
}

const OrderCompleted = () => {
  const {
    category = "Development",
    orderId = "550e8400-e29b-41d4-a716-446655440000",
    totalAmount = "€ 999.99",
    creationDate = "11/11/1111",
    estimatedDeliveryDate = "11/11/1111",
    daysLeft = 0,
    revisions = 2,
    progress = 1,
    completed = true,
    files = [{ name: "paxeri.zip", size: "11.11 MB" }],
    onToggleDescription = () => {},
  } = {};

  const SemiCircleProgress = ({ progress, completed, daysLeft }) => {
    const containerRef = useRef(null);
    const progressBarRef = useRef(null);
    const initializedRef = useRef(false);

    useEffect(() => {
      if (containerRef.current && !initializedRef.current) {
        progressBarRef.current = new ProgressBar.SemiCircle(
          containerRef.current,
          {
            strokeWidth: 10,
            color: "#E75F34",
            trailColor: "#333333",
            trailWidth: 10,
            easing: "easeInOut",
            duration: 1400,
            svgStyle: {
              width: "100%",
              height: "100%",
              strokeLinecap: "round",
              display: "block",
            },
            text: {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: completed ? "1.1rem" : "2rem",
                fontWeight: "600",
                color: "#FFFFFF",
                textAlign: "center",
                lineHeight: "1.2",
              },
              autoStyleContainer: false,
            },
            step: (state, bar) => {
              if (completed) {
                bar.setText(`
                  <div>
                    <svg width="30" height="30" viewBox="0 0 16 16" fill="none">
                      <path d="M15.6282 2.61482C15.1332 2.11912 14.3293 2.11943 13.8336 2.61482L5.75659 10.6922L2.1667 7.1023C1.671 6.6066 0.867479 6.6066 0.371777 7.1023C-0.123926 7.598 -0.123926 8.40152 0.371777 8.89723L4.85894 13.3844C5.10664 13.6321 5.43143 13.7562 5.75625 13.7562C6.08107 13.7562 6.40617 13.6324 6.65387 13.3844L15.6282 4.40972C16.1239 3.91436 16.1239 3.11049 15.6282 2.61482Z" fill="#EB5939"/>
                    </svg>
                  </div>
                `);
                const textContainer =
                  containerRef.current.querySelector(".progressbar-text");
                Object.assign(textContainer.style, {
                  display: "flex",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "34px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                });
              } else {
                bar.setText(`
                  <div>
                    ${daysLeft}
                    <div style="font-size: 1rem; font-weight: normal;">Days Left</div>
                  </div>
                `);
              }
            },
          }
        );

        progressBarRef.current.animate(progress);
      }
    }, [progress, completed, daysLeft]);

    useEffect(() => {
      return () => {
        if (progressBarRef.current) {
          progressBarRef.current.destroy();
          initializedRef.current = false;
        }
      };
    }, []);

    return (
      <div className="relative w-32 sm:w-36 md:w-40 h-24 sm:h-26 md:h-28 flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  };

  return (
    <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />

      <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col justify-between items-center">
        <h3 className="text-lg lg:text-xl 2xl:text-3xl font-bold">
          Order Details
        </h3>
        <div className="w-full">
          <div className="flex flex-col justify-center items-center max-2xl:-mt-6 2xl:mb-6 relative max-2xl:scale-75">
            <SemiCircleProgress
              progress={progress}
              completed={completed}
              daysLeft={daysLeft}
            />
            <div className="">Complete</div>
          </div>

          <div className="space-y-2 text-sm md:text-base">
            {[
              { label: "Category", value: category },
              { label: "Order ID", value: orderId },
              {
                label: "Description",
                value: (
                  <button
                    onClick={onToggleDescription}
                    className="text-white hover:text-[#F47C5D] transition-colors"
                  >
                    <LuSquareArrowOutUpRight />
                  </button>
                ),
              },
              { label: "Total Amount", value: totalAmount },
              { label: "Creation Date", value: creationDate },
              {
                label: "Estimated Delivery Date",
                value: estimatedDeliveryDate,
              },
              { label: "Delivery Date", value: "In Progress" },
              { label: "Revisions", value: revisions },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center gap-2 max-2xl:text-xs"
              >
                <p className="text-gray-400 whitespace-nowrap">{label}</p>
                <div className="text-white text-right truncate max-w-[60%]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 flex justify-center items-center">
            <OrderStatusIndicator completed={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleted;
