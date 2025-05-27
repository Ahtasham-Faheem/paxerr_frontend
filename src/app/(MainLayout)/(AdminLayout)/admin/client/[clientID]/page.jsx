"use client";

import React, { useState } from "react";
import ProfileTab from "@/components/adminLayout/Tabs/ProfileTab";
import OrderTab from "@/components/adminLayout/Tabs/OrderTab";
import PaymentsTab from "@/components/adminLayout/Tabs/PaymentsTab";
import EditTab from "@/components/adminLayout/Tabs/EditTab";

const tabs = ["Profile", "Orders", "Payments", "Edit"];

const ClientDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Orders":
        return <OrderTab />;
      case "Payments":
        return <PaymentsTab />;
      case "Edit":
        return <EditTab />;
    }
  };

  return (
    <main className="w-full">
      <div className="w-fit mx-auto flex space-x-4 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium transition duration-200 ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="shadow rounded-lg p-6">{renderTabContent()}</div>
    </main>
  );
};

export default ClientDetailsPage;
