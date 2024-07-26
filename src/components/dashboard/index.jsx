import React from "react";
import { BsArrowUp } from "react-icons/bs";

export default function Dashboard() {
  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>

      <div className="bg-[#E2F0FF] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Jobs Card */}
          <div className="bg-white shadow-md p-2 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-semibold tex-sm">Active Jobs</p>
              <select
                className=" border-gray-400 outline-none border-2 rounded-md p-2"
                name="qualification"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="lastMonth">Last 1 month</option>
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-4xl">10</h2>
              <p className="">20th June - 20th July</p>
              <p className="flex border-none bg-[#F7F8F8] gap-2 font-bold">
                <BsArrowUp className="text-green-300" /> 60%
              </p>
            </div>
          </div>

          {/* Total Applications Card */}
          <div className="bg-white shadow-md p-2 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-semibold tex-sm">Total Applications</p>
              <select
                className=" border-gray-400 outline-none border-2 rounded-md p-2"
                name="qualification"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="lastMonth">Last 1 month</option>
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-4xl">2000</h2>
              <p className="">20th June - 20th July</p>
              <p className="flex border-none bg-[#F7F8F8] gap-2 font-bold">
                <BsArrowUp className="text-green-300" /> 100%
              </p>
            </div>
          </div>

          {/* Total Views Card */}
          <div className="bg-white shadow-md p-2 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-semibold tex-sm">Total Views</p>
              <select
                className=" border-gray-400 outline-none border-2 rounded-md p-2"
                name="qualification"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="last3Months">Last 3 months</option>
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-4xl">6400</h2>
              <p className="">20th June - 20th August</p>
              <p className="flex border-none bg-[#F7F8F8] gap-2 font-bold">
                <BsArrowUp className="text-green-300" /> 60%
              </p>
            </div>
          </div>

          {/* Closed Jobs Card */}
          <div className="bg-white shadow-md p-2 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-semibold tex-sm">Closed Jobs</p>
              <select
                className=" border-gray-400 outline-none border-2 rounded-md p-2"
                name="qualification"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="last6Months">Last 6 months</option>
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-4xl">40</h2>
              <p className="">20th June - 20th November</p>
              <p className="flex border-none bg-[#F7F8F8] gap-2 font-bold">
                <BsArrowUp className="text-green-300" /> 60%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
