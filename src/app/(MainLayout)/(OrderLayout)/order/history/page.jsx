"use client";

import React, { useEffect, useState } from "react";
import FilterSelect from "@/components/history/FilterSelect";
import OrderItem from "@/components/history/OrderItem";
import Pagination from "@/components/history/Pagination";
import EmptyState from "@/components/history/EmptyState";
import { useMediaQuery } from "@/components/history/hooks/useMediaQuery";
import MOrderDetails from "@/components/history/mobile/MOrderDetails";
import axios from "axios";


// Mobile-specific components (placeholder imports)
// import MobileOrderItem from "@/components/history/mobile/MobileOrderItem";
// import MobileFilters from "@/components/history/mobile/MobileFilters";
// import MobilePagination from "@/components/history/mobile/MobilePagination";

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);
  const token = localStorage.getItem("token");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4);

  // State for filtering
  const [statusFilter, setStatusFilter] = useState("All Orders");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Check if the screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State for mobile filter drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter order data
  const filteredOrders = React.useMemo(() => {
    return allOrders.filter((order) => {
      // Apply status filter
      const statusMatch =
        statusFilter === "All Orders" || order.status?.toLowerCase() === statusFilter.toLowerCase();

      const categoryMatch =
        categoryFilter === "All Categories" || order.category?.toLowerCase() === categoryFilter.toLowerCase();
      // Apply search filter (case insensitive)
      const searchMatch =
        searchQuery === "" ||
        order.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.toLowerCase().includes(searchQuery.toLowerCase());

      return statusMatch && categoryMatch && searchMatch;
    });
  }, [allOrders, statusFilter, categoryFilter, searchQuery]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // Get unique categories and statuses for filters
  const categories = React.useMemo(() => {
    return [
      "All Categories",
      ...new Set(allOrders.map((order) => order.category)),
    ];
  }, [allOrders]);

  const statuses = React.useMemo(() => {
    return [
      "All Orders",
      ...new Set(allOrders.map((order) => order.status)),
    ];
  }, [allOrders]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Reset pagination when filters change
  useEffect(() => {
    if (currentPage > Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage(1); // Reset to page 1 if current page exceeds total pages
    }
  }, [filteredOrders, currentPage, ordersPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Reference to track if we have orders
  const hasOrders = allOrders.length > 0;

  // Handle filter changes
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  // Toggle mobile filter drawer
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
                {/* Status Filter */}
                <div className="text-[#7F7F7F]">
                  <FilterSelect
                    value={statusFilter}
                    options={statuses}
                    onChange={handleStatusChange}
                  />
                </div>

                {/* Category Filter */}
                <div className="ml-5 text-[#7F7F7F]">
                  <FilterSelect
                    value={categoryFilter}
                    options={categories}
                    onChange={handleCategoryChange}
                  />
                </div>
              </div>
              <div className="2xl:space-y-4 py-2 sm:py-4 2xl:py-8 w-full h-full divide-y-2 divide-[#171717]">
                {currentOrders.map((order) => (
                  <OrderItem key={order.id} order={order} isMobile={false} />
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
