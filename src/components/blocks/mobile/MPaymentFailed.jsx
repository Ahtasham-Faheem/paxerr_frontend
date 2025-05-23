"use client";

const MPaymentFailed = ({ onBackToPayment }) => {
  return (
    <div className="relative w-full h-fit text-center lg:-mr-28 !pointer-events-auto">
      <button
        onClick={onBackToPayment}
        className="absolute -top-12 left-0 text-white z-10 cursor-pointer transition-colors !pointer-events-auto"
      >
        <img
          className="size-10 lg:size-auto"
          src="/images/icons/backarrow.svg"
          alt=""
        />
      </button>
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <div className="order-bg w-full h-fit py-20 max-2xl:bg-[#17171791] backdrop-blur-xs lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex items-center mb-3"></div>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-6">
            <img src="/images/icons/expired.svg" alt="" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Invoice Expired
          </h2>
          <p className="text-sm text-[#BABABA] max-w-sm mx-auto">
            If you already sent the payment and it's unconfirmed please contact
            support.
          </p>
        </div>

        <div className="absolute bottom-4 flex justify-center gap-2 text-[#7F7F7F]">
          <img src="/images/icons/lock.svg" alt="" className="size-4" />
          <span className="text-xs">Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default MPaymentFailed;
