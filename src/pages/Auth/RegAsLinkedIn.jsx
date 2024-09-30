import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Breadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/CustomButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-phone-number-input/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export default function RegAsLinkedIn() {
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const role = "linkedinOptimizer";

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
      toast.error("failed to register")

      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
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

    setIsLoading(true);

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
      country: formData.get("country"),
      state: formData.get("state"),
      phone: formData.get("phone"),
      linkedinProfile: formData.get("linkedinUrl"),
      currentJob: formData.get("currentJob"),
      skills: formData.get("keySkills"),
      workHours: formData.get("workHours"),
      yearsOfExperience: formData.get("yearsOfExperience"),
      industry: formData.get("industry"),
      responseTime: formData.get("responseTime"),
      optimizationGoal: formData.get("optimizationGoal"),
      targetAudience: formData.get("targetAudience"),
      optimizeSections: formData.get("profileSection"),
      password: formData.get("password"),
      role: role,
      avatar: imageUrl,
    };

    try {
      const response = await axios.post(
        "https://jobkonnecta.com/api/user/register",
        // "http://localhost:5000/user/register",
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
                name="linkdinUrl"
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
              <label>Years of Experience</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="yearsOfExperience"
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
              name="keySkills"
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
              name="profileSection"
              placeholder="Specify LinkedIn profile sections you want to focus on (e.g., Summary, Experience, Skills)"
              onChange={handleInputChange}
            />
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
            text={
              isLoading
                ? "Registering..."
                : "Register for LinkedIn Optimization"
            }
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
}
