"use client";

import { LuCheck, LuSquareArrowOutUpRight } from "react-icons/lu";
import SecurePaymentFooter from "./SecurePaymentFooter";
import Button from "../ui/Button";
import { useOrder } from "@/context/OrderContext";

const OrderSummary = ({ onToggleDescription, onShowPayment }) => {
  const { selectedOrder } = useOrder();
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
            <p>{selectedOrder?.category || "Development"}</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Order ID</p>
            <p>{selectedOrder?.id || "550e8400-e29b-41d4-a716-446655440000"}</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Description</p>
            <button
              onClick={onToggleDescription}
              className="hover:text-primary transition-colors"
            >
              <LuSquareArrowOutUpRight />
            </button>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Creation Date</p>
            <p>{new Date(selectedOrder?.creation_date).toLocaleDateString("en-GB") || "11/11/1111"}</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Estimated Delivery Date</p>
            <p>{new Date(selectedOrder?.creation_date).toLocaleDateString("en-GB") || "11/11/1111"}</p>
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
            €{selectedOrder?.price || "999.99"}
          </p>
          <Button
            type={"outline"}
            onClick={onShowPayment}
            className="max-lg:hidden mt-4 mb-0 lg:my-4 w-[190px] mx-auto"
          >
            Confirm
          </Button>
          <SecurePaymentFooter />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
