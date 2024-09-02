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
import { useNavigate, useLocation } from "react-router-dom";

export default function CvWriterDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cvwriter } = location.state;
  console.log(cvwriter)

  //   useEffect(() => {
  //     const getJobDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://jobkonnecta.com/api/job/job/${id}`
  //         );
  //         setGetJobById(response.data);
  //       } catch (err) {
  //         setError(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     getJobDetails();
  //   }, [id]);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }

  //   if (!getJobById) {
  //     return <div>No job found</div>;
  //   }

  //   const handleApply = async (e) => {
  //     e.preventDefault();
  //     const token = localStorage.getItem("authToken");
  //     try {
  //       const response = await axios.post(
  //         "https://jobkonnecta.com/api/job/apply-job",
  //         {
  //           id: getJobById._id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("Response:", response);
  //       setOpen(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleBack = () => {
    navigate("/all-cwriters");
  };

  return (
    <>
      <Helmet>
        <title>CV Writer Details - JobKonnectaNG</title>
        <meta name="description" content="CV Writer Details - JobKonnectaNG" />
        <meta name="keywords" content="CV Writer Details, JobKonnectaNG" />
        <meta name="author" content="JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="px-7 lg:px-[70px] pb-[50px] pt-3 w-full mx-auto bg-[#D5D5DC] flex mt-4 relative">
        <h1 className="text-primary shadow-[#000000/25%] flex items-center gap-2">
          <PiArrowBendUpLeftBold
            className="text-primary cursor-pointer mb-[-20px]"
            onClick={handleBack}
          />
          <p className="mb-[-20px] text-[12px] lg:text-[16px] font-[800]">
            CV Writers | {cvwriter.name}
          </p>
        </h1>
      </div>
      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto bg-white rounded-lg p-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <img
            src="https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt={cvwriter.name}
            className="rounded-full lg:w-[100px] lg:h-[100px] h-[70px] w-[70px] object-cover"
          />
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-[20px] lg:text-[28px] font-bold text-primary">
              {cvwriter.name}
            </h2>
            <p className="text-primary">Role: CV Writer</p>
            <p className="flex items-center gap-2 text-primary">
              <span>Email:</span>
              <span className="text-gray-700">{cvwriter.email}</span>
            </p>
            <p className="text-primary">
              Specialization:{" "}
              <span className="text-gray-700">{cvwriter.specialization}</span>
            </p>
            <p className="text-primary">
              Rating:{" "}
              <span className="text-yellow-500 font-bold">{cvwriter.rating} ★</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 w-full lg:w-[60%] ">
            <CustomButton
              text={"Hire Now"}
              onClick={() => alert("Hire function to be implemented")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <div className="bg-[#D5D5DC] p-3 rounded-lg">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              My Bio
            </h1>
          </div>
          <p className="text-left text-gray-700">{cvwriter.bio}</p>
        </div>
      </div>
    </>
  );
}
