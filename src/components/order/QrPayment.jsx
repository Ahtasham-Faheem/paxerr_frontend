"use client";

import { useEffect } from "react";
import SecurePaymentFooter from "./SecurePaymentFooter";
import { LiaSpinnerSolid } from "react-icons/lia";

const QrPayment = ({ onBackToPayment, onPaymentSuccess, onPaymentFailed }) => {
  // Handle QR code timeout to show failure screen
  useEffect(() => {
    let failTimer;
    let successTimer;

    // Set 'failed' after 5s
    failTimer = setTimeout(() => {
      onPaymentFailed();

      // Move this timer setup to OrderScreen component instead
      // The success timer should be initiated from parent after failure
    }, 5000);

    return () => {
      clearTimeout(failTimer);
      clearTimeout(successTimer);
    };
  }, [onPaymentFailed, onPaymentSuccess]);
  return (
    <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-10 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <span className="w-fit max-2xl:text-sm text-primary absolute z-20 left-0 right-0 mx-auto top-2">
        11:11
      </span>
      <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col items-center">
        <div className="flex items-center mb-3">
          <button
            onClick={onBackToPayment}
            className="text-primary hover:text-primary/80 transition-colors absolute left-[20]"
          >
            <img
              className="size-8 lg:size-auto"
              src="/images/icons/backarrow.svg"
              alt=""
            />
          </button>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              Pay <span className="text-primary">€999.99</span>
            </h2>
            <p className="text-xs lg:text-sm">1120.25 USDT</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-4 border-primary mb-3">
          <img
            src="/images/frame.png"
            alt="Payment QR Code"
            className="size-24 2xl:size-40 object-cover rounded-4xl"
          />
        </div>

        <div className="flex items-center text-white text-sm gap-2 mb-2 2xl:mb-6">
          <div className="animate-spin">
            <img src="/images/icons/spinner.svg" alt="" />
          </div>
          <LiaSpinnerSolid className="text-primary animate-spin" size={16} />
          <span>Waiting for payment confirmation...</span>
        </div>

        <p className="text-sm mb-2">Wallet Address</p>
        <div className="bg-[#171717] rounded-full p-3.5 pl-8 text-left text-sm w-full flex justify-between mb-2 2xl:mb-6">
          <span className="truncate">
            0xdac17f958d2ee523a2206206994597c13d831ec7...
          </span>
          <button className="ml-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3 5.3H7.3C6.2 5.3 5.3 6.2 5.3 7.3V13.3C5.3 14.4 6.2 15.3 7.3 15.3H13.3C14.4 15.3 15.3 14.4 15.3 13.3V7.3C15.3 6.2 14.4 5.3 13.3 5.3Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.7 10.7H2C1.5 10.7 1 10.2 1 9.7V3.7C1 3.2 1.5 2.7 2 2.7H8C8.5 2.7 9 3.2 9 3.7V4.3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm mb-2">Amount</p>
        <div className="bg-[#171717] rounded-full p-3.5 pl-8 text-left text-sm w-full flex justify-between">
          <span>1120.25 USDT</span>
          <button className="ml-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3 5.3H7.3C6.2 5.3 5.3 6.2 5.3 7.3V13.3C5.3 14.4 6.2 15.3 7.3 15.3H13.3C14.4 15.3 15.3 14.4 15.3 13.3V7.3C15.3 6.2 14.4 5.3 13.3 5.3Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.7 10.7H2C1.5 10.7 1 10.2 1 9.7V3.7C1 3.2 1.5 2.7 2 2.7H8C8.5 2.7 9 3.2 9 3.7V4.3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <SecurePaymentFooter />
      </div>
    </div>
  );
};

export default QrPayment;
