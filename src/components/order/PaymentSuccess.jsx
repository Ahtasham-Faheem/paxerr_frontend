"use client";

import Button from "../ui/Button";

const PaymentSuccess = ({ onShowSignIn, onShowSignUp }) => {
  return (
    <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/tick.svg"
        alt=""
      />

      <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-6">
            <img src="/images/icons/confetti.svg" alt="" />
          </div>
          <h2 className="text-lg lg:text-2xl 2xl:text-3xl font-bold mb-4">
            Thank you for your order!
          </h2>
          <p className="max-2xl:text-xs">
            Want to track your order status?{" "}
            <span className="text-primary">Sign In</span> or{" "}
            <span className="text-primary">Sign Up</span> to stay updated.
          </p>
        </div>

        <div className="mt-4 flex gap-10">
          <Button
            onClick={onShowSignIn}
            className="w-full lg:w-[150px] mx-auto mb-4"
          >
            SIGN IN
          </Button>
          <Button onClick={onShowSignUp} className="mx-auto mb-4">
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
