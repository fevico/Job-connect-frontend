import React from "react";
import CustomButton from "../CustomButton";

export default function ActiveListings() {
  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
      <div className="min-w-[800px]">
      <div className="bg-[#E2F0FF] p-5">
        {/* Header Row */}
        <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
          <p className="text-xs font-normal w-[24%] pr-2">Job Title</p>
          <p className="text-xs font-normal w-[20%] pr-2">Location</p>

          <p className="text-xs font-normal w-[16%] pr-2">Date Posted</p>
          <p className="text-xs font-normal w-[10%] pr-2">Applications</p>

          <p className="text-xs font-normal w-[10%] pr-2">Status</p>
          <p className="text-xs font-normal w-[15%]"></p>
        </div>

        {/* Data Row */}
        <div className="flex items-center w-full px-4 py-2 mb-4">
        <p className="text-sm font-normal w-[24%]  pr-2">Software Engineer</p>
        <p className="text-sm font-normal w-[20%]  pr-2">Lagos, Nigeria</p>
        <p className="text-sm font-normal w-[16%]  pr-2">June 21, 2024</p>
          <p className="text-sm font-normal w-[10%]  pr-2">129</p>

          <p className="text-sm font-normal w-[10%]  pr-2">Open</p>
          <p className="text-sm font-normal w-[15%]">
            <CustomButton text="View Info" />
          </p>
        </div>
      </div>
      </div></div>    </>
  );
}
