import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { FaLink } from "react-icons/fa";
import jobImage from "@/assets/images/job.png";
import mark from "@/assets/images/mark.png";
import {  useParams } from "react-router-dom";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { Helmet } from "react-helmet";
import DOMPurify from "dompurify";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { ImCancelCircle } from "react-icons/im";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSession from "../components/hooks/useSession";
import { useApplyJobMutation, useShareJobMutation } from "../redux/appData";
import PropTypes from "prop-types";
import axios from "axios";

export function ApplySuccess({ open, handleOpen }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex flex-col pb-0">
          <div className="flex items-center justify-end">
            <ImCancelCircle
              onClick={handleOpen}
              className="text-primary w-5 h-5 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={mark} alt="" className="w-[10%]" />
            <h2 className="font-bold text-[16px] lg:text-[30px] leading-9 text-primary">
              Congratulations!!!
            </h2>
            <h2 className="text-primary">
              Your application has been successfully submitted
            </h2>
            <div className="p-3 bg-[#DEEEFF] w-[95%] lg:w-[70%] rounded-t-md mt-5">
              <h2 className="text-left text-primary font-bold lg:text-lg">
                WHAT&apos;S NEXT?
              </h2>
              <li className="text-primary">
                You will receive an email confirmation shortly with the details
                of your application.
              </li>
              <li className="text-primary">
                You can check the status of your application anytime by logging
                into your account on our website.
              </li>
              <li className="text-primary">
                If the employer is interested, they will contact you directly
                via email or through our messaging system on the website.
              </li>
              <div className="flex flex-col items-center justify-center gap-2 w-full mt-3">
                <CustomButton link={"/all-jobs"} text={"VIEW ACTIVE JOBS"} />
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

ApplySuccess.propTypes = {
  open: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default function JobDetails() {
  const params = useParams();
  const { id } = params;
  const jobId = id;
  // console.log(jobId)
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [cookies] = useCookies(["authToken"]);
  const { isSignedIn, userDetails } = useSession();
  const [formOpen, setFormOpen] = useState(false); // Toggle form modal
  //  const { jobId } = useParams(); // Extract jobId from URL
  const [job, setJob] = useState(null);
  // const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const handleOpen = () => setOpen(!open);

  // useEffect(() => {
  //   const getJobDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://jobkonnecta.com/api/job/job/${id}`
  //       );
  //       setGetJobById(response.data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getJobDetails();
  // }, [id]);

  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <Spinner className="w-8 h-8" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (!getJobById) {
  //   return <div>No job found</div>;
  // }

  // console.log(getJobById);
  const [applyJob, { isSuccess, error }] = useApplyJobMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [
    shareJob,
    { isSuccess: isSuccessShare, isLoading: isLoadingShare, error: errorShare },
  ] = useShareJobMutation();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://jobkonnecta.com/api/job/job/${jobId}`
        );
        // const response = await axios.get(`http://localhost:5000/job/job/${jobId}`);
        // console.log("this is the response", response.data);
        setJob(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const handleShare = async () => {
    // e.preventDefault();

    setIsLoading(true);
    try {
      //   const response = await axiosInstance.post("/job/apply-job", {
      //     id: job._id,
      //   });
      //   console.log("Response:", response);
      // const data = {
      //   ...formData,
      //   jobId: job._id,
      //   candidateName: formData.fullName,
      //   candidateEmail: formData.email,
      // };
      const data = {
        jobId: job.id,
        candidateName: formData.fullName,
        candidateEmail: formData.email,
      };

      await shareJob(data);
      // console.log("Response:", response);

      setIsLoading(false);
      //   setOpen(true);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  // console.log(userDetails);
  const handleApply = async () => {
    // e.preventDefault();

    setIsLoading(true);
    try {
      //   const response = await axiosInstance.post("/job/apply-job", {
      //     id: job._id,
      //   });
      //   console.log("Response:", response);
      const data = {
        id: job.id,
      };
      await applyJob(data);

      setIsLoading(false);
      //   setOpen(true);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleButtonClick = () => {
    if (!isSignedIn) {
      // Redirect to login and then return to the current page
      navigate("/login", { state: { returnTo: window.location.pathname } });
    } else if (userDetails?.role === "jobseeker") {
      handleApply();
    }
  };

  const handleBack = () => {
    navigate("/all-jobs");
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, navigate, error]);

  React.useEffect(() => {
    if (isSuccessShare) {
      toast.success("Referal Successful");
    } else {
      toast.error(errorShare?.data?.message);
    }
  }, [isSuccessShare, errorShare]);

  // const decodeHTML = (html) => {
  //   const txt = document.createElement("textarea");
  //   txt.innerHTML = html;
  //   return txt.value;
  // };
  console.log(job)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job Not Found</div>;
  }
  return (
    <>
      <Helmet>
        <title>Job Details - JobKonnectaNG</title>
        <meta name="description" content="Job Details - JobKonnectaNG" />
        <meta name="keywords" content="Job Details, JobKonnectaNG" />
        <meta name="author" content="JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div
        className="px-7 lg:px-[70px] pb-[50px] pt-3  w-full mx-auto bg-[#D5D5DC] flex mt-4 relative"
        name={job?.id}
      >
        <h1 className="text-primary shadow-[#000000/25%] text-[12px] lg:text-[18px] font-[800] flex items-center gap-2">
          <PiArrowBendUpLeftBold
            className="text-primary cursor-pointer mb-[-20px]"
            onClick={handleBack}
          />
        </h1>
      </div>
      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto transform translate-y-[-1%] bg-white">
        <div className="flex flex-col gap-8 p-4">
          <div className="flex items-center justify-between">
            <div className="">
              <img src={jobImage} alt="" className="rounded-full" />
              <h2 className="text-[16px] lg:text-[32px] font-extrabold text-primary text-left">
                {job.title}
              </h2>
              <p className=" text-primary text-left"> {job.companyName}</p>
              <p className="flex items-center gap-2  text-primary text-left">
              {job.categoryName || ""}
              </p>
              <p className="flex items-center gap-2  text-primary text-left">
                {job.location.state}, {job.location.country}
              </p>
            </div>
            <div className="flex flex-col items-left gap-2 w-[40%] lg:w-[25%]">
              {(userDetails?.role === "jobseeker" || !isSignedIn) && (
                <CustomButton
                  text={
                    isLoading ? (
                      <div className="flex items-center gap-2 justify-center">
                        Applying <Spinner />
                      </div>
                    ) : (
                      "Apply Now"
                    )
                  }
                  onClick={handleButtonClick}
                />
              )}
              {job && job.referral === "yes" && (
                <>
                  <p className="text-left text-sm text-[#001F3F80]/50">
                    click to refer this job:
                  </p>
                  <div className="grid grid-cols-3 lg:grid-cols-5 items-center gap-3 justify-around ">
                    <div
                      onClick={() => {
                        setFormOpen(true); // Open the modal
                      }}
                      className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                    >
                      <FaLink className="" />
                    </div>
                    {/* <Link
                  to="#"
                  className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                >
                  <FaFacebookMessenger className="" />
                </Link>
                <Link
                  to="#"
                  className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                >
                  <FaEnvelope className="" />
                </Link>
                <Link
                  to="#"
                  className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                >
                  <FaWhatsapp className="" />
                </Link>
                <Link
                  to="#"
                  className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                >
                  <FaFacebook className="" />
                </Link> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Job Summary
            </h1>
          </div>
          <div
            className="text-left"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.description),
            }}
          />
        </div>

        {/* <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Required Skills
            </h1>
          </div>
          <h1 className=" lg:text-[16px] text-left font-[600]">
            Key Responsibilities:
          </h1>
          <div className="text-left">
            <li className="">
              {" "}
              Design and deliver wireframes, user stories, user journeys, and
              mockups optimized for a wide range of devices and interfaces.
            </li>
            <li className="">
              Conduct user research and evaluate user feedback to improve the
              user experience continuously.
            </li>
            <li className="">
              Collaborate with cross-functional teams to understand and
              incorporate business and technical requirements into design
              solutions.
            </li>
            <li className="">
              Create and maintain design systems, ensuring consistency across
              all digital products.
            </li>
            <li className="">
              Stay up-to-date with industry trends and best practices in UI/UX
              design, and apply them to enhance our products.
            </li>
          </div>
          <h1 className=" lg:text-[16px] text-left font-[600]">
            Requirements:
          </h1>
          <div className="text-left">
            <li className="">
              Bachelor's degree in UI/UX Design, Interaction Design, or a
              related field.
            </li>
            <li className="">
              Proven experience as a UI/UX Designer with a strong portfolio of
              design projects.
            </li>
            <li className="">
              Proficiency in design and prototyping tools such as Sketch, Adobe
              XD, Figma, or similar.
            </li>
            <li className="">
              Solid understanding of user-centered design principles and best
              practices.
            </li>
            <li className="">
              Strong communication and collaboration skills, with the ability to
              present and justify design decisions effectively.
            </li>
            <li className="">
              Knowledge of HTML/CSS and front-end development principles is a
              plus.
            </li>
          </div>
        </div> */}

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Skills
            </h1>
          </div>
          <div className="text-left">
            <p className=""> {job.skills}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Company Info
            </h1>
          </div>
          <div className="text-left">
            <p className=""> {job?.aboutCompany}</p>
          </div>
        </div>
      </div>

      <ApplySuccess open={open} setOpen={setOpen} handleOpen={handleOpen} />
      {/* Modal for collecting CV details */}
      <Dialog
        open={formOpen}
        handler={() => setFormOpen(!formOpen)}
        size="sm"
        className="max-h-screen overflow-y-auto"
      >
        <DialogHeader>Provide Details for Referal</DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleShare();
              setFormOpen(false);
            }}
          >
            {isLoadingShare ? "Loading..." : "Refer"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
