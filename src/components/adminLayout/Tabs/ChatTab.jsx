"use client";
import React, { Suspense } from "react";
import MChatWaitingScreen from "@/components/blocks/mobile/MChatWaitingScreen";
import AdminChatScreen from "@/components/adminLayout/AdminChatScreen";
import AdminOrderEditor from "@/components/adminLayout/AdminOrderEditor";

// Extract logic that uses useSearchParams
function ServiceContent() {
  return (
    <section className="container mx-auto xl:max-2xl:scale-y-95 lg:mt-20 hidden lg:block">
      <div className="w-full h-[75vh] max-h-[622px] flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
        <AdminChatScreen />
      </div>
    </section>
  );
}

// Mobile chat component wrapper - shows the mobile version of the chat
function MobileChatWrapper() {
  return (
    <div className="w-full h-svh pt-8 lg:hidden">
      <MChatWaitingScreen />
    </div>
  );
}

const ChatTab = () => {
  return (
    <>
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

export default ChatTab;
