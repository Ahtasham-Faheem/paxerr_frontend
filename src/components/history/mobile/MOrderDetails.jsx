"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCloudArrowDown,
} from "react-icons/fa6";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { LiaSpinnerSolid } from "react-icons/lia";
import { LuX } from "react-icons/lu";

let ProgressBar;
if (typeof window !== "undefined") {
  ProgressBar = require("progressbar.js");
}

// Demo order data
const demoOrders = [
  {
    id: 1,
    category: "Development",
    orderId: "550e8400-e29b-41d4-a716-446655440000",
    totalAmount: "€ 999.99",
    creationDate: "11/05/2025",
    daysLeft: 2,
    progress: 0.7,
    status: "pending",
    paymentStatus: "pending",
    files: [{ name: "paxeri.zip", size: "11.11 MB" }],
    userImg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    notificationCount: 1,
  },
  {
    id: 2,
    category: "UI/UX Design",
    orderId: "550e8400-e29b-41d4-a716-446655440012",
    totalAmount: "€ 499.50",
    creationDate: "08/05/2025",
    daysLeft: 5,
    progress: 0.3,
    status: "pending",
    paymentStatus: "completed",
    files: [
      { name: "design-mockup.psd", size: "24.7 MB" },
      { name: "assets.zip", size: "8.3 MB" },
    ],
    userImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    notificationCount: 3,
  },
  {
    id: 3,
    category: "Content Writing",
    orderId: "550e8400-e29b-41d4-a716-446655440034",
    totalAmount: "€ 199.99",
    creationDate: "15/05/2025",
    daysLeft: 1,
    progress: 0.9,
    status: "pending",
    paymentStatus: "pending",
    files: [{ name: "article-draft.docx", size: "0.89 MB" }],
    userImg:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    notificationCount: 0,
  },
  {
    id: 4,
    category: "Marketing",
    orderId: "550e8400-e29b-41d4-a716-446655440056",
    totalAmount: "€ 750.00",
    creationDate: "03/05/2025",
    daysLeft: 0,
    progress: 1.0,
    status: "completed",
    paymentStatus: "completed",
    files: [
      { name: "campaign-results.pdf", size: "3.45 MB" },
      { name: "analytics.xlsx", size: "1.28 MB" },
    ],
    userImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    notificationCount: 2,
  },
  {
    id: 5,
    category: "Consultation",
    orderId: "550e8400-e29b-41d4-a716-446655440078",
    totalAmount: "€ 299.00",
    creationDate: "12/05/2025",
    daysLeft: 0,
    progress: 0.0,
    status: "canceled",
    paymentStatus: "pending",
    files: [],
    userImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    notificationCount: 0,
  },
];

const MOrderDetails = () => {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const totalOrders = demoOrders.length;
  const currentOrder = demoOrders[currentOrderIndex];

  const handlePageChange = (index) => {
    setCurrentOrderIndex(index);
    setCurrentFileIndex(0); // Reset file index when changing orders
  };

  const nextFile = () => {
    if (currentOrder.files.length > 0) {
      setCurrentFileIndex((prev) => (prev + 1) % currentOrder.files.length);
    }
  };

  const prevFile = () => {
    if (currentOrder.files.length > 0) {
      setCurrentFileIndex(
        (prev) =>
          (prev - 1 + currentOrder.files.length) % currentOrder.files.length
      );
    }
  };

  const SemiCircleProgress = ({ progress, daysLeft }) => {
    const containerRef = useRef(null);
    const progressBarRef = useRef(null);
    const initializedRef = useRef(false);

    useEffect(() => {
      if (
        containerRef.current &&
        !initializedRef.current &&
        typeof ProgressBar !== "undefined"
      ) {
        progressBarRef.current = new ProgressBar.SemiCircle(
          containerRef.current,
          {
            strokeWidth: 7,
            color: "#EB5939",
            trailColor: "#333333",
            trailWidth: 7,
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
                bottom: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#FFFFFF",
                textAlign: "center",
              },
              autoStyleContainer: false,
            },
            step: (state, bar) => {
              bar.setText(`
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="font-size: 1.5rem; font-weight: normal; color: #EB5939;">${daysLeft}</div>
                  <div style="font-size: .88rem; font-weight: normal; margin-top: 1px;">Days Left</div>
                </div>
              `);
            },
          }
        );

        progressBarRef.current.animate(progress);
        initializedRef.current = true;
      }

      // Update progress when it changes
      if (progressBarRef.current && initializedRef.current) {
        progressBarRef.current.animate(progress);
      }
    }, [progress, daysLeft]);

    useEffect(() => {
      return () => {
        if (progressBarRef.current) {
          progressBarRef.current.destroy();
          initializedRef.current = false;
        }
      };
    }, []);

    return (
      <div className="relative w-30 h-20 flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  };

  const StatusIndicator = ({ status, label }) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-500" size={14} />
            <span className="text-green-400 capitalize text-xs sm:text-sm">
              {status}
            </span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1">
            <LiaSpinnerSolid
              className="text-[#F39C12] animate-spin"
              size={14}
            />
            <span className="text-[#F39C12] capitalize text-xs sm:text-sm">
              {label || status}
            </span>
          </div>
        );
      case "canceled":
        return (
          <div className="flex items-center gap-1">
            <LuX className="text-orange-500" size={14} />
            <span className="text-orange-500 capitalize text-xs sm:text-sm">
              {status}
            </span>
          </div>
        );
      default:
        return <span className="text-xs sm:text-sm">{status}</span>;
    }
  };

  return (
    <div className="w-[85%] h-fit relative flex flex-col items-center justify-center mt-10">
      {/* User profile image */}
      <div className="w-full flex justify-center absolute -top-7">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 p-[2px] border-primary">
            <img
              src={currentOrder.userImg}
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {currentOrder.notificationCount > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-[#EB593980] text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {currentOrder.notificationCount}
            </div>
          )}
        </div>
      </div>
      <div className="order-bg w-full mx-auto h-fit max-2xl:bg-[#17171791] backdrop-blur-xs flex flex-col px-3 !pointer-events-auto">
        {/* Progress semi-circle */}
        <div className="flex flex-col items-center justify-center mb-6 mt-8">
          <SemiCircleProgress
            progress={currentOrder.progress}
            daysLeft={currentOrder.daysLeft}
          />
        </div>

        {/* Order details */}
        <div className="space-y-3 mb-6 text-xs px-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Category</span>
            <span className="text-white">{currentOrder.category}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Order Status</span>
            <StatusIndicator
              label={
                currentOrder.status === "pending" ? "In Progress" : undefined
              }
              status={currentOrder.status}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Order Amount</span>
            <span className="text-green-500">{currentOrder.totalAmount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Status</span>
            <StatusIndicator
              label={
                currentOrder.paymentStatus === "pending" ? "Pending" : undefined
              }
              status={currentOrder.paymentStatus}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Creation Date</span>
            <span className="text-white">{currentOrder.creationDate}</span>
          </div>
        </div>

        {/* File display */}
        <div className="flex gap-4 items-center justify-center -mt-4 max-2xl:scale-75">
          <button
            onClick={prevFile}
            disabled={currentOrder.files.length <= 1}
            className={`${
              currentOrder.files.length <= 1
                ? "opacity-50"
                : "hover:text-[#E75F34]"
            }`}
          >
            <FaChevronLeft size={14} />
          </button>

          {currentOrder.files.length > 0 ? (
            <div className="flex flex-col items-center bg-black py-3 px-6 rounded-4xl justify-center space-y-2">
              <FaCloudArrowDown
                size={40}
                className="text-[#eb5939] scale-x-[-1]"
              />
              <div className="text-center">
                <div className="text-sm text-[#BABABA] font-light">
                  {currentOrder.files[currentFileIndex].name}
                </div>
                <div className="text-xs text-[#7F7F7F] font-light">
                  {currentOrder.files[currentFileIndex].size}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-black py-3 px-6 rounded-4xl justify-center space-y-2">
              <div className="text-center">
                <div className="text-sm text-[#BABABA] font-light">
                  No files available
                </div>
              </div>
            </div>
          )}

          <button
            onClick={nextFile}
            disabled={currentOrder.files.length <= 1}
            className={`${
              currentOrder.files.length <= 1
                ? "opacity-50"
                : "hover:text-[#E75F34]"
            }`}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center text-sm items-center space-x-3 mt-5 mb-5">
        <button
          onClick={() => handlePageChange(Math.max(currentOrderIndex - 1, 0))}
          disabled={currentOrderIndex === 0}
          className={`rounded-full ${
            currentOrderIndex === 0
              ? "text-gray-500"
              : "text-[#E75F34] hover:bg-[#171717]"
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft size={14} />
        </button>

        {Array.from({ length: totalOrders }, (_, i) => i).map((index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`size-8 rounded-full flex items-center justify-center ${
              currentOrderIndex === index
                ? "text-[#E75F34]"
                : "text-gray-300 hover:bg-[#171717]"
            }`}
            aria-label={`Order ${index + 1}`}
            aria-current={currentOrderIndex === index ? "page" : undefined}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            handlePageChange(Math.min(currentOrderIndex + 1, totalOrders - 1))
          }
          disabled={currentOrderIndex === totalOrders - 1}
          className={`rounded-full ${
            currentOrderIndex === totalOrders - 1
              ? "text-gray-500"
              : "text-[#E75F34] hover:bg-[#171717]"
          }`}
          aria-label="Next page"
        >
          <FaChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default MOrderDetails;
