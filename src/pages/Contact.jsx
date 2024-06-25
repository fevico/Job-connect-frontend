import React from "react";
import { BiPhone } from "react-icons/bi";
import { BsEnvelope, BsPhone } from "react-icons/bs";
import CustomButton from "@/components/CustomButton";

export default function Contact() {
  return (
    <>
      <div className="flex flex-col lg:flex-row  gap-4 ">
        <div className="flex flex-col w-full lg:w-[40%]  p-3 ">
          <h2 className="text-primary font-[800] text-[20px] lg:text-[32px] mt-5 lg:mt-[100px] text-left lg:pl-[50px]">
            Contact Us Today
          </h2>
          <p className="text-sm mb-[25px] lg:mb-[50px] text-left lg:pl-[50px]">
            Any question? We’d be happy to help you!
          </p>

          <a
            href=""
            className="w-[80%] mx-auto flex items-center gap-3 py-4 px-4  font-medium text-white  justify-center border-[#ACD4FF] hover:bg-blue-500 rounded-md border-2  bg-primary mb-5"
          >
            <BiPhone /> +23490463722947
          </a>

          <a
            href=""
            className="w-[80%] mx-auto flex items-center gap-3 py-4 px-4  font-medium text-white  justify-center border-[#ACD4FF] hover:bg-blue-500 rounded-md border-2  bg-primary "
          >
            <BsEnvelope /> jobkonnectang@gmail.com
          </a>
        </div>
        <div className="border-r-4 border-gray-300  h-[100vh] hidden lg:block"></div>
        <div className="flex flex-col gap-4 w-full lg:w-[60%] lg:mt-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-[90%] mx-auto">
            <div className="flex flex-col items-start gap-1">
              <label className="">First Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-3 lg:p-5"
                name="first_name"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="">Last Name</label>

              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-3 lg:p-5"
                name="last_name"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label className="">Email Address</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-3 lg:p-5"
                name="email"
                type="email"
                placeholder="Email Address"
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <label className="">Phone</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-3 lg:p-5"
                name="phone"
                type="tel"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-[90%] mx-auto">
            <label className="">Message</label>
            <textarea
              className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
              name="message"
              type="tel"
              placeholder="type your message..."
            />
          </div>
          <div className="w-[95%] flex justify-end my-5">
            <CustomButton link={""} text={"Send a Message"} />
          </div>
        </div>
      </div>
    </>
  );
}
