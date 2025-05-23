"use client";
import React, { Suspense } from "react";
import ChatWaitingScreen from "@/components/blocks/ChatWaitingScreen";
import OrderScreen from "@/components/blocks/OrderScreen";
import { LuHexagon } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import MChatWaitingScreen from "@/components/blocks/mobile/MChatWaitingScreen";

// Extract logic that uses useSearchParams
function ServiceContent({ defaultState = "summary" }) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const initialState =
    status !== "completed" && status !== "pending" && status !== "canceled"
      ? defaultState
      : status;

  return (
    <section className="container mx-auto xl:max-2xl:scale-y-95 lg:mt-28 hidden lg:block">
      <div className="w-full h-[65vh] max-h-[622px] flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
        <ChatWaitingScreen />
        <OrderScreen initialState={initialState} />
      </div>
    </section>
  );
}

// Mobile chat component wrapper - shows the mobile version of the chat
function MobileChatWrapper() {
  return (
    <div className="w-full h-svh pt-8 lg:hidden">
      <MChatWaitingScreen/>
    </div>
  );
}

const ServicePage = () => {
  return (
    <>
      {/* Header Steps - Only visible on desktop */}
      <div className="hidden fixed lg:top-20 2xl:top-36 left-0 right-0 mx-auto lg:flex justify-center items-center gap-10 lg:gap-16 2xl:gap-20">
        <p>Choose a category</p>
        <p className="text-[#7F7F7F]">Chat with an expert</p>
        <p className="text-[#7F7F7F]">Complete Order</p>
      </div>

      <div className="hidden max-w-[430px] fixed lg:top-28 2xl:top-42 left-0 right-0 mx-auto lg:flex justify-center items-center">
        <LuHexagon size={20} fill="#eb5939" className="size-10 text-primary" />
        <span className="h-px w-full bg-primary"></span>
        <LuHexagon size={20} className="size-10 text-primary" />
        <span className="h-px w-full bg-[#7F7F7F]"></span>
        <LuHexagon size={20} className="size-10" />
      </div>

      {/* Mobile Chat UI */}
      <MobileChatWrapper />

      {/* Suspense-wrapped desktop section */}
      <Suspense
        fallback={
          <div className="text-white text-center hidden md:block">
            Loading...
          </div>
        }
      >
        <ServiceContent />
      </Suspense>
    </>
  );
};

export default ServicePage;
