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
import axios from 'axios'

export default function RegAsJobSeeker() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation(); // Using the useRegisterMutation hook
  const navigate = useNavigate();

  const role = "employer";

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

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      nationality: country,
      location: state,
      phone: formData.get("phone"),
      companyName: formData.get("companyName"),
      comapanyAddress: formData.get("address"),
      // currentPosition: formData.get("currentPosition"),
      password: formData.get("password"),
      role: role,
    };

    try {
      const response = await axios.post('http://jobkonnecta.com/api/user/register', data)
      const userId = response.data.message.id

      localStorage.setItem('userId', userId);
      
      localStorage.setItem('userRole', data.role);
      // localStorage.setItem('accountId', data._id);

      toast.success("Registration successful!");
      navigate('/signup/verify');
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
