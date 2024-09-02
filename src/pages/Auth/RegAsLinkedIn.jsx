import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Breadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/CustomButton";
import { BiUpload } from "react-icons/bi";
import { useRegisterMutation } from "../../redux/appData";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CVUpload() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div
      className={`border-2 rounded-md py-4 px-[60px] text-center border-dotted bg-gray-300 ${
        dragging ? "border-blue-500" : "border-gray-400"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="mb-2 text-lg font-semibold">Upload your CV</p>
        <BiUpload className="w-8 h-8 " />
        <p className="mb-2 text-sm text-gray-500">
          Drag and drop file or{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleClick}
          >
            Click Here
          </button>
        </p>
      </div>
      <input
        id="file-input"
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {file && (
        <div className="mt-4">
          <p className="text-sm font-medium">Selected File:</p>
          <p className="text-sm text-gray-700">{file.name}</p>
        </div>
      )}
    </div>
  );
}

export default function RegAsLinkedIn() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();

  const role = "linkdinOptimizer";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }

    const priceFromString = formData.get("experience");
    const experience = parseInt(priceFromString, 10);
    if (isNaN(experience) || experience <= 0) {
      setErrors({ message: "Price From must be a positive number." });
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
      yearsOfExperience: experience,
      // currentPosition: formData.get("currentPosition"),
      password: formData.get("password"),
      role: role,
    };

    try {
      const response = await axios.post(
        "https://jobkonnecta.com/api/user/register",
        data
      );

      const userId = response.data.message.id;
      console.log(userId);

      localStorage.setItem("userId", userId);
      toast.success("Registration successful!");
      navigate("/signup/verify");
      // console.log(response.data.message);
    } catch (err) {
      // Handle error
      toast.error(err.response?.data?.message || "Registration failed");
      setErrors(err.response?.data || {});
      console.error(err.response?.data?.message || err.message);
    }
  };

  // React.useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Register successful!");
  //     navigate("/login");
  //   } else {
  //     toast.error("Register failed");
  //     setErrors(error);
  //   }
  // }, [isSuccess, navigate]);

  return (
    <>
      <Breadcrumb
        auth
        title1="LinkedIn Optimizer Registration Form"
        title2={"Let’s get to know more about you"}
      />
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Personal Information */}
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Personal Information
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="name"
                type="text"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Email</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Phone</label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                className="w-full p-2 border-2 rounded-md border-gray-400"
                name="phone"
                placeholder="Input Phone"
                onChange={(value) => {
                  handleInputChange({ target: { name: "phone", value } });
                }}
                required
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="location">Location</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="location"
                type="text"
                placeholder="City, State, Country"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="profilePhoto"
                type="file"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* LinkedIn Profile Information */}
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              LinkedIn Profile Information
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>LinkedIn Profile URL</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="linkedinUrl"
                type="url"
                placeholder="LinkedIn Profile URL"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Current Job Title</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="jobTitle"
                type="text"
                placeholder="Current Job Title"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Industry</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="industry"
                type="text"
                placeholder="Industry (e.g., Tech, Finance)"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Years of Experience</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="experience"
                type="number"
                placeholder="Years of Experience"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label>Key Skills</label>
            <textarea
              className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
              name="skills"
              placeholder="List your key skills (separated by commas)"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* LinkedIn Optimization Goals */}
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              LinkedIn Optimization Goals
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Optimization Goal</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="optimizationGoal"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select Optimization Goal
                </option>
                <option value="job_search">Job Search</option>
                <option value="personal_branding">Personal Branding</option>
                <option value="network_growth">Network Growth</option>
                <option value="thought_leadership">Thought Leadership</option>
              </select>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Target Audience</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="targetAudience"
                type="text"
                placeholder="Target Audience (e.g., recruiters, clients)"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label>LinkedIn Profile Sections to Optimize</label>
            <textarea
              className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
              name="profileSections"
              placeholder="Specify LinkedIn profile sections you want to focus on (e.g., Summary, Experience, Skills)"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-[90%] mx-auto flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md"
          >
            Register for LinkedIn Optimization
          </button>
        </div>
      </form>
    </>
  );
}
