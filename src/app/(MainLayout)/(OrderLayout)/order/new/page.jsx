import React from "react";
import Button from "@/components/ui/Button";
import { LuHexagon } from "react-icons/lu";
import Link from "next/link";

const NewOrder = () => {
  return (
    <>
      <div className="hidden fixed lg:top-20 2xl:top-36 left-0 right-0 mx-auto lg:flex justify-center items-center gap-10 lg:gap-16 2xl:gap-20">
        <p>Choose a category</p>
        <p className="text-[#7F7F7F]">Chat with an expert</p>
        <p className="text-[#7F7F7F]">Complete Order</p>
      </div>
      <div className="hidden max-w-[430px] fixed lg:top-28 2xl:top-42 left-0 right-0 mx-auto lg:flex justify-center items-center">
        <LuHexagon size={20} className="size-10 text-primary" />
        <span className="h-px w-full bg-[#7F7F7F]"></span>
        <LuHexagon size={20} className="size-10" />
        <span className="h-px w-full bg-[#7F7F7F]"></span>
        <LuHexagon size={20} className="size-10" />
      </div>
      <div className="lg:mt-20 flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32">
        <Link href="/order/service" className="relative w-xs lg:w-lg text-center">
          <img
            className="size-8 lg:size-auto absolute z-50 -top-6 lg:-top-12 left-0 right-0 mx-auto"
            src="/images/icons/pen.svg"
            alt=""
          />
          <div className="form-bg bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8">
            <h3 className="text-lg lg:text-3xl font-bold">Design</h3>
            <p className="mt-2 lg:mt-4 text-[#7F7F7F] max-lg:text-xs mx-auto">
              Get an instant quote and deadline from our live team. We create
              logos, UI/UX, ads, and complete redesigns.
            </p>
            <Button
              type={"outline"}
              className="max-lg:hidden mt-4 mb-0 lg:my-4 2xl:my-8 w-[190px] mx-auto"
            >
              Chat Now
            </Button>
          </div>
        </Link>
        <Link href="/order/service" className="relative w-xs lg:w-lg text-center">
          <img
            className="size-8 lg:size-auto absolute z-50 -top-6 lg:-top-12 left-0 right-0 mx-auto"
            src="/images/icons/dev.svg"
            alt=""
          />
          <div className="form-bg bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8">
            <h3 className="text-lg lg:text-3xl font-bold">Development</h3>
            <p className="mt-2 lg:mt-4 text-[#7F7F7F] max-lg:text-xs mx-auto">
              Get a custom website, app, or automation. Talk to our team for an
              instant quote and deadline.
            </p>
            <Button
              type={"outline"}
              className="max-lg:hidden mt-4 mb-0 lg:my-4 2xl:my-8 w-[190px] mx-auto"
            >
              Chat Now
            </Button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NewOrder;
