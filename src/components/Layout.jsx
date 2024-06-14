import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import logo from "@/assets/images/logo.png";
import hero from "@/assets/images/hero.gif";


export default function Layout() {
  return (
    <>
    <div className="relative w-full">
      <img src={hero} alt="Hero Background" className="w-full h-full object-cover filter blur-sm fixed"/>
      <div className="absolute flex flex-col items-center  text-center pt-3 w-full">
      <Header />
        <div className="w-full overflow-hidden">
          <Outlet />
        </div>
        <Footer /></div>
      </div>
    </>
  );
}
