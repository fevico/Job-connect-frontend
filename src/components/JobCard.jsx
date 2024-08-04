import React from "react";
import CustomButton from "./CustomButton";

export default function JobCard({ title, company, salary, jobType, location, postedTime, link, id }) {
  return (
    <div className="border-[#001F3F]/40 border rounded-[30px] p-5 w-full" id={id}>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center h-[180px] lg:h-[120px]">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold">{title} @ {company}</h2>
          <button className="p-3 bg-[#2C2F4E]/70 text-center text-white rounded">
            {salary}
          </button>
          <p className="">{jobType} | {location}</p>
          <p className="text-xs text-red-500">{postedTime}</p>
        </div>
        <CustomButton text={"VIEW DETAILS"} link={link} />
      </div>
    </div>
  );
}
