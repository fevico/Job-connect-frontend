import React from "react";
import CustomButton from "../../components/CustomButton";

export default function Filter() {
  return (
    <>
      <div className="mt-4 lg:mt-8 flex flex-col gap-5 items-center">
        <input
          type="search"
          name="search"
          className="py-3 px-5 bg-white outline-none border-2 border-primary w-[80%] lg:w-2/5 rounded-[50px]"
          placeholder="Search for job title, industry, keyword..."
        />
        <div className="bg-[#2C2F4E] p-4 w-full flex flex-col lg:flex-row gap-3 justify-around items-center ">
          <div className="flex items-center lg:justify-between gap-4 lg:overflow-x-hidden w-full lg:w-[80%] overflow-x-scroll ">
            {" "}
            <select className="py-3 px-5">
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5">
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5">
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5">
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5">
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
          <div className="">
            <CustomButton text={"Search"} link={"#"} />
          </div>
        </div>
      </div>
    </>
  );
}
