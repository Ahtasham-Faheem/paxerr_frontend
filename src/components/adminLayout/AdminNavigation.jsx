"use client";

import React from "react";
import Link from "next/link";
import { FaUsers } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { useScrollContext } from "@/utils/ScrollContext";

const AdminNavigation = () => {
  const pathname = usePathname();
  const { hidden } = useScrollContext();

  return (
    <>
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center pb-16 gap-10">
        <img
          src="/images/shapes/sidebarbg.svg"
          alt="Sidebar background"
          className="absolute left-5 z-0"
        />
        <div className="flex flex-col pl-10 items-center gap-4 z-10">
          <Link
            href={"/admin/dashboard"}
            className={`size-16 rounded-lg bg-[url(/images/shapes/hexabg.svg)] bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/dashboard" && "text-[#E75F34]"
            }`}
            aria-current={pathname === "/admin/dashboard" ? "page" : undefined}
          >
            <IoGrid size={24} />
          </Link>

          <Link
            href={"/admin/order"}
            className={`size-16 rounded-lg bg-[url(/images/shapes/hexabg.svg)] bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/order" && "text-[#E75F34]"
            }`}
            aria-current={pathname === "/admin/order" ? "page" : undefined}
          >
            <PiShoppingCartSimpleFill size={24} />
          </Link>

          <Link
            href={"/admin/client"}
            className={`size-16 rounded-lg bg-[url(/images/shapes/hexabg.svg)] bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/client" && "text-[#E75F34]"
            }`}
            aria-current={pathname === "/admin/client" ? "page" : undefined}
          >
            <FaUsers size={24} />
          </Link>
        </div>
      </div>
      {/* Mobile */}
      <div
        className={`lg:hidden fixed z-50 bottom-0 left-0 right-0 mx-auto items-center justify-center gap-10 transition-transform duration-300 ${
          hidden ? "translate-y-full" : "translate-y-0"
        } ${pathname === "/admin/dashboard" && "hidden"}`}
      >
        <img
          src="/images/shapes/sidebarbg-mobile.svg"
          alt="Sidebar background"
          className="absolute left-0 right-0 mx-auto -z-10"
        />
        <div className="flex justify-center items-center gap-4 z-10 text-[#BABABA]">
          <Link
            href={"/admin/dashboard"}
            className={`size-16 rounded-lg bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/dashboard" && "text-primary"
            }`}
            aria-current={pathname === "/admin/dashboard" ? "page" : undefined}
          >
            <IoGrid size={24} />
          </Link>

          <Link
            href={"/admin/order"}
            className={`size-16 rounded-lg bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/order" && "text-primary"
            }`}
            aria-current={pathname === "/admin/order" ? "page" : undefined}
          >
            <PiShoppingCartSimpleFill size={24} />
          </Link>
          <Link
            href={"/admin/client"}
            className={`size-16 rounded-lg bg-cover flex items-center justify-center duration-300 hover:text-primary/80 ${
              pathname === "/admin/client" && "text-primary"
            }`}
            aria-current={pathname === "/admin/client" ? "page" : undefined}
          >
            <FaUsers size={24} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminNavigation;
