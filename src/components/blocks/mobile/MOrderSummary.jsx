"use client";
import Button from "@/components/ui/Button";
import { LuCheck, LuSquareArrowOutUpRight } from "react-icons/lu";
import { useState } from "react";

const MOrderSummary = ({ onShowPayment }) => {
  // Local state for showing description inside the component instead of using a modal
  const [showDescription, setShowDescription] = useState(false);

  // Function to toggle between order summary and description view
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  // Description content view
  if (showDescription) {
    return (
      <div className="relative w-full h-fit text-center lg:-mr-28 !pointer-events-auto">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
          src="/images/icons/cart.svg"
          alt=""
        />
        <div className="order-bg w-full h-fit max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col">
          <div className="flex items-center mb-6">
            <button
              onClick={toggleDescription}
              className="text-primary hover:text-primary/80 transition-colors absolute"
            >
              <img
                className="size-8 lg:size-auto"
                src="/images/icons/backarrow.svg"
                alt=""
              />
            </button>
            <h3 className="text-lg lg:text-2xl 2xl:text-3xl font-bold mx-auto">
              Description
            </h3>
          </div>

          <div className="flex-1 max-h-[40vh] overflow-y-auto !pointer-events-auto">
            <div className="text-left pr-2">
              <p className="text-[#BABABA] mb-6">
                Enhance the website's mobile responsiveness by optimizing its
                layout, ensuring all elements adapt seamlessly across different
                screen sizes and resolutions. This includes adjusting media
                queries, refining CSS styles, and restructuring components to
                improve usability on mobile devices. Additionally, address any
                UI/UX inconsistencies, such as text alignment, button sizes,
                image scaling, and navigation responsiveness. Implement
                performance optimizations to reduce loading times and improve
                overall mobile user experience. Conduct thorough testing across
                multiple devices and browsers to ensure smooth functionality and
                a consistent design.
              </p>

              <ul className="space-y-4 text-[#BABABA] list-disc pl-5">
                <li>
                  <span className="text-[#BABABA]/80 font-semibold">
                    Layout Optimization:
                  </span>{" "}
                  Adjust grids, flexbox, and containers for better mobile
                  adaptability.
                </li>
                <li>
                  <span className="text-[#BABABA]/80 font-semibold">
                    Media Queries Refinement:
                  </span>{" "}
                  Implement and fine-tune breakpoints for different devices.
                </li>
                <li>
                  <span className="text-[#BABABA]/80 font-semibold">
                    UI/UX Improvements:
                  </span>{" "}
                  Fix inconsistencies in text alignment, button sizes, spacing,
                  and image scaling.
                </li>
                <li>
                  <span className="text-[#BABABA]/80 font-semibold">
                    Navigation Enhancement:
                  </span>{" "}
                  Ensure menus, dropdowns, and interactive elements function
                  smoothly on touchscreens.
                </li>
                <li>
                  <span className="text-[#BABABA]/80 font-semibold">
                    Performance Optimization:
                  </span>{" "}
                  Minimize loading times by optimizing images, CSS, and scripts.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default order summary view
  return (
    <div className="relative w-full h-fit text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <div className="order-bg w-full h-fit max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col items-center">
        <h3 className="text-lg lg:text-xl 2xl:text-3xl mt-5 font-bold">
          Order Summary
        </h3>
        <div className="w-full mt-4 space-y-2">
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Category</p>
            <p>Development</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Order ID</p>
            <p>550e8400-e29b-41d4-a716-446655440000</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Description</p>
            <button
              onClick={toggleDescription}
              className="hover:text-primary transition-colors"
            >
              <LuSquareArrowOutUpRight />
            </button>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Creation Date</p>
            <p>11/11/1111</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Estimated Delivery Date</p>
            <p>11/11/1111</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Unlimited Revisions</p>
            <p>
              <LuCheck className="text-primary" />
            </p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">100% Refund Guarantee</p>
            <p>
              <LuCheck className="text-primary" />
            </p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">50% Off for Delays</p>
            <p>
              <LuCheck className="text-primary" />
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center text-[#7F7F7F] my-2">Total Amount</p>
          <p className="text-primary text-2xl 2xl:text-4xl font-bold font-sans">
            €999.99
          </p>
          <Button
            type={"outline"}
            onClick={onShowPayment}
            className="mt-4 mb-0 lg:my-4 w-[190px] mx-auto"
          >
            Confirm
          </Button>
          <div className="flex justify-center gap-2 text-[#7F7F7F] mt-8">
            <img src="/images/icons/lock.svg" alt="" className="size-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MOrderSummary;
