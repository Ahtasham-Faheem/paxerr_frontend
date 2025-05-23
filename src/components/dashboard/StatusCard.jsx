import React from "react";

const StatusCard = ({ icon, label, value }) => {
  // For Lifetime Value, we need to split the number into main part and decimal part
  const formattedLifetimeValue = () => {
    if (label === "Lifetime Value") {
      // If the value is already formatted as a string with €, parse it first
      const numericValue =
        typeof value === "string"
          ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
          : value;

      // Format with thousands separator (comma)
      const formattedNum = numericValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      });

      // Split into parts before and after decimal point
      const [wholePart, decimalPart] = formattedNum.split(".");

      // Return parts separately to allow for different styling
      return {
        prefix: "€",
        wholePart,
        decimalPart,
      };
    }
    return null;
  };

  // Get formatted value or return original
  const getValue = () => {
    const lifetimeValue = formattedLifetimeValue();
    if (lifetimeValue) {
      return (
        <span className="flex items-baseline">
          {lifetimeValue.prefix}
          {lifetimeValue.wholePart}
          <span className="text-[0.5em]">.{lifetimeValue.decimalPart}</span>
        </span>
      );
    }
    return value;
  };

  return (
    <div className="card-bg relative w-full flex flex-col justify-center items-center gap-2 2xl:gap-4 py-6 lg:py-10 2xl:py-14">
      <span className="absolute -top-4 left-0 right-0 mx-auto w-fit text-primary">
        {icon}
      </span>
      <p className="text-sm 2xl:text-base text-[#7F7F7F]">{label}</p>
      <h3 className="text-3xl 2xl:text-5xl font-bold">
        {getValue()}
      </h3>
      {label === "Total Orders" && (
        <div className="scale-75 lg:scale-auto absolute bottom-2 lg:bottom-4 flex justify-center items-center gap-2 mx-auto w-fit text-primary">
          <img src="/images/icons/trending.svg" alt="" />
          <span className="text-sm text-[#27AE60]">+46%</span>
        </div>
      )}
    </div>
  );
};

export default StatusCard;
