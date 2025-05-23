"use client";
import React, { useEffect, useState } from "react";
import { PiShoppingCartSimpleFill, PiTimerFill } from "react-icons/pi";
import { IoSend, IoDiamond } from "react-icons/io5";
import StatusCard from "@/components/dashboard/StatusCard";
import axios from "axios";
import ProjectsList from "@/components/dashboard/ProjectsList";
import OrdersChart from "@/components/dashboard/OrdersChart";
import DeadlineProgress from "@/components/dashboard/DeadlineProgress";
import { useScrollContext } from "@/utils/ScrollContext";
import api from "@/utils/axiosInstance";


const DashboardPage = () => {
  const [dashboardValues, setDashboardValues] = useState([]);
  const token = localStorage.getItem("token");
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    canceled: 0,
    processing: 0,
    in_progress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const statusCounts = {
          canceled: 0,
          processing: 0,
          in_progress: 0,
          completed: 0,
        };

        res.data.forEach((order) => {
          const status = order.status?.toLowerCase();
          if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
          }
        });

        setOrderStatusCounts(statusCounts);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  useEffect(() => {

    if (!token) return; // early exit if token not available

    const fetchDashboardData = async () => {
      try {
        const ordersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardValues(ordersRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      // onScroll={handleScroll}
      className="2xl:-mt-28 2xl:max-w-[1536px] w-full flex flex-col flex-1 max-h-screen lg:max-h-[500px] 2xl:max-h-[800px] gap-4 2xl:gap-10 max-lg:!pointer-events-auto max-lg:!overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="flex-1 grid lg:grid-flow-col grid-rows-1 lg:grid-rows-3 gap-4 max-lg:my-20">
        {/* Title and Status Cards */}
        <div className="max-lg:min-h-dvh row-span-1 flex flex-col gap-4 2xl:gap-10">
          <h3 className="hidden lg:block text-primary font-primary text-lg lg:text-2xl 2xl:text-5xl text-center">
            BOSS
          </h3>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-8 max-lg:py-8">
            <StatusCard
              icon={
                <PiShoppingCartSimpleFill
                  size={32}
                  className="size-5 lg:size-auto"
                />
              }
              label={"Total Orders"}
              value={dashboardValues.total_orders}
            />
            <StatusCard
              icon={<IoSend size={32} className="size-5 lg:size-auto" />}
              label={"Total Messages"}
              value={dashboardValues.total_messages}
            />
            <StatusCard
              icon={
                <img
                  src="/images/icons/rotate.svg"
                  alt=""
                  className="size-5 lg:size-auto"
                />
              }
              label={"Total Revisions"}
              value={dashboardValues.total_revisions}
            />
            <StatusCard
              icon={<IoDiamond size={32} className="size-5 lg:size-auto" />}
              label={"Lifetime Value"}
              value={`€${dashboardValues.lifetime_value}` || `€0.00`}
            />
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="relative row-span-2 grid grid-cols-1 lg:grid-cols-16 gap-8 overflow-hidden">
          {/* Projects List */}
          <div className="relative col-span-1 lg:col-span-10 lg:flex flex-1 w-full h-full justify-center items-center project-bg overflow-y-auto">
            <ProjectsList />
          </div>

          {/* Stats Column */}
          <div className="col-span-1 lg:col-span-6 w-full h-full flex flex-col justify-center items-center !pointer-events-auto max-lg:gap-4">
            {/* Orders Chart */}
            <div className="stats-bg w-full h-full p-4 rounded-xl relative">
              <span className="absolute -top-0 left-0 right-0 mx-auto w-fit text-primary">
                <PiShoppingCartSimpleFill
                  size={32}
                  className="size-5 lg:size-auto"
                />
              </span>
              <OrdersChart orderStatusCounts={orderStatusCounts} />
            </div>

            {/* Deadline Progress */}
            <div className="stats-bg w-full h-full p-6 relative">
              <span className="absolute -top-0 left-0 right-0 mx-auto w-fit text-primary">
                <PiTimerFill size={32} className="size-5 lg:size-auto" />
              </span>
              <DeadlineProgress orderStatusCounts={orderStatusCounts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
