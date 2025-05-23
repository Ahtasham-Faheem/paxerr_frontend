import { FaCheck } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";
import { LuX } from "react-icons/lu";

const StatusIndicator = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <div className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          <span className="text-green-400 capitalize">{status}</span>
        </div>
      );
    case "pending":
      return (
        <div className="flex items-center gap-1">
          <LiaSpinnerSolid className="text-[#F39C12] animate-spin" size={16} />
          <span className="text-[#F39C12] capitalize">In Progress</span>
        </div>
      );
    case "canceled":
      return (
        <div className="flex items-center gap-1">
          <LuX className="text-primary" size={16} />
          <span className="text-primary capitalize">{status}</span>
        </div>
      );
    default:
      return <span>{status}</span>;
  }
};

export default StatusIndicator;
