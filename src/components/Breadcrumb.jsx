import React from "react";
import breadcrumbImage from "@/assets/images/breadcrumbImage.png";

export default function Breadcrumb({ title1, title2, auth }) {
  return (
    <div className="relative p-2 lg:h-20 w-[97%] mx-auto bg-[#D5D5DC] flex flex-col justify-center items-center mt-4">
      {auth && (
        <>
          <img
            src={breadcrumbImage}
            alt="breadcrumb"
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            style={{ height: '100%' }} // Adjust height as needed
          />
          <img
            src={breadcrumbImage}
            alt="breadcrumb"
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            style={{ height: '100%' }} // Adjust height as needed
          />
        </>
      )}
      <h1 className="text-primary shadow-[#000000/25%] text-xl lg:text-2xl font-[800]">
        {title1}
      </h1>
      <h1 className="text-primary shadow-[#000000/25%] font-[300] text-sm">
        {title2}
      </h1>
    </div>
  );
}
