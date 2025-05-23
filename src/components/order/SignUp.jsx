import React from "react";
import Link from "next/link";
import Button from "../ui/Button";

const SignUp = ({ onShowSignIn }) => {
  return (
    <div className="relative max-lg:w-xs w-[50%] text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-auto absolute z-50 -top-4 left-0 right-0 mx-auto"
        src="/images/icons/lock.svg"
        alt=""
      />
      <div className="form-bg bg-[#17171791] backdrop-blur-xs pt-12 2xl:pt-16 pb-4 2xl:pb-8">
        <h3 className="text-2xl lg:text-4xl font-bold">Sign Up</h3>
        <p className="mt-2 lg:mt-4 font-medium text-[#3E3E3E] w-[80%] lg:w-[50%] mx-auto">
          Sign up today and let's turn your vision into reality!
        </p>
        <form>
          <div className="my-4 lg:my-8 space-y-3 lg:space-y-6 px-6 lg:px-12">
            <div className="relative">
              <input
                type="email"
                id="email"
                className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Password
              </label>
            </div>
          </div>
        </form>
        <Button type={"outline"} className="my-4 2xl:my-8 mx-auto">
          Sign Up
        </Button>
      </div>
      <p className="text-[#3E3E3E] pt-4 lg:pt-8 max-lg:text-xs">
        Already have an account?{" "}
        <button onClick={onShowSignIn} className="text-[#BABABA] font-semibold">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
