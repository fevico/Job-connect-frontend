import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import JobList from "@/components/JobList";
import JobCard from "../components/JobCard";
import axios from "axios";
// import { jobs } from "../DB/Data";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

export default function AllJobs() {
  const [visibleJobs, setVisibleJobs] = useState(10);
  // const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [getJobs, setGetJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSearch = searchParams.get("search");
  const searchResults = location.state?.SearchResults || [];

  useEffect(() => {
    // Determine the products to use: search results, all products, or filtered by category
    let jobsToUse = getJobs;

    if (isSearch && searchResults.length > 0) {
      jobsToUse = searchResults; // Use search results if available
    }
    setFilteredJobs(jobsToUse);
  }, [getJobs, searchResults, isSearch]);


  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };
  const allJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jobkonnecta.com/api/job/all-jobs"
      );
      setLoading(false);

      setGetJobs(response.data);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    allJobs();
  }, []);

  const handleJobClick = (id) => {
    navigate(`/job/${id}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Jobkonnekt - All Jobs</title>
        <meta name="description" content="Jobkonnekt - All Jobs" />
        <meta name="keywords" content="Jobkonnekt, All Jobs" />
        <meta name="author" content="Jobkonnekt" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {/* filter start */}
      {/* job found start */}
      <div className="mt-4 lg:mt-8 flex flex-col gap-5 items-center">
        {/* <div className="bg-[#2C2F4E] p-4 w-full flex flex-col lg:flex-row gap-3 justify-around items-center ">
          <div className="flex items-center lg:justify-between gap-4 lg:overflow-x-hidden w-full lg:w-[70%] mx-auto overflow-x-scroll ">
            <select className="py-3 px-5 w-full  rounded-lg bg-gray-200">
              <option value="">Select job location</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <select className="py-3 px-5 w-full rounded-lg bg-gray-200">
              <option value="">Select job type</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <div className="w-full">
              <button className="py-2 px-4  font-medium text-white  text-center border-[#ACD4FF] hover:bg-blue-500 rounded-lg border-2 w-full bg-primary ">
                Search
              </button>{" "}
            </div>
          </div>
        </div> */}
      </div>

      {/* filter end */}
      <div className="flex justify-between w-[90%] mx-auto mt-5 items-center">
        <div className="flex flex-col items-center leading-5 mb-3">
          <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
            All Jobs
          </h2>
          <span className="flex items-center w-full justify-end">
            <hr className="border-2 border-primary w-1/2" />
            <hr className="rounded-full p-1 bg-primary border-none" />
          </span>
        </div>
        <div className="">
          <select className="py-3 px-5 w-full rounded-lg bg-gray-200">
            <option value="">Last 7 days</option>
            <option value="">1</option>
            <option value="">2</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3  w-[90%] mx-auto  my-5">
        <div className="space-y-4">
          {getJobs.slice(0, visibleJobs).map((job, index) => (
           <JobCard
           key={index}
           title={job.title}
           companyName={job?.companyName || "companyName"}
           description={job.description}
           priceFrom={job.priceFrom || 20888}
           priceTo={job.priceTo || 60300} 
           jobType={job.jobType || "Remote"}
           location={`${job.location.state}, ${job.location.country}`}
           postedTime={job.postedAt}
           onClick={() => handleJobClick(job._id)}
           id={job._id}
         />
          ))}
        </div>
      </div>
      {visibleJobs < getJobs.length && (
        <div className="flex justify-end  my-5 w-[95%]">
          <CustomButton onClick={handleSeeMore} text={"Explore more jobs"} />
        </div>
      )}
    </>
  );
}
