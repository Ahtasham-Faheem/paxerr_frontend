import React from "react";
const OrderDetailView = ({ order, onBack }) => {
  const {
    projectName,
    category,
    daysLeft,
    status,
    orderAmount,
    payment,
    creationDate,
    files = [],
  } = order;

  // Calculate the progress percentage for the circular indicator
  const progressDegrees =
    360 * (status === "In Progress" ? 0.5 : status === "completed" ? 1 : 0);

  return (
    <div className="w-full h-full flex flex-col bg-[#111111] text-white rounded-lg overflow-hidden">
      {/* User profile image with notification */}
      <div className="w-full flex justify-center mt-10 mb-8 relative">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-orange-500 flex items-center justify-center overflow-hidden">
            <img
              src="/api/placeholder/64/64"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -right-1 -bottom-1 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
            1
          </div>
        </div>
      </div>

      {/* Days Left Indicator */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-32 h-32">
          {/* Circular progress background */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#222222"
              strokeWidth="8"
            />
            {/* Circular progress indicator */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#FF6B45"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - 251.2 * (progressDegrees / 360)}
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Days Left Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-orange-500">
              {daysLeft}
            </span>
            <span className="text-sm text-gray-300">Days Left</span>
          </div>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="w-full px-6 grid grid-cols-2 gap-y-6">
        <div className="text-gray-400">Category</div>
        <div className="text-right">{category}</div>

        <div className="text-gray-400">Order Status</div>
        <div className="text-right flex items-center justify-end">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
          <span className="text-orange-500">{status}</span>
        </div>

        <div className="text-gray-400">Order Amount</div>
        <div className="text-right text-green-500">{orderAmount}</div>

        <div className="text-gray-400">Payment Status</div>
        <div className="text-right flex items-center justify-end">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
          <span className="text-orange-500">{payment}</span>
        </div>

        <div className="text-gray-400">Creation Date</div>
        <div className="text-right">{creationDate}</div>
      </div>

      {/* Files Section */}
      {files.length > 0 && (
        <div className="mt-10 w-full flex flex-col items-center">
          <div className="relative w-28 h-28 bg-[#171717] rounded-lg flex flex-col items-center justify-center">
            <div className="bg-orange-500 rounded-full p-3">
              <Download size={24} color="white" />
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm">{files[0].name}</div>
              <div className="text-xs text-gray-400">{files[0].size}</div>
            </div>
          </div>

          {/* File Navigation */}
          <div className="w-full flex justify-center mt-4 space-x-20">
            <button className="text-orange-500">
              <ArrowLeft size={24} />
            </button>
            <div className="flex space-x-2">
              <span className="text-gray-400">1</span>
              <span className="text-orange-500">2</span>
              <span className="text-gray-400">3</span>
            </div>
            <button className="text-orange-500">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailView;
