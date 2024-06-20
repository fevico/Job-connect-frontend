import React from "react";
import { Link } from "react-router-dom";

export default function CustomButton({ link, text }) {
  return (
    <Link
      to={link}
      className="py-1 px-4  font-medium text-white  text-center border-[#ACD4FF] hover:bg-blue-500 rounded-2xl border-2 lg:w-[150px] bg-primary "
    >
      {text}
    </Link>
  );
}
