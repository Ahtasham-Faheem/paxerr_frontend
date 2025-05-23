import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCloudArrowDown } from "react-icons/fa6";
import { LiaSpinnerSolid } from "react-icons/lia";

export default function OrderStatusIndicator({
  completed = false,
  canceled = false,
  daysLeft = 7,
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Only run the animation if we're not completed
    if (!completed) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 30) % 360);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [completed]);

  if (canceled === true && completed === false) {
    return (
      <div className="flex gap-5 items-center justify-between max-2xl:-mt-4 max-2xl:scale-75">
        <FaChevronLeft size={14} />
        <div className="flex flex-col items-center bg-black py-6 px-6 rounded-4xl justify-center space-y-2">
          <FaCloudArrowDown size={40} className="text-[#7F7F7F] scale-x-[-1]" />
        </div>
        <FaChevronRight size={14} />
      </div>
    );
  }

  if (completed == true && canceled == false) {
    return (
      <div className="flex gap-4 items-center justify-between -mt-4 max-2xl:scale-75">
        <FaChevronLeft size={14} />
        <div className="flex flex-col items-center bg-black py-3 px-6 rounded-4xl justify-center space-y-2">
          <FaCloudArrowDown
            size={40}
            className="max-2xl:size-6 text-[#eb5939] scale-x-[-1]"
          />
          <div className="text-center">
            <div className="text-sm text-[#BABABA] font-light">paxerr.zip</div>
            <div className="text-xs text-[#7F7F7F] font-light">11.11 MB</div>
          </div>
        </div>
        <FaChevronRight size={14} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-black p-4 rounded-4xl justify-center max-2xl:-mt-10 2xl:-mt-6 max-2xl:scale-75">
      <div className="relative">
        <LiaSpinnerSolid className="text-[#F39C12] animate-spin" size={40} />
      </div>
      <div className="text-center">
        <div className="text-white text-base font-semibold">In Progress</div>
        <div className="text-gray-400 text-xs">7 Days Left</div>
      </div>
    </div>
  );
}
