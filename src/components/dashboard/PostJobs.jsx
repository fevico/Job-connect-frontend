import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "react-phone-number-input/style.css";
import CustomButton from "../../components/CustomButton";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useAddJobMutation,
  useGetAllCategoryQuery,
  useGetAllUsersQuery,
} from "../../redux/appData";
import useSession from "../hooks/useSession";
import JobSummaryEditor from "../JobSummaryEditor";

export default function PostJobs({ initialData = {}, onSubmit, isUpdating }) {
  const [country, setCountry] = useState(
    initialData.title ? initialData?.location.country : ""
  );
  const [summary, setSummary] = useState("");
  const [state, setState] = useState(
    initialData.title ? initialData?.location?.state : ""
  );
  const [errors, setErrors] = useState({});
  const [categoryId, setcategoryId] = useState(
    initialData.title ? initialData?.categoryId : ""
  );
  const [referralValue, setReferralValue] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { userDetails } = useSession();

  // console.log(userDetails.id)

  const employer =
    users &&
    users.filter(
      (user) => user.role === "employer" && user._id === userDetails.id
    );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setcategoryId(value);
    }
    if (name === "referral") {
      setReferralValue(value);
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

  const { data: categories } = useGetAllCategoryQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const [addJob, { isSuccess, error, isLoading: isPosting }] =
    useAddJobMutation();

  async function handleSubmit(e) {
    // console.log("samsonnnnnnnnnn");
    // setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

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
      // description: formData.get("summary"),
      description: summary,
      aboutCompany:
        userDetails && userDetails.role === "employer"
          ? employer?.aboutCompany
          : formData.get("aboutCompany"),
      companyName:
        userDetails && userDetails.role === "employer"
          ? employer?.companyName
          : formData.get("companyName"),
      // aboutCompany: "FFFF",
      // companyName: "F",
      industry: formData.get("industry"),
      priceFrom: priceFrom,
      priceTo: priceTo,
      location: {
        country: formData.get("country"),
        state: formData.get("state"),
      },
      skills: formData.get("skills"),
      currency: formData.get("currency"),
      categoryId: categoryId,
      referral: formData.get("referral") || "no",
      referralAmount: Number(formData.get("referralAmount")) || 0,
    };

    // try {
    if (initialData.title) {
      onSubmit(data);
      // return;
    } else {
      await addJob(data);
    }
    // await addJob(data);

    // console.log(data);
    // setLoading(false);
    //   } catch (err) {
    //     toast.error("Job posting failed");

    //     // setErrors({ message: "An error occurred while posting the job." });
    //     console.error(err);
    //     setLoading(false);
    //   }
  }

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Job Posted Successfully!");
      setErrors({});
      navigate("/active-listing");
    } else if (error) {
      toast.error("failed to post job");
      setErrors(error);
    }
  }, [isSuccess, error, navigate]);

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
                    defaultValue={initialData.title || ""}
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
                    defaultValue={initialData.industry || ""}
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
                    defaultValue={initialData.priceFrom || ""}
                    placeholder="2,000"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <label className="">Salary to</label>
                  <input
                    defaultValue={initialData.priceTo || ""}
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

            <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
              <div className="flex flex-col items-start gap-1 w-full">
                <label className="">Job Summary</label>
                {/* <textarea
                  className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                  name="summary"
                  type="text"
                  placeholder="Enter Job Summary"
                  onChange={handleInputChange}
                  required
                /> */}
                <JobSummaryEditor
                  onChange={setSummary}
                  data={initialData.description || ""}
                />{" "}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
              {userDetails && userDetails.role != "employer" && (
                <div className="flex flex-col items-start gap-1 w-full lg:w-1/2  ">
                  <label className="">Company name</label>
                  <input
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="companyName"
                    type="text"
                    defaultValue={initialData.companyName || ""}
                    placeholder="company Name"
                    onChange={handleInputChange}
                    required
                    // disabled={userDetails && userDetails.role === "employer"}
                  />
                </div>
              )}
              <div className="flex flex-col items-start gap-1 w-full lg:w-1/2  ">
                <label className="">Required Skills</label>
                <input
                  className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                  name="skills"
                  defaultValue={initialData.skills || ""}
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
                defaultValue={categoryId || ""}
              >
                <option value="" disabled selected>
                  Select job Type
                </option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
              <label className="">Payment Currency</label>
              <select
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="currency"
                onChange={handleInputChange}
                required
                defaultValue={initialData.currency || ""}
              >
                <option value="" disabled selected>
                  Select Currency
                </option>
                <option value="naira">Naira (₦)</option>{" "}
                {/* Nigerian currency */}
                <option value="rand">South African Rand (ZAR)</option>
                <option value="cedi">Ghanaian Cedi (GHS)</option>
                <option value="shilling">Kenyan Shilling (KES)</option>
                <option value="egp">Egyptian Pound (EGP)</option>
                <option value="gbp">British Pound (GBP)</option>{" "}
                <option value="euro">Euro (EUR)</option>
                {/* UK currency */}
                <option value="dollar">US Dollar (USD)</option>{" "}
                {/* If you need USD */}
              </select>
            </div>

            {/* <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
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
            </div> */}
          </div>

          {userDetails && userDetails.role != "employer" && (
            <>
              <div className="flex flex-col lg:flex-row items-start gap-2 w-full">
                <div
                  className={`flex flex-col items-start gap-1 w-full ${
                    referralValue === "yes" ? "lg:w-1/2" : "lg:w-full"
                  } `}
                >
                  <label className="">Referral</label>
                  <select
                    className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                    name="referral"
                    defaultValue={initialData.referral || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled selected>
                      Is this a referral job?
                    </option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {referralValue === "yes" && (
                  <div className="flex flex-col items-start gap-1 w-full lg:w-1/2 ">
                    <label className="">Referral Amount</label>
                    <input
                      defaultValue={initialData.referralAmount || ""}
                      className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                      name="referralAmount"
                      type="number"
                      placeholder="Enter Referral amount"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start gap-1 w-full ">
                <label className="">About Company</label>
                <textarea
                  defaultValue={initialData.aboutCompany || ""}
                  className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                  name="aboutCompany"
                  type="text"
                  placeholder="Enter brief company info"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {errors && (
            <div className="text-red-600 text-center">
              {error?.data?.message}
            </div>
          )}

          <div className="w-full flex justify-end items-center my-4">
            <CustomButton
              title="Submit"
              type="submit"
              text={
                isPosting
                  ? "Posting..."
                  : isUpdating
                  ? "Updating..."
                  : initialData.title
                  ? "Edit Job"
                  : "Post Job"
              }
              className="w-[40%] lg:w-[20%] text-center flex justify-center"
            />
          </div>
        </form>
      </div>
    </>
  );
}
