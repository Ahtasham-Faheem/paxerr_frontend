// context/OrderContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <OrderContext.Provider value={{ selectedOrder, setSelectedOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
