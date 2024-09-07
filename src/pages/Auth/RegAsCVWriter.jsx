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

export default function RegAsCVWriter() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // For image preview
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();

  const role = "cvWriter";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "jobkonnect");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",
        formData
      );
      setIsLoading(false);

      return response.data.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      setIsLoading(false);

      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

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
    setIsLoading(true);

    e.preventDefault();
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }

 

    let imageUrl = "";

    if (image) {
      try {
        imageUrl = await uploadFile(image);
        console.log(imageUrl);
      } catch (error) {
        setErrors("Failed to upload image. Please try again.");
        return;
      }
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      location: formData.get("location"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
      education: formData.get("education"),
      workHours: formData.get("workHours"),
      responseTime: formData.get("responseTime"),
      password: formData.get("password"),
      role: role,
      portfolio: formData.get("portfolio"),
      yearsOfExperience: formData.get("experience"),
      specializations: formData.get("specializations"),
      avatar: imageUrl,
    };

    console.log(data);

    try {
      const response = await axios.post(
        "https://jobkonnecta.com/api/user/register",
        data
      );

      setIsLoading(false);

      const userId = response.data.message.id;
      console.log(userId);

      localStorage.setItem("userId", userId);
      toast.success("Registration successful!");
      navigate("/signup/verify");
      // console.log(response.data.message);
    } catch (err) {
      // Handle error
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
        title1="CV Writer Registration Form"
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
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Professional Information
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            {/* <div className="flex flex-col items-start gap-1 w-full">
              <label>Resume/CV</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="resume"
                type="file"
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Portfolio</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="portfolio"
                type="text"
                placeholder="Links to previous work"
                onChange={handleInputChange}
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
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Specializations</label>
              <textarea
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="specializations"
                placeholder="Industries and types of CVs"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>bio</label>
              <textarea
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="bio"
                placeholder="A brief about you..."
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label>Education</label>
            <select
              className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
              name="education"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected>
                Select Education Level
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
        </div>

        {/* Work Availability */}
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto mt-4">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Work Availability
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex lg:flex-row flex-col w-full justify-between gap-4 items-center">
            {/* <div className="flex flex-col items-start gap-1 w-full">
              <label>Availability</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="availability"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select Availability
                </option>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div> */}
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Work Hours</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="workHours"
                type="text"
                placeholder="Time zone and preferred hours"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Expected Response Time (in hours)</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="responseTime"
                type="text"
                placeholder="Response time to client requests"
                onChange={handleInputChange}
              />
            </div>
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
            text={isLoading ? "Registering..." : "Register As Cv writer"}
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
}
