import React, { useState, useEffect } from "react";
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

export default function PostJobs() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryId, setcategoryId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setcategoryId(value);
    }
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

  const getCategories = async () => {
    try {
      const response = await axios.get('http://jobkonnecta.com/api/category/all');
      console.log(response.data);
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  async function handleSubmit(e) {
    // console.log("samsonnnnnnnnnn");
    e.preventDefault();
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match." });
      return;
    }
    

    const priceFromString = formData.get("priceFrom");
    const priceFrom = parseInt(priceFromString, 10);
    if (isNaN(priceFrom) || priceFrom <= 0) {
      setErrors({ message: "Price From must be a positive number." });
      return;
    }

    const priceToString = formData.get("priceTo");
    const priceTo = parseInt(priceToString, 10);
    if (isNaN(priceTo) || priceTo <= 0) {
      setErrors({ message: "Price To must be a positive number." });
      return;
    }

    const data = {
      title: formData.get("title"),
      description: formData.get("summary"),
      priceFrom: priceFrom,
      priceTo: priceTo,
      location: {
        country: formData.get("country"),
        state: formData.get("state"),
      },
      skills: formData.get("skills"),
      categoryId: categoryId,
      duration: formData.get("duration"),
    };

    const token = localStorage.getItem('authToken');
    console.log(token);

    try {
      const response = await axios.post(
        'http://jobkonnecta.com/api/job/create',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Job posted Successfully');
      console.log('Response:', response);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (err) {
      setErrors({ message: "An error occurred while posting the job." });
      console.error(err);
    }
  }

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
              <div className="grid grid-cols-2 lg:grid-cols-3 justify-between gap-2 items-center">
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Job Title</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="title"
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
                    className="p-2 w-full border-2 rounded-md border-gray-400"
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
                    className="p-2 w-full border-2 rounded-md border-gray-400"
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Salary from</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="priceFrom"
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
                    name="priceTo"
                    type="number"
                    placeholder="3,000"
                    onChange={handleInputChange}
                    required
                  />
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
                  placeholder="Enter Job Summary"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
                <label className="">Required Skills</label>
                <textarea
                  className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                  name="skills"
                  type="text"
                  placeholder="Required Skills"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-2 w-full">
            <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
              <label className="">Job Type</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="categoryId"
                onChange={handleInputChange}
                id="categoryId"
                required
              >
                <option value="" disabled selected>
                  Select Job Type
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
              <label className="">Duration</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="duration"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select Duration
                </option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          {errors.message && (
            <div className="text-red-600 text-center">{errors.message}</div>
          )}

          <div className="w-full flex justify-end items-center my-4">
            <CustomButton
              title="Submit"
              type="submit"
              text="Post Job"
              className="w-[40%] lg:w-[20%] text-center flex justify-center"
            />
          </div>
        </form>
      </div>
    </>
  );
}
