import React from "react";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <div className="w-full lg:h-[60px] h-auto flex justify-center items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-1/3 object-cover w-full" />
        </Link>
      </div>
    </>
  );
}
