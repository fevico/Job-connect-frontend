import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import {
  FaEnvelope,
  FaFacebook,
  FaFacebookMessenger,
  FaLink,
  FaWhatsapp,
} from "react-icons/fa";
import job from "@/assets/images/job.png";
import mark from "@/assets/images/mark.png";
import { Link } from "react-router-dom";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { Helmet } from "react-helmet";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LinkedInDetails() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  
  return (
    <>
      <Helmet>
        <title>LinkedIn Optimizer Details - JobKonnectaNG</title>
        <meta
          name="description"
          content="LinkedIn Optimizer Details - JobKonnectaNG"
        />
        <meta
          name="keywords"
          content="LinkedIn Optimizer Details, JobKonnectaNG"
        />
        <meta name="author" content="JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div
        className="px-7 lg:px-[70px] pb-[50px] pt-3  w-full mx-auto bg-[#D5D5DC] flex mt-4 relative"
        // name={getJobById._id}
      >
        <Link
          to={"/all-linkedin"}
          className="text-primary shadow-[#000000/25%]  flex items-center gap-2"
        >
          <PiArrowBendUpLeftBold className="text-primary cursor-pointer mb-[-20px]" />
          <p className="mb-[-20px] text-[12px] lg:text-[16px] font-[800]">
            LinkedIn Optimizer | Victor James
          </p>
        </Link>
      </div>
      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto transform translate-y-[-1%] bg-white">
        <div className="flex flex-col gap-8 p-4">
          <div className="flex items-center justify-between">
            <div className="">
              <img
                src="https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                alt=""
                className="rounded-full lg:w-[80px] lg:h-[80px] h-[50px] w-[50px]"
              />
              <h2 className="text-[16px] lg:text-[28px] font-bold text-primary text-left">
                {/* {getJobById.title} */}
                Victor JAMES
              </h2>
              <p className=" text-primary text-left">
                Role: LinkedIn Optimizer
              </p>
              <p className="flex items-center gap-2  text-primary text-left">
                voictor@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-left gap-2 w-[40%] lg:w-[25%]">
              <CustomButton text={"Hire Now"} onClick={""} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              My Bio
            </h1>
          </div>
          <p className="text-left">
            Creative Solutions Inc., a leading agency specializing in innovative
            design and digital experiences, is seeking a talented UI/UX Designer
            to join our dynamic team. The ideal candidate will have a strong
            portfolio showcasing their expertise in user interface and user
            experience design, along with a deep understanding of user-centered
            design principles. In this role, you will collaborate with product
            managers, developers, and other designers to create intuitive and
            engaging digital products. You will be responsible for crafting
            visually appealing and user-friendly interfaces, conducting user
            research, and ensuring the usability and functionality of our
            products. This is an exciting opportunity to work on diverse
            projects and contribute to the success of our clients.
          </p>
        </div>
      </div>
    </>
  );
}
