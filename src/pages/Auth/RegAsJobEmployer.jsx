import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Breadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/CustomButton";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../components/hooks/firebase";

import PropTypes from "prop-types"; // Import PropTypes
import { BiUpload } from "react-icons/bi";

function CVUpload({ regFile, setRegFile }) {
  const [dragging, setDragging] = useState(false);

  const handleCvChange = (e) => {
    if (e.target.files[0]) {
      setRegFile(e.target.files[0]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setRegFile(event.dataTransfer.files[0]); // Fixed: Use setregFile instead of setFile
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
        <p className="mb-2 text-lg font-semibold">
          Upload your CAC registration document
        </p>
        <BiUpload className="w-8 h-8" />
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
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        style={{ display: "none" }}
        onChange={handleCvChange}
      />
      {regFile && (
        <div className="mt-4">
          <p className="text-sm font-medium">Selected File:</p>
          <p className="text-sm text-gray-700">{regFile.name}</p>
        </div>
      )}
    </div>
  );
}

// Define prop types for the CVUpload component
CVUpload.propTypes = {
  regFile: PropTypes.instanceOf(File), // Expect a File object
  setRegFile: PropTypes.func.isRequired, // Expect a function to set the file
};

export default function RegAsJobEmployer() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [regFile, setRegFile] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const role = "employer";

  const handleInputChange = (e) => {
    const { name } = e.target;
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
    setIsLoading(true);

    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }

    if (!regFile) {
      setErrors({ message: "Please upload your Reg Document." });
      toast.error("Please upload your Reg Document.");
      setIsLoading(false);
      return;
    }

    let regFileUrl = "";

    // Proceed with the upload if CV file is present
    if (regFile) {
      const storageRef = ref(storage, `cac/${regFile.name}`);
      try {
        setIsLoading(true);
        // Upload the file
        await uploadBytes(storageRef, regFile);
        // Get the download URL
        regFileUrl = await getDownloadURL(storageRef);
        // console.log("Uploaded CV URL:", regFileUrl);
      } catch (error) {
        setIsLoading(false);
        console.error("Error uploading reg document:", error);
        toast.error("Failed to upload reg document. Please try again.");
        return;
      }
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),

      country: formData.get("country"),
      state: formData.get("state"),

      phone: formData.get("phone"),
      companyName: formData.get("companyName"),
      aboutCompany: formData.get("aboutCompany"),
      comapanyAddress: formData.get("address"),
      registrationNumber: formData.get("regNo"),
      registrationImage: regFileUrl,
      numberOfEmployees: formData.get("nEmployee"),
      industry: formData.get("industry"),
      employerType: formData.get("employerType"),

      // currentPosition: formData.get("currentPosition"),
      password: formData.get("password"),
      role: role,
    };
    // console.log(data);
    try {
      const response = await axios.post(
        "https://jobkonnecta.com/api/user/register",
        // "http://localhost:5000/user/register",
        data
      );
      setIsLoading(false);

      const userId = response.data.message.id;

      localStorage.setItem("userId", userId);

      localStorage.setItem("userRole", data.role);
      // localStorage.setItem('accountId', data._id);

      toast.success("Registration successful!");
      navigate("/signup/verify");
      // console.log(response.data.message);
    } catch (err) {
      // Handle error
      setIsLoading(false);

      toast.error(err.response?.data?.message || "Registration failed");
      setErrors(err.response?.data || {});
      console.error(err);
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
        title1="Job Employer Registration Form"
        title2={"Let’s get to know more about you"}
      />
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
              <label className="">Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Email</label>
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
              <label className="">Gender</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="gender"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="" htmlFor="country">
                Country
              </label>
              <CountryDropdown
                value={country}
                onChange={handleCountryChange}
                className={`p-2 w-full border-2 rounded-md "border-gray-400"
                `}
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
                className={`p-2 w-full border-2 rounded-md "border-gray-400"
                `}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Phone</label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                className={`w-full p-2 border-2 rounded-md "border-gray-400"
                `}
                name="phone"
                placeholder="Input Phone"
                onChange={(value) => {
                  handleInputChange({ target: { name: "phone", value } });
                }}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Company Information
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
              <label className="">Company Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="companyName"
                type="text"
                placeholder="Company Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Company Address</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="address"
                type="text"
                placeholder="Company address"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Registration Number</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="regNo"
                type="text"
                placeholder="enter CAC reg no"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Employee Number</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="nEmployee"
                type="number"
                placeholder="number of employee in company"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Industry</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="industry"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select Industry
                </option>
                <option value="information_technology">
                  Information Technology (IT)
                </option>
                <option value="finance">Finance & Banking</option>
                <option value="construction">Construction</option>
                <option value="healthcare">Healthcare & Medical</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="hospitality">Hospitality & Tourism</option>
                <option value="transportation">
                  Transportation & Logistics
                </option>
                <option value="real_estate">Real Estate</option>
                <option value="media">Media & Entertainment</option>
                <option value="telecommunications">Telecommunications</option>
                <option value="agriculture">Agriculture</option>
                <option value="legal">Legal Services</option>
                <option value="energy">Energy & Utilities</option>
                <option value="government">Government & Public Sector</option>
                <option value="non_profit">Non-profit & NGOs</option>
                <option value="consulting">Consulting</option>
                <option value="automotive">Automotive</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="pharmaceutical">
                  Pharmaceutical & Biotechnology
                </option>
                <option value="marketing">Marketing & Advertising</option>
                <option value="arts">Arts & Creative Services</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Employer Type</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="employerType"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select type
                </option>
                <option value="direct_employer">Direct Employer</option>
                <option value="recruitment_agency">Recruitment agency</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full ">
            <label className="">About Company</label>
            <textarea
              className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
              name="aboutCompany"
              type="text"
              placeholder="Enter brief company info"
              onChange={handleInputChange}
              required
            />
          </div>

          <CVUpload regFile={regFile} setRegFile={setRegFile} />
        </div>

        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Security Information
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
              <label className="">Password</label>
              <div className="relative w-full">
                <input
                  className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Confirm Password</label>
              <div className="relative w-full">
                <input
                  className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-1 w-[90%] mx-auto">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            required
          />
          <label htmlFor="terms" className="text-sm">
            I accept the{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div className="flex justify-end mt-4 w-[95%]">
          <CustomButton
            type="submit"
            text={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
}
