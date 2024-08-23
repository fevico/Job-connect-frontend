import React from "react";
import CustomButton from "../CustomButton";

export default function CvWriterCard({ name, image, bio, id, onClick }) {
  return (
    <div
      className="border-[#001F3F]/40 border rounded-[30px] p-5 w-full"
      id={id}
    >
      <div className="flex flex-col lg:flex-row justify-between lg:items-center h-[160px] lg:h-[60px]">
        <div className="flex lg:flex-row flex-col gap-4 mb-2 lg:mb-0">
          <img
            src="https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt="imagecvwriter"
            className="rounded-full w-[50px] h-[50px] object-cover lg:w-[80px] lg:h-[80px]"
          />
          <div className="flex flex-col gap-2 ">
            <h2 className="text-left font-bold">{name} </h2>

            <p className=" w-full lg:w-[60%] text-sm text-left overflow-hidden line-clamp-2">
              {bio}
            </p>
          </div>
        </div>
        <CustomButton
          text={"VIEW INFO"}
          onClick={onClick}
          link={`/cvwriter/${id}`}
        />
      </div>
    </div>
  );
}
