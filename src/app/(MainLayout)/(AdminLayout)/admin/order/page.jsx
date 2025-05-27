"use client";

import React, { useEffect, useMemo, useState } from "react";
import FilterSelect from "@/components/history/FilterSelect";
import OrderItem from "@/components/history/OrderItem";
import Pagination from "@/components/history/Pagination";
import EmptyState from "@/components/history/EmptyState";
import { useMediaQuery } from "@/components/history/hooks/useMediaQuery";
import MOrderDetails from "@/components/history/mobile/MOrderDetails";
import { LuSearch } from "react-icons/lu";
import axios from "axios";

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4);

  const [statusFilter, setStatusFilter] = useState("All Orders");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch real orders
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const statusMatch =
        statusFilter === "All Orders" ||
        order.status?.toLowerCase() === statusFilter.toLowerCase();

      const categoryMatch =
        categoryFilter === "All Categories" ||
        order.category?.toLowerCase() === categoryFilter.toLowerCase();

      const searchMatch =
        searchQuery === "" || order.id?.toString() === searchQuery.trim();

      return statusMatch && categoryMatch && searchMatch;
    });
  }, [allOrders, statusFilter, categoryFilter, searchQuery]);

  const categories = useMemo(() => {
    return ["All Categories", ...new Set(allOrders.map((order) => order.category))];
  }, [allOrders]);

  const statuses = useMemo(() => {
    return ["All Orders", ...new Set(allOrders.map((order) => order.status))];
  }, [allOrders]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    if (currentPage > Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage(1);
    }
  }, [filteredOrders, currentPage, ordersPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const hasOrders = allOrders.length > 0;

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  return (
    <div className="w-full h-[70vh] max-h-[720px] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-16">
      <div className="relative w-full h-full !pointer-events-auto hidden md:block">
        <img
          className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto hidden md:block"
          src="/images/icons/folder.svg"
          alt="Folder icon"
        />
        <div className="history-bg w-full max-w-[1328px] mx-auto h-full max-2xl:bg-[#17171791] backdrop-blur-xs flex flex-col px-3 sm:px-6 py-4 sm:py-8 justify-center items-center !pointer-events-auto">
          {hasOrders ? (
            <>
              <div className="w-full px-4 sm:px-16 gap-4 2xl:gap-6 flex justify-start items-center my-4">
                <div className="text-[#7F7F7F]">
                  <FilterSelect value={statusFilter} options={statuses} onChange={handleStatusChange} />
                </div>
                <div className="ml-5 text-[#7F7F7F]">
                  <FilterSelect value={categoryFilter} options={categories} onChange={handleCategoryChange} />
                </div>
                <div className="flex-1 flex gap-3">
                  <input
                    type="search"
                    id="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="!pointer-events-auto block px-6 py-3 w-fit ms-auto bg-[#171717] text-sm text-white rounded-full focus:outline-none"
                    placeholder="Search By Order ID"
                  />
                  <button>
                    <LuSearch size={30} className="text-primary" />
                  </button>
                </div>
              </div>
              <div className="2xl:space-y-4 py-2 sm:py-4 2xl:py-8 w-full h-full divide-y-2 divide-[#171717]">
                {currentOrders.map((order) => (
                  <OrderItem key={order.id} order={order} isMobile={false} admin={true} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isMobile={isMobile}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div className="h-full w-full mx-auto flex flex-col items-center justify-center md:hidden !pointer-events-auto">
        <MOrderDetails />
      </div>
    </div>
  );
};

export default OrderHistory;
