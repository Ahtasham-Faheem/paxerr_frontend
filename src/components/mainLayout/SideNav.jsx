import React from "react";
import Link from "next/link";

const SideNav = () => {
  return (
    <div className="h-full w-fit fixed top-28 right-2 lg:right-8 2xl:right-12">
      <ul className="flex flex-col justify-start items-center gap-16 lg:gap-28">
        <Link
          href="/signin"
          className="text-sm lg:text-xl font-primary rotate-90 hover:text-primary duration-300"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-sm lg:text-xl font-primary rotate-90 hover:text-primary duration-300"
        >
          Sign Up
        </Link>
      </ul>
    </div>
  );
};

export default SideNav;
