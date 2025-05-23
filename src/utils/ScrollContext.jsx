"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = (e) => {
    const target = e.target;
    const currentScrollY = target.scrollTop;

    // Instantly hide on scroll down
    if (currentScrollY > lastScrollY.current) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <ScrollContext.Provider value={{ hidden, handleScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
