"use client";
import { useOrder } from "@/context/OrderContext";

const OrderDescription = ({ onBack }) => {
  const { selectedOrder } = useOrder();
  return (
    <>
      {
        selectedOrder ?
          <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto" >
            <img
              className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
              src="/images/icons/cart.svg"
              alt=""
            />
            <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col">
              <p className="mt-4"> 
                {selectedOrder?.description}
              </p>
            </div>
          </div>
          :
          <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto" >
            <img
              className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
              src="/images/icons/cart.svg"
              alt=""
            />
            <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col">
              <div className="flex items-center mb-6">
                <button
                  onClick={onBack}
                  className="text-primary hover:text-primary/80 transition-colors absolute"
                >
                  <img
                    className="size-8 lg:size-auto"
                    src="/images/icons/backarrow.svg"
                    alt=""
                  />
                </button>
                <h3 className="text-lg lg:text-2xl 2xl:text-3xl font-bold mx-auto">
                  Description
                </h3>
              </div>

              <div className="flex-1 max-h-[40vh] overflow-y-auto !pointer-events-auto">
                <div className="text-left pr-2">
                  <p className="text-[#BABABA] mb-6">
                    Enhance the website's mobile responsiveness by optimizing its
                    layout, ensuring all elements adapt seamlessly across different
                    screen sizes and resolutions. This includes adjusting media
                    queries, refining CSS styles, and restructuring components to
                    improve usability on mobile devices. Additionally, address any
                    UI/UX inconsistencies, such as text alignment, button sizes, image
                    scaling, and navigation responsiveness. Implement performance
                    optimizations to reduce loading times and improve overall mobile
                    user experience. Conduct thorough testing across multiple devices
                    and browsers to ensure smooth functionality and a consistent
                    design.
                  </p>

                  <ul className="space-y-4 text-[#BABABA] list-disc pl-5">
                    <li>
                      <span className="text-[#BABABA]/80 font-semibold">
                        Layout Optimization:
                      </span>{" "}
                      Adjust grids, flexbox, and containers for better mobile
                      adaptability.
                    </li>
                    <li>
                      <span className="text-[#BABABA]/80 font-semibold">
                        Media Queries Refinement:
                      </span>{" "}
                      Implement and fine-tune breakpoints for different devices.
                    </li>
                    <li>
                      <span className="text-[#BABABA]/80 font-semibold">
                        UI/UX Improvements:
                      </span>{" "}
                      Fix inconsistencies in text alignment, button sizes, spacing,
                      and image scaling.
                    </li>
                    <li>
                      <span className="text-[#BABABA]/80 font-semibold">
                        Navigation Enhancement:
                      </span>{" "}
                      Ensure menus, dropdowns, and interactive elements function
                      smoothly on touchscreens.
                    </li>
                    <li>
                      <span className="text-[#BABABA]/80 font-semibold">
                        Performance Optimization:
                      </span>{" "}
                      Minimize loading times by optimizing images, CSS, and scripts.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div >
      }
    </>
  );
};

export default OrderDescription;
