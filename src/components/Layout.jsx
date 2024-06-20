import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import hero from "@/assets/images/hero.gif";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className={`relative w-full ${isHomePage ? "" : "bg-white"}`}>
        {isHomePage && (
          <img
            src={hero}
            alt="Hero Background"
            className="w-full h-full object-cover filter blur-sm fixed"
          />
        )}
        <div className={`absolute flex flex-col items-center text-center pt-3 w-full ${isHomePage ? "" : "bg-white"}`}>
          <Header />
          <div className="w-full overflow-hidden min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
