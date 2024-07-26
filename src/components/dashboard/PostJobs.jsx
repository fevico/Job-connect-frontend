import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Breadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/CustomButton";
import { BiUpload } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PostJobs() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const navigate = useNavigate();

  const role = "jobseeker";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: undefined }); // Clear error on input change
  };

  const handleCountryChange = (val) => {
    setCountry(val);
    setErrors({ ...errors, country: undefined });
    setState("");
  };

  const handleStateChange = (val) => {
    setState(val);
    setErrors({ ...errors, state: undefined });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleJobTypeChange = (e) => {
    const { value } = e.target;
    setSelectedJobTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      nationality: country,
      location: state,
      phone: formData.get("phone"),
      qualification: formData.get("qualification"),
      yearsOfExperience: formData.get("experience"),
      // currentPosition: formData.get("currentPosition"),
      password: formData.get("password"),
      role: role,
      jobType: selectedJobTypes,
    };

    try {
      await register(data).unwrap();
      // Handle successful registration, e.g., redirect to a different page
    } catch (err) {
      // Handle error
      setErrors(err.data);
      console.error(err);
    }
  };

  return (
    <>
      <p className="font-bold my-3">POST JOBS</p>

      <div className="bg-[#E2F0FF] p-2 my-3">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="flex flex-col gap-3 items-start w-[98%] mx-auto mt-4">
            <div className="flex flex-col items-center leading-5 mb-3">
              <h2 className="text-primary font-bold text-[16px] lg:text-[20px]">
                Job Details
              </h2>

              <span className="flex items-center w-full justify-end">
                <hr className="border-2 border-primary w-1/2" />
                <hr className="rounded-full p-1 bg-primary border-none" />
              </span>
            </div>
          </div>

          <div className="w-[98%] mx-auto space-y-3">
            <div className="flex lg:flex-row flex-col justify-between w-full gap-2 items-start">
              {/* Job Title and Industry */}
              <div className="grid grid-cols-2 lg:grid-cols-3  justify-between gap-2 items-center">
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Job Title</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="name"
                    type="text"
                    placeholder="Job Title"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Industry</label>
                  <select
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="industry"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Select Industry
                    </option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="marketing">Marketing</option>
                    <option value="construction">Construction</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="retail">Retail</option>
                    <option value="transportation">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="" htmlFor="country">
                    Country
                  </label>
                  <CountryDropdown
                    value={country}
                    onChange={handleCountryChange}
                    className={`p-2 w-full border-2 rounded-md border-gray-400`}
                    name="country"
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="" htmlFor="state">
                    State
                  </label>
                  <RegionDropdown
                    country={country}
                    value={state}
                    onChange={handleStateChange}
                    name="state"
                    className={`p-2 w-full border-2 rounded-md border-gray-400`}
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Salary from</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="from"
                    type="number"
                    placeholder="2,000"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Salary to</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="to"
                    type="number"
                    placeholder="3,000"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 lg:my-0 my-4">
                <h2 className="text-sm">Preferred Job Type</h2>
                <div className="flex flex-row lg:flex-col items-start gap-2 w-full">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="full_time"
                      checked={selectedJobTypes.includes("full_time")}
                      onChange={handleJobTypeChange}
                    />
                    <span className="ml-2">Full Time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="part_time"
                      checked={selectedJobTypes.includes("part_time")}
                      onChange={handleJobTypeChange}
                    />
                    <span className="ml-2">Part Time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="contract"
                      checked={selectedJobTypes.includes("contract")}
                      onChange={handleJobTypeChange}
                    />
                    <span className="ml-2">Contract</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="internship"
                      checked={selectedJobTypes.includes("internship")}
                      onChange={handleJobTypeChange}
                    />
                    <span className="ml-2">Internship</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-[98%] mx-auto mt-4">
              <div className="flex flex-col items-center leading-5 mb-3">
                <h2 className="text-primary font-bold text-[16px] lg:text-[20px]">
                  Job Description
                </h2>

                <span className="flex items-center w-full justify-end">
                  <hr className="border-2 border-primary w-1/2" />
                  <hr className="rounded-full p-1 bg-primary border-none" />
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-2 w-full">
              <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
                <label className="">Job Summary</label>
                <textarea
                  className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                  name="summary"
                  type="text"
                  placeholder="type your message..."
                />
              </div>
              <div className="flex flex-col items-start gap-1 w-full lg:w-1/2">
                <label className="">Job Responsibilities</label>
                <textarea
                  className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                  name="responsibilities"
                  type="text"
                  placeholder="type your message..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-[98%] mx-auto mt-5">
              <div className="flex flex-col items-center leading-5 mb-3">
                <h2 className="text-primary font-bold text-[16px] lg:text-[20px]">
                  Job Requirements
                </h2>

                <span className="flex items-center w-full justify-end">
                  <hr className="border-2 border-primary w-1/2" />
                  <hr className="rounded-full p-1 bg-primary border-none" />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3  justify-between gap-2 items-center">
              <div className="flex flex-col items-start gap-1 w-full">
                <label className="">Job Qualification</label>
                <select
                  className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                  name="qualification"
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="degree">Degree</option>
                  <option value="diploma">Diploma</option>
                  <option value="high_school">High School (S.S.C.E)</option>
                  <option value="hnd">HND</option>
                  <option value="mba_msc">MBA/MSc</option>
                  <option value="mbbs">MBBS</option>
                  <option value="mphil_phd">MPhil / PhD</option>
                  <option value="nce">N.C.E</option>
                  <option value="ond">OND</option>
                  <option value="others">Others</option>
                  <option value="vocational">Vocational</option>
                </select>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <label className="">Application deadline</label>
                <input
                  className=" border-gray-400 outline-none border-2 rounded-md p-2"
                  name="deadline"
                  type="date"
                  placeholder="3,000"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end">
              <CustomButton
                text={"Post Job"}
                type="submit"
                className="bg-primary text-white p-3 rounded-md"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
