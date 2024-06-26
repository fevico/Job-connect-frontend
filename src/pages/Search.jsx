import React, { useState } from "react";
import search from "@/assets/images/search.png";
import CustomButton from "@/components/CustomButton";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import { jobs } from "../DB/Data";
import { Helmet } from "react-helmet";

export default function Search() {
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [filteredJobs, setFilteredJobs] = useState();

  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };
  return (
    <>
      <Helmet>
        <title>Search - JobKonnectaNG</title>
        <meta name="description" content="Search for jobs" />
        <meta name="keywords" content="jobs, search, find" />
        <meta name="author" content="Jobkonnect" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="p-2 px-8 lg:h-20 w-[97%] flex mx-auto bg-[#D5D5DC] justify-between items-center mt-4">
        <h1 className="text-primary/50 shadow-[#000000/25%] lg:text-[16px]  font-[800]">
          Search result for UI Design:
        </h1>
        <Link
          to="/all-jobs"
          className="text-primary shadow-[#000000/25%]  text-sm font-[800] hover:text-blue-500 cursor-pointer"
        >
          View all jobs
        </Link>
      </div>
      {filteredJobs ? (
        <>
          {/* job found start */}
          <div className="mt-4 lg:mt-8 flex flex-col gap-5 items-center">
            <div className="bg-[#2C2F4E] p-4 w-full flex flex-col lg:flex-row gap-3 justify-around items-center ">
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
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* filter end */}

          <div className="flex flex-col gap-3  w-[90%] mx-auto my-5">
            <div className="space-y-4">
              {filteredJobs.slice(0, visibleJobs).map((job, index) => (
                <JobCard
                  key={index}
                  title={job.title}
                  company={job.company}
                  salary={job.salary}
                  jobType={job.jobType}
                  location={job.location}
                  postedTime={job.postedTime}
                  link={job.link}
                />
              ))}
            </div>
          </div>
          {visibleJobs < filteredJobs.length && (
            <div className="flex justify-end  my-5 w-[95%]">
              <CustomButton
                onClick={handleSeeMore}
                text={"View similar jobs"}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 mt-8">
          <img src={search} alt="" className="lg:w-1/4" />
          <p className="text-primary font-bold">
            Unable to locate the job you were looking for?
          </p>
          <p className="text-primary font-[300] text-center w-[90%]">
            Explore other active job opportunities that may interest you
          </p>
          <CustomButton link={""} text={"View active jobs"} />
        </div>
      )}
    </>
  );
}
