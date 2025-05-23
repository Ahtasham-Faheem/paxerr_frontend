"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { SiTrustpilot } from "react-icons/si";
import { PiShoppingCartSimpleFill, PiCheck } from "react-icons/pi";
import Link from "next/link";

const words = ["DESIGN", "DEVELOP", "AUTOMATE"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(531);
  const [mbWidth, setMbWidth] = useState(180);
  const textRef = useRef(null);
  const mbtextRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
      setMbWidth(mbtextRef.current.offsetWidth);
    }
  }, [index]); // Recalculate width on index change

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full">
      <div className="text-center lg:text-left">
        <div className="hidden lg:block">
          <div className="flex justify-center lg:justify-start items-end">
            <SiTrustpilot size={24} color="#EB5939" />
            <span className="leading-none font-semibold">Trustpilot</span>
          </div>
          <div className="flex justify-center lg:justify-start items-center gap-0.5 mt-1 mb-4">
            <span className="bg-primary text-white p-[3px]">
              <SiTrustpilot size={12} />
            </span>
            <span className="bg-primary text-white p-[3px]">
              <SiTrustpilot size={12} />
            </span>
            <span className="bg-primary text-white p-[3px]">
              <SiTrustpilot size={12} />
            </span>
            <span className="bg-primary text-white p-[3px]">
              <SiTrustpilot size={12} />
            </span>
            <span className="bg-[image:linear-gradient(to_right,#eb5939_0%,#eb5939_50%,#bababa_50%,#bababa_100%)] text-white p-[3px]">
              <SiTrustpilot size={12} />
            </span>
          </div>
          <div className="text-[#3E3E3E] flex justify-center lg:justify-start items-center gap-2 lg:gap-4">
            <PiShoppingCartSimpleFill size={16} />
            <p className="text-xs lg:text-sm">1,459+ Orders Completed</p>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-8xl 2xl:text-h2 font-primary lg:-ml-3">
          WE
          {/* this span to change change into design, develop, automate. it will keep changing the text. */}
          <Link
            href="/order/new"
            className="hidden btn ml-4 bg-primary text-[#0D0D0D] transition-all duration-300 lg:inline-flex items-center justify-center"
            style={{ width: width, transition: "width 0.5s ease-in-out" }}
          >
            <span
              ref={textRef}
              className="transition-all duration-1000 opacity-0 animate-fade p-2 max-lg:pb-1 lg:py-4 lg:px-6"
            >
              {words[index]}
            </span>
          </Link>
          {/* For mobile */}
          <Link
            href="/order/new"
            className="lg:hidden btn ml-4 bg-primary text-[#0D0D0D] transition-all duration-300 inline-flex items-center justify-center"
            style={{ width: mbWidth, transition: "width 0.5s ease-in-out" }}
          >
            <span
              ref={mbtextRef}
              className="transition-all duration-1000 opacity-0 animate-fade p-2 max-lg:pb-1 lg:py-4 lg:px-6"
            >
              {words[index]}
            </span>
          </Link>
          <br /> YOU DOMINATE
        </h1>
        <p className="hidden lg:block mx-auto lg:mx-0 text-xs lg:text-lg 2xl:text-2xl text-[#7F7F7F]">
          High-end designs, custom websites, software & powerful automation —
          all in one place. <br /> Unlimited revisions & a full refund if you're
          not 100% satisfied.
        </p>
        <p className="lg:hidden mt-1 px-6 text-sm">
          Custom websites, software & automation designed to perfection.
          Unlimited revisions & a full refund guarantee.
        </p>
        <div className="hidden lg:flex justify-center lg:justify-start items-center gap-4 lg:gap-8 my-2 lg:my-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <PiCheck size={12} color={"#EB5939"} />
            <p className="text-[#3E3E3E]">Unlimited Revisions</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <PiCheck size={12} color={"#EB5939"} />
            <p className="text-[#3E3E3E]">100% Refund Guarantee</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <PiCheck size={12} color={"#EB5939"} />
            <p className="text-[#3E3E3E]">50% Off for Delays</p>
          </div>
        </div>
        <Button href="/order/new" className="hidden lg:block mt-8 mx-0">
          Build Now
        </Button>
        <Button href="/order/new" className="lg:hidden mt-4 mx-auto">
          Get Quote
        </Button>
      </div>
    </main>
  );
}
