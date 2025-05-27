import React, { useEffect, useState } from "react";
import StatusCard from "../dashboard/StatusCard";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { IoDiamond, IoSend } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import axios from "axios";

const CardsSection = () => {
  const [dashboardValues, setDashboardValues] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // early exit if token not available

    const fetchDashboardData = async () => {
      try {
        const ordersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('consoel', ordersRes.data)
        setDashboardValues(ordersRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed:", err);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
      {/* Total Clients */}
      <StatusCard
        icon={<FaUsers size={32} className="size-5 lg:size-auto" />}
        label="Total Clients"
        value={120}
      />

      {/* Total Orders (+% increase this week/month) */}
      <StatusCard
        icon={
          <PiShoppingCartSimpleFill size={32} className="size-5 lg:size-auto" />
        }
        label="Total Orders"
        value={dashboardValues?.total_orders}
        subtext="+12%"
      />

      {/* Messages This Week/Month */}
      <StatusCard
        icon={<IoSend size={32} className="size-5 lg:size-auto" />}
        label="Weekly Messages"
        value={dashboardValues?.total_messages}
      />

      {/* Revision Usage (total + average per order) */}
      <StatusCard
        icon={
          <img
            src="/images/icons/rotate.svg"
            alt=""
            className="size-5 lg:size-auto"
          />
        }
        label="Revision Usage"
        value={dashboardValues?.total_revisions}
        subtext="1.8/order"
      />

      {/* Total Revenue (lifetime + past 30 days) */}
      <StatusCard
        icon={<IoDiamond size={32} className="size-5 lg:size-auto" />}
        label="Total Revenue"
        value="$18,750"
        subtext="$3,200 past 30 days"
      />

      {/* Active vs Completed Orders (% + ratio) */}
      <StatusCard
        icon={
          <BiSolidCircleThreeQuarter
            size={32}
            className="size-5 lg:size-auto"
          />
        }
        label="Orders Status"
        value={`${dashboardValues?.order_change_percent}`}
        subtext="26/48"
      />
    </div>
  );
};

export default CardsSection;
