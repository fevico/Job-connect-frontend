import { Link } from "react-router-dom";
import instagram from "@/assets/images/instagram.png";
import facebook from "@/assets/images/facebook.png";
import x from "@/assets/images/x.png";
// import linkedin from "@/assets/images/linkedin.png";
import telegram from "@/assets/images/telegram.png";

export default function Footer() {
  return (
    <>
      <div className="bg-primary w-full p-4">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start w-[90%] mx-auto gap-3 lg:gap-5">
          <div className="w-full md:w-[50%] justify-center flex items-center gap-6">
            <a
              target="_blank"
              href="https://www.instagram.com/jobkonnecta.ng"
              className=""
            >
              <img src={instagram} alt="instagram" className="" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/share/tvt1YPLvVWSQNtex/?mibextid=qi2Omg"
              className=""
            >
              <img src={facebook} alt="facebook" className="w-full" />
            </a>
            {/* <a target="_blank" href="#" className="">
              <img src={linkedin} alt="linkedin" className="" />
            </a> */}
            <a
              target="_blank"
              href="https://x.com/JobkonnectaNG?t=acFFGJzcXe3Rq_nWfM6Hew&s=09"
              className=""
            >
              <img src={x} alt="x" className="" />
            </a>
            <a href="https://t.me/JobKonnecta" target="_blank">
              <img src={telegram} alt="x" className="w-[13%]" />
            </a>
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
              to="/about"
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/privacy"
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
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
