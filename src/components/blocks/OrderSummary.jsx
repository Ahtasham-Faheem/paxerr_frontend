"use client";
import { useState, useEffect } from "react";
import {
  LuArrowLeft,
  LuCheck,
  LuLock,
  LuSquareArrowOutUpRight,
  LuShoppingCart,
  LuPartyPopper,
} from "react-icons/lu";
import Button from "../ui/Button";

const OrderSummary = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showQrPayment, setShowQrPayment] = useState(false);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'

  console.log(paymentStatus);

  // Handle QR code timeout to show failure screen
  useEffect(() => {
    let failTimer;
    let successTimer;

    if (showQrPayment) {
      // Set 'failed' after 5s
      failTimer = setTimeout(() => {
        setPaymentStatus("failed");

        // Set 'success' 5s after 'failed'
        successTimer = setTimeout(() => {
          setPaymentStatus("success");
        }, 5000);
      }, 5000);
    }

    return () => {
      clearTimeout(failTimer);
      clearTimeout(successTimer);
    };
  }, [showQrPayment]);

  // Auto redirect from success/failure screens
  // useEffect(() => {
  //   let timer;
  //   if (paymentStatus) {
  //     timer = setTimeout(() => {
  //       if (paymentStatus === "success") {
  //         backToSummary();
  //       } else {
  //         simulateSuccessfulPayment();
  //       }
  //       setPaymentStatus(null);
  //     }, 5000); // 5s timeout
  //   }

  //   return () => clearTimeout(timer);
  // }, [paymentStatus]);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowPayment(false);
    setShowQrPayment(false);
    setPaymentStatus(null);
  };

  const showPaymentScreen = () => {
    setShowPayment(true);
    setShowDescription(false);
    setShowQrPayment(false);
    setPaymentStatus(null);
  };

  const showQrPaymentScreen = () => {
    setShowQrPayment(true);
    setShowPayment(false);
    setShowDescription(false);
    setPaymentStatus(null);
  };

  const backToSummary = () => {
    setShowPayment(false);
    setShowDescription(false);
    setShowQrPayment(false);
    setPaymentStatus(null);
  };

  const backToPayment = () => {
    setShowQrPayment(false);
    setShowPayment(true);
    setPaymentStatus(null);
  };

  const toggleCurrencyOptions = () => {
    setShowCurrencyOptions(!showCurrencyOptions);
  };

  const selectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setShowCurrencyOptions(false);
  };

  // For testing purposes - simulate successful payment
  const simulateSuccessfulPayment = () => {
    setPaymentStatus("success");
  };

  // Render payment failed screen
  if (paymentStatus === "failed") {
    return (
      <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
          src="/images/icons/cart.svg"
          alt=""
        />
        <div className="order-bg w-full h-full backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col items-center justify-center">
          <div className="flex items-center mb-3">
            <button
              onClick={backToPayment}
              className="text-primary hover:text-primary/80 transition-colors absolute left-[20] top-10"
            >
              <img
                className="size-8 lg:size-auto"
                src="/images/icons/backarrow.svg"
                alt=""
              />
            </button>
          </div>
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6">
              <img src="/images/icons/expired.svg" alt="" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Invoice Expired
            </h2>
            <p className="text-sm text-[#BABABA] max-w-sm mx-auto">
              If you already sent the payment and it's unconfirmed please
              contact support.
            </p>
          </div>

          <div className="absolute bottom-4 flex justify-center gap-2 text-[#7F7F7F]">
            <img src="/images/icons/lock.svg" alt="" className="size-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
        </div>
      </div>
    );
  }

  // Render payment success screen
  if (paymentStatus === "success") {
    return (
      <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
          src="/images/icons/tick.svg"
          alt=""
        />

        <div className="order-bg w-full h-full backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6">
              <img src="/images/icons/confetti.svg" alt="" />
            </div>
            <h2 className="text-lg lg:text-2xl 2xl:text-3xl font-bold mb-4">
              Thank you for your order!
            </h2>
            <p className="max-2xl:text-xs">
              Want to track your order status?{" "}
              <span className="text-primary">Sign In</span> or{" "}
              <span className="text-primary">Sign Up</span> to stay updated.
            </p>
          </div>

          <div className="mt-4 flex gap-10">
            <Button
              onClick={showQrPaymentScreen}
              className="w-full lg:w-[150px] mx-auto mb-4"
            >
              SIGN IN
            </Button>
            <Button onClick={showQrPaymentScreen} className="mx-auto mb-4">
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showQrPayment) {
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
        <div className="order-bg w-full h-full backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col items-center">
          <div className="flex items-center mb-3">
            <button
              onClick={backToPayment}
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
          <div className="absolute bottom-4 flex justify-center gap-2 text-[#7F7F7F]">
            <img src="/images/icons/lock.svg" alt="" className="size-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="relative max-lg:w-xs w-[50%] h-full lg:-mr-28 !pointer-events-auto">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-10 left-0 right-0 mx-auto"
          src="/images/icons/cart.svg"
          alt=""
        />
        <span className="w-fit max-2xl:text-sm text-primary absolute z-20 left-0 right-0 mx-auto top-2">
          29:59
        </span>
        <div className="order-bg w-full h-full backdrop-blur-xs py-8 lg:pt-8 2xl:pt-12 px-5 lg:px-8 flex flex-col">
          <div className="flex flex-col items-center xl:max-2xl:scale-y-95">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold mt-3 mb-2 2xl:mb-6">
              Payment Methods
            </h2>

            <div className="w-full mb-2 2xl:mb-6">
              <p className="text-sm mb-2">Enter your e-mail</p>
              <input
                type="email"
                placeholder="E-Mail"
                className="w-full bg-[#171717] rounded-full px-5 py-2.5 2xl:px-8 2xl:py-4 text-sm focus:outline-none focus:ring-0"
              />
            </div>

            <div className="w-full mb-2 2xl:mb-6 relative">
              <p className="text-sm mb-2">Select payment currency</p>
              <button
                onClick={toggleCurrencyOptions}
                className="flex items-center justify-between w-full bg-[#171717] rounded-full p-2 2xl:p-4 !pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full flex items-center justify-center">
                    <img src="/images/icons/USDT.svg" alt="" />
                  </div>
                  <span>{selectedCurrency}</span>
                </div>
                <div className="px-3">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99998 6.27995C3.8566 6.27995 3.71324 6.22521 3.60393 6.11595L0.164113 2.67609C-0.0547044 2.45728 -0.0547044 2.1025 0.164113 1.88377C0.382842 1.66504 0.737546 1.66504 0.956381 1.88377L3.99998 4.92755L7.04359 1.88388C7.26241 1.66515 7.61708 1.66515 7.83579 1.88388C8.05471 2.10261 8.05471 2.45738 7.83579 2.6762L4.39602 6.11606C4.28666 6.22533 4.1433 6.27995 3.99998 6.27995Z"
                      fill="#BABABA"
                    />
                  </svg>
                </div>
              </button>

              {showCurrencyOptions && (
                <div className="absolute w-full mt-2 bg-[#171717] rounded-lg z-10">
                  <div
                    className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto rounded-t-lg"
                    onClick={() => selectCurrency("USDT")}
                  >
                    <div className="rounded-full flex items-center justify-center">
                      <img
                        src="/images/icons/USDT.svg"
                        alt=""
                        className="size-6"
                      />
                    </div>
                    <span>USDT</span>
                    {selectedCurrency === "USDT" && (
                      <LuCheck className="ml-auto text-[#F47C5D]" />
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto"
                    onClick={() => selectCurrency("BTC")}
                  >
                    <div className="rounded-full flex items-center justify-center">
                      <img
                        src="/images/icons/BTC.svg"
                        alt=""
                        className="size-6"
                      />
                    </div>
                    <span>BTC</span>
                    {selectedCurrency === "BTC" && (
                      <LuCheck className="ml-auto text-[#F47C5D]" />
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto rounded-b-lg"
                    onClick={() => selectCurrency("ETH")}
                  >
                    <div className="rounded-full flex items-center justify-center">
                      <img
                        src="/images/icons/ETH.svg"
                        alt=""
                        className="size-6"
                      />
                    </div>
                    <span>ETH</span>
                    {selectedCurrency === "ETH" && (
                      <LuCheck className="ml-auto text-[#F47C5D]" />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full mb-2 2xl:mb-6">
              <p className="text-sm mb-2">Select network</p>
              <div className="flex items-center justify-between w-full bg-[#171717] rounded-full p-2 2xl:p-4">
                <span className="px-3">BSC (BEP-20)</span>
                <div className="px-3">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99998 6.27995C3.8566 6.27995 3.71324 6.22521 3.60393 6.11595L0.164113 2.67609C-0.0547044 2.45728 -0.0547044 2.1025 0.164113 1.88377C0.382842 1.66504 0.737546 1.66504 0.956381 1.88377L3.99998 4.92755L7.04359 1.88388C7.26241 1.66515 7.61708 1.66515 7.83579 1.88388C8.05471 2.10261 8.05471 2.45738 7.83579 2.6762L4.39602 6.11606C4.28666 6.22533 4.1433 6.27995 3.99998 6.27995Z"
                      fill="#BABABA"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full flex flex-col items-center">
            <p className="text-[#7F7F7F] text-sm mb-2 2xl:mb-4">Total Amount</p>
            <p className="text-primary text-2xl 2xl:text-4xl font-bold mb-2 2xl:mb-4">
              €999.99
            </p>
            <Button
              type={"outline"}
              onClick={showQrPaymentScreen}
              className="2xl:mb-4"
            >
              PAY NOW
            </Button>
            <div className="absolute bottom-2 2xl:bottom-3 flex justify-center gap-2 text-[#7F7F7F]">
              <img src="/images/icons/lock.svg" alt="" className="size-4" />
              <span className="text-xs">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same as original
  if (showDescription) {
    return (
      <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
          src="/images/icons/cart.svg"
          alt=""
        />
        <div className="order-bg w-full h-full backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col">
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

  return (
    <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col justify-between items-center">
        <h3 className="text-lg lg:text-xl 2xl:text-3xl font-bold">
          Order Summary
        </h3>
        <div className="w-full mt-4 lg:mt-8 space-y-2 2xl:space-y-3">
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
        <div className="mt-auto">
          <p className="text-center text-[#7F7F7F] my-2">Total Amount</p>
          <p className="text-primary text-2xl 2xl:text-4xl font-bold font-sans">
            €999.99
          </p>
          <Button
            type={"outline"}
            onClick={showPaymentScreen}
            className="max-lg:hidden mt-4 mb-0 lg:my-4 w-[190px] mx-auto"
          >
            Confirm
          </Button>
          <div className="absolute bottom-2 2xl:bottom-4 left-0 right-0 mx-auto flex justify-center items-center gap-2 text-[#7F7F7F]">
            <img src="/images/icons/lock.svg" alt="" className="size-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
