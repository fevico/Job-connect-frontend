import React from "react";
import { Link } from "react-router-dom";
import instagram from "@/assets/images/instagram.png";
import facebook from "@/assets/images/facebook.png";
import x from "@/assets/images/x.png";
import linkedin from "@/assets/images/linkedin.png";

export default function Footer() {
  return (
    <>
      <div className="bg-primary w-full p-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-[90%] mx-auto gap-3 lg:gap-5">
          <div className="w-full lg:w-[20%] justify-center flex items-center gap-6">
            <Link to="#" className="">
              <img src={instagram} alt="instagram" className="" />
            </Link>
            <Link to="#" className="">
              <img src={facebook} alt="facebook" className="" />
            </Link>
            <Link to="#" className="">
              <img src={linkedin} alt="linkedin" className="" />
            </Link>
            <Link to="#" className="">
              <img src={x} alt="x" className="" />
            </Link>
          </div>
          <div className="mt-0 lg:mt-8 flex flex-col gap-1 w-full lg:w-[40%] justify-center mx-auto">
            <div className="flex items-center ">
              <hr className="w-[2%] bg-[#007BFF] rounded-full p-1 border-none" />
              <hr className="w-[96%] border border-[#007BFF]" />
              <hr className="w-[2%] bg-[#007BFF] rounded-full p-1 border-none" />
            </div>
            <p className="text-white/50 text-center w-[80%] mx-auto text-[12px]">
              All Rights Reserved. © 2024 Jobkonnecta
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 w-full lg:w-[30%] mx-auto lg:mx-0">
            <Link
              to=""
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              About Us
            </Link>
            <Link
              to=""
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to=""
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
