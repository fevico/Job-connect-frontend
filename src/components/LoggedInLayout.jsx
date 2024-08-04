import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// import Header, { LoggedInHeader } from "./Header";
import Footer from "./Footer";
import hero from "@/assets/images/hero.gif";
import { LoggedInHeader } from "./LoggedInHeader";

export default function LoggedInLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isJobDetailsPage = location.pathname === "/job";

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
        <div className={`absolute flex flex-col items-center text-center pt-3 w-full ${isHomePage ? "" : isJobDetailsPage ? "bg-[#EAEAEA]" : "bg-white"}`}>
          <LoggedInHeader/>
          <div className="w-full overflow-hidden min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
