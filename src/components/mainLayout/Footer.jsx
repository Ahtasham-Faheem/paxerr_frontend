"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiLogoDiscordAlt, BiLogoTelegram } from "react-icons/bi";
import { SiTrustpilot } from "react-icons/si";
import { PiPaperPlaneRightFill } from "react-icons/pi";

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  };
  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <Link
        href="/"
        className="hidden lg:block absolute size-11 lg:size-16 2xl:size-24 bg-primary rounded-full  lg:bottom-8 2xl:bottom-12 left-8 2xl:left-12"
      ></Link>
      <div className="hidden lg:block relative h-20 lg:h-36">
        <div className="absolute bottom-5 max-lg:px-6 xl:pl-48 lg:pr-8 2xl:pr-16 w-full flex justify-between items-center gap-4">
          <img
            className="h-4 lg:h-auto"
            src="/images/shapes/shape-bml.svg"
            alt=""
          />
          <img className="h-2 lg:h-auto" src="/images/shapes/plus.svg" alt="" />
          <span className="bg-transparent lg:bg-[#1A1A1A] h-[5px] w-full rounded-full flex-1"></span>
          <img
            className="hidden lg:block"
            src="/images/shapes/plus.svg"
            alt=""
          />
          <p className="2xl:px-4 text-[#262626] text-xs lg:text-lg 2xl:text-xl text-nowrap">
            {formatTime(time)}
          </p>
          <img
            className="hidden lg:block"
            src="/images/shapes/plus.svg"
            alt=""
          />
          <span className="bg-transparent lg:bg-[#1A1A1A] h-[5px] w-full rounded-full flex-1"></span>
          <img className="h-2 lg:h-auto" src="/images/shapes/plus.svg" alt="" />
          <img
            className="h-4 lg:h-auto lg:-mr-4"
            src="/images/shapes/shape-bmr.svg"
            alt=""
          />
          <div className="hidden bg-[url(/images/shapes/icon-bg.svg)] 2xl:bg-bottom bg-no-repeat lg:min-w-[300px] 2xl:h-20 lg:flex justify-center items-center gap-3 lg:gap-6 pt-4">
            <Link href={"/order/service"} className="flex gap-4 items-center">
              <PiPaperPlaneRightFill size={32} className="text-primary" />
              <span className="text-[#7F7F7F] font-semibold">Live Chat</span>
            </Link>
          </div>
          <img
            className="hidden lg:block"
            src="/images/shapes/shape-br.svg"
            alt=""
          />
        </div>
        {/* Mobile Social Icons */}
        <div className="relative">
          <div className="lg:hidden absolute -left-12 bottom-20 w-36 bg-[url(/images/shapes/icon-bg.svg)] bg-center bg-cover bg-no-repeat flex justify-center items-center gap-3 text-primary pt-4 rotate-90">
            <Link
              href={"https://discord.com/invite/bAAt5HsPy4"}
              target="_blank"
            >
              <BiLogoDiscordAlt size={20} />
            </Link>
            <Link href={"https://t.me/PaxerrPro"} target="_blank">
              <BiLogoTelegram size={20} />
            </Link>
            <Link
              href={"https://www.trustpilot.com/review/paxerr.com"}
              target="_blank"
            >
              <SiTrustpilot size={20} />
            </Link>
          </div>
        </div>
        <img
          className="h-4 lg:hidden rotate-90 absolute left-1 top-32"
          src="/images/shapes/shape-bmr.svg"
          alt=""
        />
        <img
          className="h-2 lg:hidden rotate-90 absolute left-6 top-44"
          src="/images/shapes/plus.svg"
          alt=""
        />
      </div>
    </footer>
  );
};

export default Footer;
