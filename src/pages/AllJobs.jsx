import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import JobCard from "../components/JobCard";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useGetAllJobsQuery } from "../redux/appData";

export default function AllJobs() {
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filterOption, setFilterOption] = useState(""); // State for filtering by date
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSearch = searchParams.get("search");
  const searchResults = location.state?.SearchResults;

  const { data: allJobs, isLoading } = useGetAllJobsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    let jobsToUse = allJobs;

    if (isSearch && searchResults?.length > 0) {
      jobsToUse = searchResults;
    }
    setFilteredJobs(jobsToUse);
  }, [allJobs, searchResults, isSearch]);

  // Function to filter jobs based on time frame
  const filterJobsByDate = (timeFrame) => {
    const now = new Date();
    let filteredJobs = [];

    if (allJobs && allJobs.length > 0) {
      filteredJobs = allJobs.filter((job) => {
        const postedAt = new Date(job.postedAt);

        if (timeFrame === "24hrs") {
          return now - postedAt <= 24 * 60 * 60 * 1000; // Last 24 hours
        } else if (timeFrame === "7days") {
          return now - postedAt <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
        } else if (timeFrame === "2weeks") {
          return now - postedAt <= 14 * 24 * 60 * 60 * 1000; // Last 2 weeks
        } else {
          return true; // No filter, return all jobs
        }
      });

    }
    setFilteredJobs(filteredJobs);
  };

  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);
    filterJobsByDate(selectedOption);
    console.log(selectedOption)
  };

  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const handleJobClick = (job) => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  if (isLoading) {
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

      <div className="flex justify-between w-[90%] mx-auto mt-5 items-center">
        <div className="flex flex-col items-center leading-5 mb-3">
          <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
            All Jobs ({filteredJobs && filteredJobs.length})
          </h2>
          <span className="flex items-center w-full justify-end">
            <hr className="border-2 border-primary w-1/2" />
            <hr className="rounded-full p-1 bg-primary border-none" />
          </span>
        </div>
        <div className="">
          <select
            className="py-3 px-5 w-full rounded-lg bg-gray-200"
            onChange={handleFilterChange}
            value={filterOption}
          >
            <option value="">All Time</option>
            <option value="24hrs">Last 24 hrs</option>
            <option value="7days">Last 7 days</option>
            <option value="2weeks">Last 2 weeks</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3  w-[90%] mx-auto  my-5">
        <div className="space-y-4">
          {filteredJobs &&
            filteredJobs
              .slice(0, visibleJobs)
              .map((job, index) => (
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
                  onClick={() => handleJobClick(job)}
                  id={job._id}
                  currency={job.currency}

                />
              ))}
        </div>
      </div>
      {filteredJobs && visibleJobs < filteredJobs.length && (
        <div className="flex justify-end  my-5 w-[95%]">
          <CustomButton onClick={handleSeeMore} text={"Explore more jobs"} />
        </div>
      )}
    </>
  );
}
