"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";

const clients = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    totalSpend: "$2,500",
    ordersCount: 18,
    status: "Active",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    totalSpend: "$3,800",
    ordersCount: 24,
    status: "Inactive",
  },
  {
    id: 3,
    username: "mark_zane",
    email: "mark@example.com",
    totalSpend: "$1,200",
    ordersCount: 7,
    status: "Active",
  },
];

const ClientPage = () => {
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = useMemo(() => {
    return clients.filter((order) => {
      // Apply status filter
      if (filter === "Active Orders") return order.status === "Active";
      if (filter === "High Spenders")
        return parseInt(order.totalSpend.replace(/[^0-9]/g, "")) > 3000;
      if (filter === "Recently Active") return order.ordersCount > 10;

      // Apply search filter (case insensitive)
      return (
        searchQuery === "" ||
        order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [filter, searchQuery]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Manager</h1>

      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <select
            className="filter-btn px-4 py-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Clients</option>
            <option value="Active Orders">Active Orders</option>
            <option value="High Spenders">High Spenders</option>
            <option value="Recently Active">Recently Active</option>
          </select>
        </div>
        <div className="flex-1 flex gap-3">
          <input
            type="search"
            id="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!pointer-events-auto block px-6 py-3 w-fit ms-auto bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder="Search By Name/Email"
          />
          <button>
            <LuSearch size={30} className="text-primary" />
          </button>
        </div>
      </div>
      {/* Filters */}

      {/* Client Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Total Spend</th>
            <th className="px-4 py-2">Orders Count</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.username} className="border-t">
              <td className="px-4 py-2">{client.username}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.totalSpend}</td>
              <td className="px-4 py-2">{client.ordersCount}</td>
              <td
                className={`px-4 py-2 ${
                  client.status === "Active"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {client.status}
              </td>
              <td className="px-4 py-2">
                <Link
                  href={`/admin/client/${client.id}`}
                  className="text-blue-500 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ClientPage;
