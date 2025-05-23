import React from "react";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa6";

import { useOrders } from "./hooks/useOrders";
import SemiCircleProgress from "../history/SemiCircleProgress";
import StatusIndicator from "../history/StatusIndicator";


const ProjectsList = () => {
  const { orders, isLoading } = useOrders();
  const hasOrders = orders.length > 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <>
      {/* Desktop Project List */}
      <section className="hidden w-full lg:flex justify-center">
        <div className="w-fit absolute -top-0 left-0 right-0 mx-auto text-primary">
          <FaFolderOpen size={24} />
        </div>
        <div className="relative w-full h-full py-16 flex flex-col !pointer-events-auto">
          {hasOrders ? (
            <>
              <div className="w-full h-full justify-center items-center py-4 flex flex-col space-y-2 divide-y-2 divide-[#171717]">
                {orders.slice(0, 3).map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </div>
              {/* View All Button */}
              <div className="flex justify-center mb-2">
                <Link
                  href="/order/history"
                  className="px-6 py-2 rounded-lg bg-transparent text-primary hover:bg-primary hover:text-black transition-all duration-300 text-sm font-medium !pointer-events-auto"
                >
                  View All
                </Link>
              </div>
            </>
          ) : (
            <EmptyProjectsState />
          )}
        </div>
      </section>

      {/* Mobile Project List */}
      <section className="lg:hidden">
        <div className="relative w-full h-full !pointer-events-auto">
          {hasOrders && (
            <>
              <div className="w-full h-full py-4 flex flex-col justify-center items-center gap-16">
                {orders.slice(0, 2).map((order) => (
                  <Link
                    href={`/order/service?status=${order?.status}`}
                    className="project-bg-mb flex flex-col w-full justify-between items-center !pointer-events-auto py-12"
                  >
                    {/* Progress */}
                    <div className="w-[30%] flex justify-center mb-8">
                      <SemiCircleProgress
                        progress={order.progress}
                        completed={order.completed}
                        daysLeft={order.daysLeft}
                        status={order.status}
                        orderId={order.id}
                      />
                    </div>
                    {/* Status */}
                    <div className="w-full max-w-[300px] space-y-2">
                      <div className="w-full text-xs flex justify-between items-center">
                        <div className="text-[#7F7F7F] text-xs">
                          Order Status
                        </div>
                        <StatusIndicator status={order.status} />
                      </div>
                      <div className="w-full text-xs flex justify-between items-center">
                        <div className="text-[#7F7F7F] text-xs">
                          Order Amount
                        </div>
                        <p className="text-[#27AE60]">€ 999.99</p>
                      </div>
                      <div className="w-full text-xs flex justify-between items-center">
                        <div className="text-[#7F7F7F] text-xs">
                          Creation Date
                        </div>
                        <p>11/11/1111</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* View All Button */}
              <div className="flex justify-center mb-2">
                <Link
                  href="/order/history"
                  className="px-6 py-2 rounded-lg bg-transparent text-primary hover:bg-primary hover:text-black transition-all duration-300 text-sm font-medium !pointer-events-auto"
                >
                  View All
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const OrderItem = ({ order }) => {
  return (
    <Link
      href={`/order/service?status=${order?.status}`}
      className="flex w-full justify-between items-center py-2 2xl:py-4 px-10 border-[#171717] hover:bg-neutral-900 duration-300 !pointer-events-auto"
    >
      {/* Order ID */}
      <div className="flex flex-col w-[5%]">
        <div className="text-[#7F7F7F] text-xs"># {order.user}</div>
      </div>

      {/* User & Message */}
      <div className="w-[56.5%]">
        <div className="flex overflow-hidden items-center">
          <div className="size-8 2xl:size-12 rounded-full overflow-hidden border border-primary mr-3 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Representative"
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

      {/* Status */}
      <div className="w-[12%] text-xs flex flex-col gap-2 justify-center items-center">
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
          orderId={order.id}
        />
      </div>
    </Link>
  );
};

const EmptyProjectsState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-3">
        <img src="/images/icons/no-folder.svg" alt="" className="size-20" />
      </div>
      <p className="text-gray-300 text-xs">
        You don't have any orders yet. Click
        <span className="text-[#E75F34] text-xs !pointer-events-auto cursor-pointer ml-1 mr-1">
          here
        </span>
        to build your first project.
      </p>
    </div>
  );
};

export default ProjectsList;
