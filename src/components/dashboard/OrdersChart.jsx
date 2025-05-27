import React from "react";
import { PiHexagonFill } from "react-icons/pi";
import { PieChart } from "react-minimal-pie-chart";

const OrdersChart = ({ orderStatusCounts }) => {
  // Define chart data
  const total =
    orderStatusCounts?.canceled +
    orderStatusCounts?.processing +
    orderStatusCounts?.in_progress +
    orderStatusCounts?.completed;

  const chartData = [
    { title: "Canceled", value: orderStatusCounts?.canceled, color: "#00000080" },
    { title: "Processing", value: orderStatusCounts?.processing, color: "#F39C12" },
    { title: "In Progress", value: orderStatusCounts?.in_progress, color: "#EB5939" },
    { title: "Completed", value: orderStatusCounts?.completed, color: "#27AE60" },
  ];

  const centralText = {
    title: "Total Orders",
    value: "11",
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col w-full justify-center items-center gap-1 lg:gap-3 z-10">
        <div className="w-full max-w-36 flex justify-between items-center gap-2">
          <PiHexagonFill size={16} className="text-[#F39C12]" />
          <span className="text-[#7F7F7F] text-sm">Processing</span>
          <span className="text-sm ml-auto">{orderStatusCounts?.processing}</span>
        </div>
        <div className="w-full max-w-36 flex justify-between items-center gap-2">
          <PiHexagonFill size={16} className="text-[#EB5939]" />
          <span className="text-[#7F7F7F] text-sm">In Progress</span>
          <span className="text-sm ml-auto">{orderStatusCounts?.in_progress}</span>
        </div>
        <div className="w-full max-w-36 flex justify-between items-center gap-2">
          <PiHexagonFill size={16} className="text-[#27AE60]" />
          <span className="text-[#7F7F7F] text-sm">Completed</span>
          <span className="text-sm ml-auto">{orderStatusCounts?.completed}</span>
        </div>
        <div className="w-full max-w-36 flex justify-between items-center gap-2">
          <PiHexagonFill size={16} className="text-[#00000080]" />
          <span className="text-[#7F7F7F] text-sm">Canceled</span>
          <span className="text-sm ml-auto">{orderStatusCounts?.canceled}</span>

        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="relative size-40 max-lg:scale-75">
          <PieChart
            data={chartData}
            lineWidth={17}
            startAngle={340} // Start from the top
            lengthAngle={360} // Full circle
            animate={true}
            animationDuration={1500}
            radius={42}
            background="#171717"
            rounded
            paddingAngle={2}
            segmentsStyle={{ transition: "stroke .3s" }}
            viewBoxSize={[100, 100]}
            center={[50, 50]}
            labelPosition={0}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "normal",
                opacity: 0.7,
                marginBottom: "0px",
                letterSpacing: "0.5px",
                color: "#7F7F7F",
              }}
            >
              {centralText.title}
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#BABABA" }}>
              {total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersChart;
