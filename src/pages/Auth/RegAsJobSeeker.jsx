import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Breadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/CustomButton";
import { BiUpload } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../components/hooks/firebase";

import PropTypes from "prop-types"; // Import PropTypes

function CVUpload({ cvFile, setCvFile }) {
  const [dragging, setDragging] = useState(false);

  const handleCvChange = (e) => {
    if (e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setCvFile(event.dataTransfer.files[0]); // Fixed: Use setCvFile instead of setFile
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
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleCvChange}
      />
      {cvFile && (
        <div className="mt-4">
          <p className="text-sm font-medium">Selected File:</p>
          <p className="text-sm text-gray-700">{cvFile.name}</p>
        </div>
      )}
    </div>
  );
}

// Define prop types for the CVUpload component
CVUpload.propTypes = {
  cvFile: PropTypes.instanceOf(File), // Expect a File object
  setCvFile: PropTypes.func.isRequired, // Expect a function to set the file
};

export default function RegAsJobSeeker() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  // const [cvUrl, setCvUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = "jobseeker";

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
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    // Validate password match
    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }

    const priceFromString = formData.get("experience");
    const experience = parseInt(priceFromString, 10);

    // Validate experience input
    if (isNaN(experience) || experience <= 0) {
      setErrors({ message: "Experience must be a positive number." });
      return;
    }

    // Check if CV file is provided
    if (!cvFile) {
      setErrors({ message: "Please upload your CV." });
      toast.error("Please upload your CV.");
      return;
    }

    let cvUrl = "";

    // Proceed with the upload if CV file is present
    if (cvFile) {
      const storageRef = ref(storage, `cvs/${cvFile.name}`);
      try {
        setIsLoading(true);
        // Upload the file
        await uploadBytes(storageRef, cvFile);
        // Get the download URL
        cvUrl = await getDownloadURL(storageRef);
        console.log("Uploaded CV URL:", cvUrl);
      } catch (error) {
        setIsLoading(false);
        console.error("Error uploading CV:", error);
        toast.error("Failed to upload CV. Please try again.");
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
      qualification: formData.get("qualification"),
      yearsOfExperience: experience,
      password: formData.get("password"),
      linkedInProfile: formData.get("linkedInProfile"),
      role: role,
      cv: cvUrl, // Ensure cvUrl is included
    };

    console.log(data);

    try {
      const response = await axios.post(
        "https://jobkonnecta.com/api/user/register",
        data
      );
      setIsLoading(false);

      const userId = response.data.message.id;
      localStorage.setItem("userId", userId);
      toast.success("Registration successful!");
      navigate("/signup/verify");
    } catch (err) {
      setIsLoading(false);
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
        title1="Job Seeker Registration Form"
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
              Qualification Information
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
              <label className="">Highest Qualification</label>
              <select
                required
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
              <label className="">Experience (years)</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="experience"
                type="number"
                placeholder="Experience"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">LinkedIn Profile URL</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="linkedInProfile"
                type="url"
                placeholder="Enter your LinkedIn Profile URL"
                onChange={handleInputChange}
                pattern="https?://.+"
                title="Please enter a valid URL that starts with http:// or https://"
                required
              />
            </div>

            {/* <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Current Position</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="currentPosition"
                type="text"
                placeholder="Current Position"
                onChange={handleInputChange}
                required
              />
            </div> */}
          </div>
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

        <div className="w-[90%] mx-auto mt-4">
          <CVUpload cvFile={cvFile} setCvFile={setCvFile} />
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
