import React from "react";

export default function Breadcrumb({ title1, title2 }) {
  return (
    <>
      <div className="p-2 lg:h-20 w-[97%] mx-auto bg-[#D5D5DC] flex flex-col justify-center items-center mt-4">
        <h1 className="text-primary shadow-[#000000/25%] text-xl lg:text-2xl font-[800]">{title1}</h1>
        <h1 className="text-primary shadow-[#000000/25%]  font-[300] text-sm">{title2}</h1>
      </div>
    </>
  );
}
