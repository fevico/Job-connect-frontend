import React from "react";
import search from "@/assets/images/search.png";
import CustomButton from "@/components/CustomButton";
import JobList from "@/components/JobList";

export default function Search() {
  return (
    <>
      <div className="p-2 px-8 lg:h-20 w-[97%] flex mx-auto bg-[#D5D5DC] justify-between items-center mt-4">
        <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px]  font-[800]">
          Search result for UI Design:
        </h1>
        <h1 className="text-primary shadow-[#000000/25%]  text-sm font-[800] hover:text-blue-500 cursor-pointer">
          View all jobs
        </h1>
      </div>

      {/* job found start */}
      <div className="mt-4 lg:mt-8 flex flex-col gap-5 items-center">
        <div className="bg-[#2C2F4E] p-4 w-full flex flex-col lg:flex-row gap-3 justify-around items-center ">
          <div className="flex items-center lg:justify-between gap-4 lg:overflow-x-hidden w-full lg:w-[70%] mx-auto overflow-x-scroll ">
            <select className="py-3 px-5 w-full  rounded-lg bg-gray-200">
              <option value="">Select job location</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5 w-full rounded-lg bg-gray-200">
              <option value="">Select job type</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <div className="w-full">
              <button className="py-2 px-4  font-medium text-white  text-center border-[#ACD4FF] hover:bg-blue-500 rounded-lg border-2 w-full bg-primary ">
                Search
              </button>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* filter end */}

      <div className="flex flex-col gap-3  w-[90%] mx-auto  mt-5">
        <JobList />
      </div>
      <div className="flex justify-end  mt-5 w-[95%]">
        <CustomButton link={""} text={"View similar jobs"} />
      </div>

      {/* job found end*/}
      {/* place an if else here */}

      {/* no job found start */}
      <div className="flex flex-col items-center justify-center gap-3 mt-8">
        <img src={search} alt="" className="lg:w-1/4" />
        <p className="text-primary font-bold">
          Unable to locate the job you were looking for?
        </p>
        <p className="text-primary font-[300] text-center w-[90%]">
          Explore other active job opportunities that may interest you
        </p>
        <CustomButton link={""} text={"View active jobs"} />
      </div>
      {/* no job found end */}
    </>
  );
}
