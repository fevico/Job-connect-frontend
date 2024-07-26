import React from "react";
import CustomButton from "../CustomButton";

export default function Applications() {
  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
      <div className="min-w-[800px]">
      <div className="bg-[#E2F0FF] p-5">
        {/* Header Row */}
        <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
          <p className="text-xs font-normal w-[25%] pr-2">Candidate Name</p>
          <p className="text-xs font-normal w-[26%] pr-2">Job Title</p>
          <p className="text-xs font-normal w-[16%] pr-2">Date Applied</p>
          <p className="text-xs font-normal w-[13%] pr-2">Status</p>
          <p className="text-xs font-normal w-[20%]"></p>
        </div>

        {/* Data Row */}
        <div className="flex items-center w-full px-4 py-2 mb-4">
          <p className="text-sm font-normal w-[25%]  pr-2">James Joe</p>
          <p className="text-sm font-normal w-[26%]  pr-2">Software Engineer</p>
          <p className="text-sm font-normal w-[16%]  pr-2">June 21, 2024</p>
          <p className="text-sm font-normal w-[13%]  pr-2">Hired</p>
          <p className="text-sm font-normal w-[20%]">
            <CustomButton text="View Info" />
          </p>
        </div>
      </div>
      </div></div>    </>
  );
}
