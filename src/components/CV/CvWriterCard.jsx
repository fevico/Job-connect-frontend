import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomButton from "../CustomButton";

export default function CvWriterCard({
  name,
  image,
  bio,
  id,
  specialization,
  rating,
  services,
  onClick,
}) {


  return (
    <div
      className="border-[#001F3F]/40 border rounded-[30px] p-5 w-full"
      id={id}
    >
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <div className="flex flex-col lg:flex-row gap-4 mb-2 lg:mb-0">
          <img
            src={
              image ||
              "https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            }
            alt={`${name}'s profile`}
            className="rounded-full w-[50px] h-[50px] object-cover lg:w-[80px] lg:h-[80px]"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-left font-bold text-lg">{name}</h2>
            <p className="text-sm text-left text-gray-600">{specialization}</p>
            <div className="flex items-center text-yellow-500 text-sm">
              <span className="font-semibold">{rating}</span>
              <span className="ml-1">⭐</span>
            </div>
            <p className="w-full lg:w-[60%] text-sm text-left overflow-hidden line-clamp-2">
              {bio}
            </p>
            <p className="text-sm text-gray-500 italic">{services}</p>
          </div>
        </div>
        <CustomButton
          text={"VIEW INFO"}
          onClick={onClick} // Call the handleViewInfoClick function
        />
      </div>
    </div>
  );
}
