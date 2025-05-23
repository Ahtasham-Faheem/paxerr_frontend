"use client";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";
import Button from "@/components/ui/Button";
import MQrPayment from "./MPaymentQr";
import SignIn from "@/components/order/SignIn";
import SignUp from "@/components/order/SignUp";

const MPaymentMethods = ({ initialState, onBack }) => {
  const [state, setState] = useState(
    initialState || {
      showSignUp: false,
      showSignIn: false,
      selectedCurrency: "USDT",
      showCurrencyOptions: false,
      showQrPayment: false,
    }
  );

  const handleToggleCurrencyOptions = () => {
    setState((prevState) => ({
      ...prevState,
      showCurrencyOptions: !prevState.showCurrencyOptions,
    }));
  };

  const handleSelectCurrency = (currency) => {
    setState((prevState) => ({
      ...prevState,
      selectedCurrency: currency,
      showCurrencyOptions: false,
    }));
  };

  const handleProceedToQr = () => {
    setState((prevState) => ({
      ...prevState,
      showQrPayment: true,
    }));
  };

  const backToPayment = () => {
    setState((prevState) => ({
      ...prevState,
      showQrPayment: false,
    }));
  };

    const showSignIn = () => {
      setState((prev) => ({
        ...prev,
        showSignIn: true,
        showSignUp: false,
        showDescription: false,
        showPayment: false,
        showQrPayment: false,
        paymentStatus: null,
      }));
    };

    const showSignUp = () => {
      setState((prev) => ({
        ...prev,
        showSignUp: true,
        showSignIn: false,
        showDescription: false,
        showPayment: false,
        showQrPayment: false,
        paymentStatus: null,
      }));
    };

  if (state.showSignIn) {
    return <SignIn onShowSignUp={showSignUp} />;
  }

  if (state.showSignUp) {
    return <SignUp onShowSignIn={showSignIn} />;
  }

  if (state.showQrPayment) {
    return (
      <MQrPayment
        onBackToPayment={backToPayment}
        onBack={onBack}
        onShowSignIn={showSignIn}
        onShowSignUp={showSignUp}
      />
    );
  }

  return (
    <div className="relative max-lg:w-full lg:w-[50%] h-full max-h-fit lg:mx-auto lg:-mr-28 !pointer-events-auto">
      <button
        onClick={onBack}
        className="absolute -top-12 left-0 text-white z-10 cursor-pointer transition-colors !pointer-events-auto"
      >
        <img
          className="size-10 lg:size-auto"
          src="/images/icons/backarrow.svg"
          alt=""
        />
      </button>
      <img
        className="size-6 lg:size-10 absolute z-50 -top-4 lg:-top-10 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <span className="w-fit text-xs text-primary absolute z-20 left-0 right-0 mx-auto top-3">
        29:59
      </span>
      <div className="order-bg w-full h-fit max-2xl:bg-[#17171791] backdrop-blur-xs py-5 lg:pt-8 2xl:pt-12 px-5 lg:px-8 flex flex-col">
        <div className="flex flex-col items-center xl:max-2xl:scale-y-95">
          <h2 className="text-xl font-bold mt-7 mb-2"></h2>
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
              onClick={handleToggleCurrencyOptions}
              className="flex items-center justify-between w-full bg-[#171717] rounded-full p-2 2xl:p-4 !pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full flex items-center justify-center">
                  <img
                    src={`/images/icons/${state.selectedCurrency}.svg`}
                    alt=""
                  />
                </div>
                <span>{state.selectedCurrency}</span>
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

            {state.showCurrencyOptions && (
              <CurrencyOptions
                selectedCurrency={state.selectedCurrency}
                onSelectCurrency={handleSelectCurrency}
              />
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

        <div className="mt-5 w-full flex flex-col items-center">
          <p className="text-[#7F7F7F] text-sm mb-2 2xl:mb-4">Total Amount</p>
          <p className="text-primary text-3xl font-bold mb-2">€999.99</p>
          <Button
            type={"outline"}
            onClick={handleProceedToQr}
            className="!pointer-events-auto"
          >
            PAY NOW
          </Button>
          <div className="flex justify-center gap-2 text-[#7F7F7F] mt-6">
            <img src="/images/icons/lock.svg" alt="" className="size-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CurrencyOptions = ({ selectedCurrency, onSelectCurrency }) => {
  return (
    <div className="absolute w-full mt-2 bg-[#171717] rounded-lg z-10">
      <div
        className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto rounded-t-lg"
        onClick={() => onSelectCurrency("USDT")}
      >
        <div className="rounded-full flex items-center justify-center">
          <img src="/images/icons/USDT.svg" alt="" className="size-6" />
        </div>
        <span>USDT</span>
        {selectedCurrency === "USDT" && (
          <LuCheck className="ml-auto text-[#F47C5D]" />
        )}
      </div>

      <div
        className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto"
        onClick={() => onSelectCurrency("BTC")}
      >
        <div className="rounded-full flex items-center justify-center">
          <img src="/images/icons/BTC.svg" alt="" className="size-6" />
        </div>
        <span>BTC</span>
        {selectedCurrency === "BTC" && (
          <LuCheck className="ml-auto text-[#F47C5D]" />
        )}
      </div>

      <div
        className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto rounded-b-lg"
        onClick={() => onSelectCurrency("ETH")}
      >
        <div className="rounded-full flex items-center justify-center">
          <img src="/images/icons/ETH.svg" alt="" className="size-6" />
        </div>
        <span>ETH</span>
        {selectedCurrency === "ETH" && (
          <LuCheck className="ml-auto text-[#F47C5D]" />
        )}
      </div>
    </div>
  );
};

export default MPaymentMethods;
