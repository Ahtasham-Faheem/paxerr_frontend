"use client";

import { useEffect, useRef } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import OrderStatusIndicator from "../ui/OrderStatusIndicator";

let ProgressBar;
if (typeof window !== "undefined") {
  ProgressBar = require("progressbar.js");
}

const OrderCanceled = () => {
  const {
    category = "Development",
    orderId = "550e8400-e29b-41d4-a716-446655440000",
    totalAmount = "€ 999.99",
    creationDate = "11/11/1111",
    estimatedDeliveryDate = "11/11/1111",
    daysLeft = 0,
    revisions = 2,
    progress = 0,
    canceled = true,
    onToggleDescription = () => {},
  } = {};

  const SemiCircleProgress = ({ progress, canceled, daysLeft }) => {
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
            trailColor: "#000",
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
                fontSize: canceled ? "1.1rem" : "2rem",
                fontWeight: "600",
                color: "#FFFFFF",
                textAlign: "center",
                lineHeight: "1.2",
              },
              autoStyleContainer: false,
            },
            step: (state, bar) => {
              if (canceled) {
                bar.setText(
                  `
                    <div>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.03345 31.799C2.2489 31.8447 1.47732 31.5838 0.881422 31.0716C-0.293807 29.8894 -0.293807 27.98 0.881422 26.7978L26.6151 1.064C27.8374 -0.0797874 29.7555 -0.016205 30.8993 1.20614C31.9336 2.3115 31.9939 4.01046 31.0404 5.18629L5.15513 31.0716C4.56692 31.5764 3.80772 31.8368 3.03345 31.799Z"
                          fill="#EB5939"
                        />
                        <path
                          d="M28.7367 31.7991C27.9416 31.7957 27.1795 31.4801 26.615 30.9201L0.881177 5.18625C-0.207612 3.9148 -0.0595851 2.00134 1.21187 0.912448C2.34667 -0.0593576 4.02028 -0.0593576 5.15498 0.912448L31.0403 26.6462C32.2623 27.7903 32.3255 29.7085 31.1814 30.9305C31.1359 30.9791 31.0889 31.0261 31.0403 31.0716C30.4064 31.6228 29.5723 31.8862 28.7367 31.7991Z"
                          fill="#EB5939"
                        />
                      </svg>
                    </div>
                    `
                );
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
                    <div style="font-size: 1rem; font-weight: normal;">Refunded</div>
                  </div>
                `);
              }
            },
          }
        );

        progressBarRef.current.animate(progress);
      }
    }, [progress, canceled, daysLeft]);

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
        <h3 className="text-lg text-center lg:text-xl 2xl:text-3xl font-bold">
          Order Details
        </h3>
        <div className="w-full">
          <div className="flex flex-col justify-center items-center max-2xl:-mt-6 2xl:mb-6 relative max-2xl:scale-75">
            <SemiCircleProgress
              progress={progress}
              canceled={canceled}
              daysLeft={daysLeft}
            />
            <div className="">Refunded</div>
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
            <OrderStatusIndicator canceled={true} completed={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCanceled;
