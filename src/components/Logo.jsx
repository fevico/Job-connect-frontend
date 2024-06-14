import React from "react";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to="/" className="rounded-full bg-white  p-3">
        <img src={logo} alt="" className="" />
      </Link>
    </>
  );
}
