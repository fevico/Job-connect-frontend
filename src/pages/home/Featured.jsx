import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import JobCard from "../../components/JobCard";
import { jobs } from "../../DB/Data";

export default function Featured() {
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };
  return (
    <>
      <div className="bg-white w-full  p-5  mt-5">
        <div className="flex flex-col gap-3 items-start w-[90%] mx-auto ">
          <div className="flex flex-col items-center leading-5 mb-3">
            <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
              Featured Jobs
            </h2>
            <span className="flex items-center w-full justify-end">
              <hr className="border-2 border-primary w-1/2" />
              <hr className="rounded-full p-1 bg-primary border-none" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3  w-[90%] mx-auto  my-5">
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
          <div
            onClick={handleSeeMore}
            className="flex justify-end  my-5 w-[95%]"
          >
            <CustomButton link={""} text={"Explore more jobs"} />
          </div>
        )}
      </div>
    </>
  );
}
