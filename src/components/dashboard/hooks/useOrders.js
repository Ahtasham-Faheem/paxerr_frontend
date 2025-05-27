import axios from 'axios';
import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return { orders, isLoading, error };
};