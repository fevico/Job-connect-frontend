import React from "react";
import JobList from "../../components/JobList";

export default function Featured() {
  return (
    <>
      <div className="bg-white w-full  p-5  mt-5">
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto ">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Featured Jobs
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>
        {/* job list */}
        <div className="flex flex-col gap-3  w-[90%] mx-auto ">
          <JobList />
        </div>
      </div>
    </>
  );
}
