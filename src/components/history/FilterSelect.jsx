"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";

const FilterSelect = ({ value, options, onChange, label }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setShowOptions(false);
  };

  return (
    <div className="w-full relative">
      {label && <p className="text-sm mb-2">{label}</p>}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center justify-between w-full bg-[#171717] rounded-full p-2.5 !pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="px-3 text-xs 2xl:text-base">{value}</span>
        </div>
        <div className="px-3">
          <LuChevronDown />
        </div>
      </button>

      <div
        className={`${
          showOptions
            ? "opacity-100 scale-100 translate-y-0 z-50"
            : "opacity-0 scale-95 -translate-y-2 !pointer-events-none"
        } absolute w-full mt-2 bg-[#171717] rounded-lg z-10 transition-all duration-300`}
      >
        {options.map((option, index) => (
          <button
            key={option}
            className={`w-full flex items-center gap-3 p-3 hover:bg-[#252525] cursor-pointer text-xs 2xl:text-base duration-500 capitalize ${
              index === 0 ? "rounded-t-lg" : ""
            } ${index === options.length - 1 ? "rounded-b-lg" : ""} ${
              showOptions ? "!pointer-events-auto" : "!pointer-events-none"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <span>{option}</span>
            {value === option && <FaCheck className="ml-auto text-[#F47C5D]" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelect;
