import React from "react";
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

export function ApplySuccess({ open, setOpen, handleOpen }) {
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
                WHAT'S NEXT?
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
                <CustomButton link={"/"} text={"VIEW ACTIVE JOBS"} />
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default function CareerProfile() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Career Profile - JobKonnectaNG</title>
        <meta name="description" content="Career Profile - JobKonnectaNG" />
        <meta name="keywords" content="Career Profile, JobKonnectaNG" />
        <meta name="author" content="JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="px-7 lg:px-[70px] pb-[50px] pt-3  w-full mx-auto bg-[#D5D5DC] flex mt-4 relative">
        <h1 className="text-primary shadow-[#000000/25%] text-[12px] lg:text-[18px] font-[800] flex items-center gap-2">
          <PiArrowBendUpLeftBold className="text-primary" /> UIUX Designer |
          Apply at Creative Solutions Inc.
        </h1>
      </div>
      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto transform translate-y-[-1%] bg-white">
        <div className="flex flex-col gap-8 p-4">
          <div className="flex items-center justify-between">
            <div className="">
              <img src={job} alt="" className="rounded-full" />
              <h2 className="text-[16px] lg:text-[32px] font-extrabold text-primary text-left">
                UI UX Designer
              </h2>
              <p className=" text-primary text-left">Creative Solutions Inc.</p>
              <p className="flex items-center gap-2  text-primary text-left">
                Full Time
              </p>
              <p className="flex items-center gap-2  text-primary text-left">
                Lagos
              </p>
            </div>
            <div className="flex flex-col items-left gap-2 w-[40%] lg:w-[25%]">
              <CustomButton onClick={handleApply} text={"Apply Now"} />
              <p className="text-left text-sm text-[#001F3F80]/50">
                share this job:
              </p>
              <div className="grid grid-cols-3 lg:grid-cols-5 items-center gap-3 justify-around ">
                <Link
                  to="#"
                  className="shadow-md px-3 shadow-gray-500 py-2 cursor-pointer"
                >
                  <FaLink className="" />
                </Link>
                <Link
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w  bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Job Summary
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

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w  bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Job Details
            </h1>
          </div>
          <h1 className=" lg:text-[16px] text-left font-[600]">
            Key Responsibilites:
          </h1>
          <div className="text-left">
            <li className="">
              {" "}
              Design and deliver wireframes, user stories, user journeys, and
              mockups optimized for a wide range of devices and interfaces.
            </li>
            <li className="">
              Conduct user research and evaluate user feedback.
            </li>
            <li className="">
              Establish and promote design guidelines, best practices, and
              standards.
            </li>
            <li className="">
              Collaborate with product management and engineering to define and
              implement innovative solutions for the product direction, visuals,
              and experience.
            </li>
            <li className="">
              Execute all visual design stages from concept to final hand-off to
              engineering.
            </li>
            <li className="">
              Conceptualize original ideas that bring simplicity and
              user-friendliness to complex design roadblocks.
            </li>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w  bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Job Requirements
            </h1>
          </div>
          <h1 className=" lg:text-[16px] text-left font-[600]">
            Requirements:
          </h1>
          <div className="text-left mb-4">
            <li className="">
              {" "}
              Proven UI/UX design experience with a strong portfolio.
            </li>
            <li className="">
              Proficiency in design tools such as Sketch, Figma, Adobe XD, etc.
            </li>
            <li className="">
              Solid experience in creating wireframes, storyboards, user flows,
              process flows, and site maps.
            </li>
            <li className="">
              Proficiency in HTML, CSS, and JavaScript for rapid prototyping
              (optional but a plus).
            </li>
            <li className="">
              Ability to solve problems creatively and effectively.
            </li>
            <li className="">
              Up-to-date with the latest UI trends, techniques, and
              technologies.
            </li>
            <li className="">
              BS/MS in Human-Computer Interaction, Interaction Design, or a
              related field.
            </li>
          </div>

          <div className="text-left mb-4">
            <li className="">
              <strong>Minimum Qualification: </strong>
              Degree{" "}
            </li>
            <li className="">
              <strong>Experience Level: </strong>
              Senior Level{" "}
            </li>
            <li className="">
              <strong>Years of Experience: </strong>3 Years
            </li>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w  bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              Job Benefits
            </h1>
          </div>
          <h1 className=" lg:text-[16px] text-left font-[600]">Benefits:</h1>
          <div className="text-left">
            <li className="">Competitive salary and benefits package.</li>
            <li className="">Health insurance.</li>
            <li className="">Flexible working hours.</li>
            <li className="">
              Opportunities for professional development and growth.
            </li>
            <li className="">Collaborative and creative work environment.</li>
            <li className="">Remote work options available.</li>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="p-3 lg:h-[50px] w  bg-[#D5D5DC]">
            <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px] text-left font-[800]">
              About Company
            </h1>
          </div>
          <p className="text-left">
            Creative Solutions Inc. is a leading agency specializing in
            innovative design and digital experiences. Our mission is to create
            user-centric solutions that empower our clients and enhance their
            digital presence.
          </p>
        </div>
      </div>
      <ApplySuccess handleOpen={handleOpen} open={open} setOpen={setOpen} />
    </>
  );
}
