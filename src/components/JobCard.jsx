import React from "react";
import CustomButton from "./CustomButton";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long", // 'short' for abbreviated month
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format; set to false for 24-hour
  };
  return date.toLocaleDateString(undefined, options);
}

export default function JobCard({
  title,
  description,
  companyName,
  priceFrom,
  priceTo,
  jobType,
  location,
  postedTime,
  onClick,
  id,
}) {
  return (
    <div
      className="border-[#001F3F]/40 border rounded-[30px] px-5 py-3 lg:py-10 w-full"
      id={id}
    >
      <div className="flex flex-col lg:flex-row justify-between lg:items-center h-[180px] lg:h-[120px] w-full">
        <div className="flex flex-col gap-1 lg:gap-2 items-start w-full lg:w-[80%]">
          <h2 className="text-left font-bold text-[14px] lg:text-[18px] line-clamp-1 overflow-hidden">
            {title} @ {companyName}
          </h2>
          <button className="p-2 bg-[#2C2F4E]/70 text-center text-white rounded">
            &#8358;{priceFrom} - &#8358;{priceTo}
          </button>
          <p className="">
            {jobType} | {location}
          </p>
          <p className="line-clamp-2 overflow-hidden text-left text-[12px] lg:text-[16px]">{description}</p>
          <p className="text-xs text-red-500">{formatDate(postedTime)}</p>
        </div>
        <CustomButton text={"VIEW DETAILS"} onClick={onClick} />
      </div>
    </div>
  );
}
