'use client'
import Header from "@/components/mainLayout/Header";
import Footer from "@/components/mainLayout/Footer";
import Background from "@/components/mainLayout/Background";
import { OrderProvider } from "@/context/OrderContext";
import { useEffect } from "react";
import axios from "axios";

export default function MainLayout({ children }) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post("http://74.208.7.19:8040/api/token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("token", res.data.access);
        } catch (err) {
          console.error("Auto-refresh failed:", err);
        }
      }
    }, 5 * 60 * 1000); // every 10 minutes

    return () => clearInterval(interval);
  }, []);
  return (
    <OrderProvider>
      <main className="antialiased px-6 md:px-12 lg:px-32 xl:px-42 2xl:px-48">
        <Header />
        <section className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </section>
        <Footer />
        {/* <SideNav /> */}
        <Background />
      </main>
    </OrderProvider>
  );
}
