import Link from "next/link";
import React from "react";

const Button = ({ children, className, href, onClick, target, type }) => {
  return (
    <div className={`relative w-fit group text-center ${className}`}>
      {!!href ? (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          className={`btn block px-5 font-tomorrow uppercase cursor-pointer ${
            type === "outline"
              ? "text-primary group-hover:!bg-primary group-hover:!text-white duration-300 py-1.5 lg:py-3 px-3 lg:px-8 text-xs lg:text-sm"
              : "bg-primary text-white py-2.5 lg:py-5 lg:px-10 2xl:px-14 text-xs lg:text-lg"
          }`}
        >
          /// {children} _
        </Link>
      ) : type === "send" ? (
        <button
          onClick={onClick}
          className={`btn flex items-center gap-4 font-tomorrow uppercase cursor-pointer text-primary duration-300 py-1.5 lg:py-5 px-3 lg:px-6 text-xs lg:text-sm`}
        >
          /// {children}
          <span>
            <img src="/images/icons/enter.svg" alt="" className="size-4" />
          </span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className={`btn w-full font-tomorrow uppercase cursor-pointer ${
            type === "outline"
              ? "text-primary group-hover:!bg-primary group-hover:!text-white duration-300 py-1.5 lg:py-3 px-3 lg:px-8 text-xs lg:text-sm"
              : "bg-primary text-white py-2.5 px-5 lg:px-8 text-xs lg:text-sm"
          }`}
        >
          /// {children} _
        </button>
      )}
      <span
        className={`${
          type === "send" && "hidden"
        } border-l border-b border-primary absolute -left-2 -bottom-2 group-hover:-left-0 group-hover:-bottom-0 transition-all duration-300`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Bottom Corner"
            d="M15.5 15.5L0.5 15.5L0.500001 0.499999"
            stroke="#EB5939"
          />
        </svg>
      </span>
      <span
        className={`${
          type === "send" && "hidden"
        } border-l border-b border-primary absolute -top-2 -right-2 rotate-180 group-hover:-top-0 group-hover:-right-0 transition-all duration-300`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Bottom Corner"
            d="M15.5 15.5L0.5 15.5L0.500001 0.499999"
            stroke="#EB5939"
          />
        </svg>
      </span>
      <span
        className={`${
          (type === "outline" || type === "send") && "hidden"
        } absolute -top-2 -left-2 group-hover:animate-spin`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-lg:size-[10px]"
        >
          <g id="Plus Symbol">
            <rect
              id="Rectangle 2"
              x="10"
              width="15"
              height="5"
              rx="2.5"
              transform="rotate(90 10 0)"
              fill="#EB5939"
            />
            <rect
              id="Rectangle 3"
              x="15"
              y="10"
              width="15"
              height="5"
              rx="2.5"
              transform="rotate(-180 15 10)"
              fill="#EB5939"
            />
          </g>
        </svg>
      </span>
    </div>
  );
};

export default Button;
