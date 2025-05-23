"use client";

import { LuCheck } from "react-icons/lu";
import Button from "../ui/Button";
import SecurePaymentFooter from "./SecurePaymentFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOrder } from "@/context/OrderContext";

const PaymentMethods = ({
  state,
  onToggleCurrencyOptions,
  onSelectCurrency,
  onShowQrPayment,
}) => {
  const { selectedOrder } = useOrder();
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/currencies/`)
      .then((res) => {
        setAvailableCurrencies(res.data.currencies);
      })
      .catch((err) => {
        console.error("Failed to fetch currencies", err);
      });
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmail(res.data.email || "");
      } catch (error) {
        console.error("Failed to fetch profile email", error);
      }
    };
    fetchEmail();
  }, []);
  const handleCreatePayment = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create/`, {
        order_id: "ORD123456",
        amount: "999.99",
        crypto_currency: state.selectedCurrency,
      });

      const paymentData = response.data;

      onShowQrPayment(paymentData); // You can pass the QR code url to next modal/screen
    } catch (error) {
      console.error("Payment creation failed", error);
      alert("Payment failed. Try again!");
    }
  };

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
      <div className="order-bg w-full h-fulla max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-8 2xl:pt-12 px-5 lg:px-8 flex flex-col">
        <div className="flex flex-col items-center xl:max-2xl:scale-y-95">
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold mt-3 mb-2 2xl:mb-6">
            Payment Methods
          </h2>

          <div className="w-full mb-2 2xl:mb-6">
            <p className="text-sm mb-2">Enter your e-mail</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail"
              className="w-full bg-[#171717] rounded-full px-5 py-2.5 2xl:px-8 2xl:py-4 text-sm focus:outline-none focus:ring-0"
            />
          </div>

          <div className="w-full mb-2 2xl:mb-6 relative">
            <p className="text-sm mb-2">Select payment currency</p>
            <button
              onClick={onToggleCurrencyOptions}
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
                onSelectCurrency={onSelectCurrency}
                availableCurrencies={availableCurrencies}
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

        <div className="mt-auto w-full flex flex-col items-center">
          <p className="text-[#7F7F7F] text-sm mb-2 2xl:mb-4">Total Amount</p>
          <p className="text-primary text-2xl 2xl:text-4xl font-bold mb-2 2xl:mb-4">
            €{selectedOrder?.price || "999.99"}
          </p>
          <Button
            type={"outline"}
            onClick={handleCreatePayment}
            className="2xl:mb-4"
          >
            PAY NOW
          </Button>
          <SecurePaymentFooter />
        </div>
      </div>
    </div>
  );
};

const CurrencyOptions = ({ selectedCurrency, onSelectCurrency, availableCurrencies }) => {
  return (
    <div className="absolute w-full mt-2 bg-[#171717] rounded-lg z-10 max-h-60 overflow-y-auto">
      {availableCurrencies.map(({ currency }) => (
        <div
          key={currency}
          className="flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer !pointer-events-auto"
          onClick={() => onSelectCurrency(currency)}
        >
          <div className="rounded-full flex items-center justify-center">
            <img src={`/images/icons/${currency.toUpperCase()}.svg`} alt="" className="size-6" />
          </div>
          <span>{currency.toUpperCase()}</span>
          {selectedCurrency === currency && (
            <LuCheck className="ml-auto text-[#F47C5D]" />
          )}
        </div>
      ))}
    </div>
  );
};


export default PaymentMethods;
