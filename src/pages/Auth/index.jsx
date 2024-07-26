import React from "react";
import CustomButton from "../../components/CustomButton";
import jobseeker from "@/assets/images/jobseeker.png";
import employer from "@/assets/images/employer.png";
import { Link } from "react-router-dom";

export default function SignUpHome() {
  return (
    <>
      <div className="bg-[#F5FAFF] min-h-screen items-center justify-center flex pt-[60px]  ">
        <div className="w-[80%] mx-auto my-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative flex flex-col border-2 border-primary p-5">
              <img
                src={jobseeker}
                alt="Job Seeker"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                style={{ width: "50px", height: "50px" }} // Adjust size as needed
              />
              <h2 className="mt-6 font-bold">Job Seeker</h2>{" "}
              {/* Add margin-top to avoid overlap */}
              <p className="text-[12px] mb-2 h-10">
                Create a standout professional profile with Jobberman today.
              </p>
              <CustomButton
                onClick=""
                text="SIGN UP AS JOBSEEKER"
                link={"/signup/jobseeker"}
              />
            </div>

            <div className="relative flex flex-col border-2 border-primary p-5">
              <img
                src={employer}
                alt="employer"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                style={{ width: "50px", height: "50px" }} // Adjust size as needed
              />
              <h2 className="mt-6 font-bold">Employer</h2>{" "}
              {/* Add margin-top to avoid overlap */}
              <p className="text-[12px] mb-2 h-10">
                Seeking top-quality candidates? Advertise your opportunities and
                find the best talent with Jobberman.{" "}
              </p>
              <CustomButton onClick="" link={"/signup/employer"} text="SIGN UP AS AN EMPLOYER" />
            </div>

            <div className="relative flex flex-col border-2 border-primary p-5">
              <img
                src={jobseeker}
                alt="Job Seeker"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                style={{ width: "50px", height: "50px" }} // Adjust size as needed
              />
              <h2 className="mt-6 font-bold">CV Writer</h2>{" "}
              {/* Add margin-top to avoid overlap */}
              <p className="text-[12px] mb-2 h-10">
                Create a standout professional profile with Jobberman today.
              </p>
              <CustomButton onClick="" text="SIGN UP AS CV WRITER" />
            </div>

            <div className="relative flex flex-col border-2 border-primary p-5">
              <img
                src={employer}
                alt="Job Seeker"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                style={{ width: "50px", height: "50px" }} // Adjust size as needed
              />
              <h2 className="mt-6 font-bold">LINKEDIN OPTIMIZER</h2>{" "}
              {/* Add margin-top to avoid overlap */}
              <p className="text-[12px] mb-2 h-10">
                Create a standout professional profile with Jobberman today.
              </p>
              <CustomButton onClick="" text="SIGN UP AS LINKEDIN OPTIMIZER" />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Link to={"/login"} className="cursor-pointer underline lg:text-xl">
              I have an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
