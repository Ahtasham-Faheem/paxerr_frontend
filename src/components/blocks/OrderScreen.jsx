"use client";
import { useState, useEffect } from "react";
import OrderSummary from "../order/OrderSummary";
import OrderDescription from "../order/OrderDescription";
import PaymentMethods from "../order/PaymentMethods";
import QrPayment from "../order/QrPayment";
import PaymentFailed from "../order/PaymentFailed";
import PaymentSuccess from "../order/PaymentSuccess";
import SignIn from "../order/SignIn";
import SignUp from "../order/SignUp";
import OrderPending from "../order/OrderPending";
import OrderCompleted from "../order/OrderCompleted";
import OrderCanceled from "../order/OrderCanceled";

const OrderScreen = ({ initialState }) => {
  const [state, setState] = useState({
    showDescription: false,
    showPayment: false,
    showQrPayment: false,
    showCurrencyOptions: false,
    selectedCurrency: "USDT",
    paymentStatus: null,
    showSignIn: false,
    showSignUp: false,
    viewMode: initialState || "summary",
    ...initialState,
  });

  // Add this effect to handle the success timer after failed payment
  useEffect(() => {
    let successTimer;

    // If payment failed, set a timer to show success after 5 seconds
    if (state.paymentStatus === "failed") {
      successTimer = setTimeout(() => {
        simulateSuccessfulPayment();
      }, 5000);
    }

    return () => {
      clearTimeout(successTimer);
    };
  }, [state.paymentStatus]);

  // State transition handlers
  const toggleDescription = () => {
    setState((prev) => ({
      ...prev,
      showDescription: !prev.showDescription,
      showPayment: false,
      showQrPayment: false,
      paymentStatus: null,
    }));
  };

  const showPaymentScreen = () => {
    setState((prev) => ({
      ...prev,
      showPayment: true,
      showDescription: false,
      showQrPayment: false,
      paymentStatus: null,
    }));
  };

  const showQrPaymentScreen = () => {
    setState((prev) => ({
      ...prev,
      showQrPayment: true,
      showPayment: false,
      showDescription: false,
      paymentStatus: null,
    }));
  };

  const backToSummary = () => {
    setState((prev) => ({
      ...prev,
      showPayment: false,
      showDescription: false,
      showQrPayment: false,
      paymentStatus: null,
    }));
  };

  const backToPayment = () => {
    setState((prev) => ({
      ...prev,
      showQrPayment: false,
      showPayment: true,
      paymentStatus: null,
    }));
  };

  const toggleCurrencyOptions = () => {
    setState((prev) => ({
      ...prev,
      showCurrencyOptions: !prev.showCurrencyOptions,
    }));
  };

  const selectCurrency = (currency) => {
    setState((prev) => ({
      ...prev,
      selectedCurrency: currency,
      showCurrencyOptions: false,
    }));
  };

  const simulateSuccessfulPayment = () => {
    setState((prev) => ({
      ...prev,
      paymentStatus: "success",
    }));
  };

  const simulateFailedPayment = () => {
    setState((prev) => ({
      ...prev,
      paymentStatus: "failed",
    }));
  };

  const showSignIn = () => {
    setState((prev) => ({
      ...prev,
      showSignIn: true,
      showSignUp: false,
      showDescription: false,
      showPayment: false,
      showQrPayment: false,
      paymentStatus: null,
    }));
  };

  const showSignUp = () => {
    setState((prev) => ({
      ...prev,
      showSignUp: true,
      showSignIn: false,
      showDescription: false,
      showPayment: false,
      showQrPayment: false,
      paymentStatus: null,
    }));
  };

  if (state.viewMode === "canceled") {
    return <OrderCanceled />;
  }

  if (state.viewMode === "pending") {
    return <OrderPending />;
  }

  if (state.viewMode === "completed") {
    return <OrderCompleted />;
  }

  if (state.showSignIn) {
    return <SignIn onShowSignUp={showSignUp} />;
  }

  if (state.showSignUp) {
    return <SignUp onShowSignIn={showSignIn} />;
  }

  // Render the appropriate view based on state
  if (state.paymentStatus === "failed") {
    return <PaymentFailed onBackToPayment={backToPayment} />;
  }

  if (state.paymentStatus === "success") {
    return (
      <PaymentSuccess onShowSignIn={showSignIn} onShowSignUp={showSignUp} />
    );
  }

  if (state.showQrPayment) {
    return (
      <QrPayment
        onBackToPayment={backToPayment}
        onPaymentSuccess={simulateSuccessfulPayment}
        onPaymentFailed={simulateFailedPayment}
      />
    );
  }

  if (state.showPayment) {
    return (
      <PaymentMethods
        state={state}
        onToggleCurrencyOptions={toggleCurrencyOptions}
        onSelectCurrency={selectCurrency}
        onShowQrPayment={showQrPaymentScreen}
      />
    );
  }

  if (state.showDescription) {
    return <OrderDescription onBack={toggleDescription} />;
  }

  return (
    <OrderSummary
      onToggleDescription={toggleDescription}
      onShowPayment={showPaymentScreen}
    />
  );
};

export default OrderScreen;
