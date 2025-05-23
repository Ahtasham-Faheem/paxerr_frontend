"use client";
import Link from "next/link";
import StatusIndicator from "./StatusIndicator";
import SemiCircleProgress from "./SemiCircleProgress";
import { useOrder } from "@/context/OrderContext";

const OrderItem = ({ order }) => {
  const { setSelectedOrder } = useOrder();

  const handleClick = () => {
    setSelectedOrder(order);
  };
  return (
    <Link
      href={`/order/service`}
       onClick={handleClick}
      className="px-8 2xl:px-16 flex justify-between items-center py-2 2xl:py-4 border-[#171717] hover:bg-neutral-900 duration-300 !pointer-events-auto"
    >
      {/* Order ID */}
      <div className="flex flex-col w-[5%]">
        <div className="text-[#7F7F7F] text-xs"># {order.user}</div>
      </div>

      {/* User & Message */}
      <div className="w-[40%]">
        <div className="flex overflow-hidden items-center">
          <div className="size-8 2xl:size-12 rounded-full overflow-hidden border border-primary mr-3 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-[#7F7F7F] mb-1 ml-1">{order.title}</p>
            <div className="text-xs 2xl:text-base px-5 py-2 rounded-2xl backdrop-blur-2xl bg-[#1d1d1d50] text-[#BABABA] flex items-end gap-3">
              <p>{order.message}</p>
              <span className="text-xs text-[#7F7F7F] mr-1">{order.creation_date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[10%] text-xs flex flex-col gap-2 justify-center items-center">
        <div className="text-xs text-[#7F7F7F]">Category</div>
        <p>{order.category}</p>
      </div>

      {/* Status */}
      <div className="w-[10%] text-xs flex flex-col gap-2 justify-center items-center">
        <div className="text-[#7F7F7F] text-xs">Status</div>
        <StatusIndicator status={order.status} />
      </div>

      {/* Progress */}
      <div className="w-[15%] mr-4 flex justify-center">
        <SemiCircleProgress
          progress={order.progress}
          completed={order.completed}
          daysLeft={order.daysLeft || "0"}
          status={order.status}
        />
      </div>

      {/* Info Section */}
      <div className="w-[25%] flex justify-between items-center">
        {/* Creation Date */}
        <div className="text-sm flex flex-col gap-2 justify-center">
          <div className="text-[#7F7F7F] text-xs">Creation Date</div>
          {new Date(order.creation_date).toLocaleDateString("en-GB")}
        </div>

        {/* Payment Status */}
        <div className="text-xs 2xl:text-sm flex flex-col gap-2 justify-center items-center">
          <div className="text-[#7F7F7F] text-xs">Payment</div>
          <span
            className={
              order.payment === "Completed"
                ? "text-green-400"
                : order.payment === "Refunded"
                ? "text-green-400"
                : "text-yellow-400"
            }
          >
            {order.price}
          </span>
        </div>

        {/* Order Amount */}
        <div className="text-sm flex flex-col gap-2 justify-center items-center">
          <div className="text-[#7F7F7F] text-xs">Order Amount</div>
          {order.orderAmount || "$999"}
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
