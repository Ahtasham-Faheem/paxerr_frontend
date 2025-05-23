"use client";

import { useEffect, useState } from "react";
import { cursor } from "./../../public/cursor.js";

const Cursor = () => {
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPC) {
      setTimeout(() => {
        cursor();
      }, 100);
    }
  }, [isPC]);

  return null;
};

export default Cursor;
