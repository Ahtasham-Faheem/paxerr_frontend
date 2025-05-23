"use client";
import React from "react";
import { useScrollContext } from "@/utils/ScrollContext";
import { FaBell, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopNavigation = () => {
  const { hidden } = useScrollContext();
  const pathname = usePathname();
  return (
    <div
      className={`fixed z-50 top-3.5 lg:top-10 lg:right-12 w-full flex justify-between lg:justify-end items-center gap-2 lg:gap-4 transition-transform duration-300 max-lg:px-4 ${
        hidden ? "-translate-y-16" : "translate-y-0"
      } ${pathname === "/order/service" && "hidden"}`}
    >
      <Link
        href="/"
        className="lg:hidden size-10 bg-primary rounded-full "
      ></Link>
      <div className="flex gap-2 lg:gap-4 justify-end">
        <div className="bg-[#17171780] p-3 rounded-full">
          <FaEnvelope
            className="text-gray-300 hover:text-primary cursor-pointer"
            size={20}
          />
        </div>

        <div className="bg-[#17171780] p-3 rounded-full">
          <FaBell
            className="text-gray-300 hover:text-primary cursor-pointer"
            size={20}
          />
        </div>

        <div className="size-10.5 border-2 border-[#171717] rounded-full flex items-center justify-center text-primary text-xl font-primary relative">
          A
          <span className="absolute bottom-0 right-0 size-2.5 bg-[#33D256] rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
