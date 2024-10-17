import  { useState } from "react";
import CustomButton from "../../components/CustomButton";
import JobCard from "../../components/JobCard";
import { useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "@/redux/appData";
import { Spinner } from "@material-tailwind/react";

export default function Featured() {
  const [visibleJobs, setVisibleJobs] = useState(10);
  const navigate = useNavigate();

  const {
    data: allJobs,
    isLoading,
  } = useGetAllJobsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(allJobs);

  const featured = allJobs && allJobs.filter((job) => job.isFeatured === true);

  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  const handleJobClick = (job) => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  return (
    <>
      <div className="bg-white w-full p-5 mt-5">
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
        <div className="flex flex-col gap-3 w-[97%] lg:w-[90%] mx-auto my-5">
          {isLoading ? (
            <div className="items-center justify-center flex">
              <Spinner className="w-8 h-8 text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {featured &&
                featured
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
                      referral={job.referral}
                      currency={job.currency}
                    />
                  ))}
            </div>
          )}
        </div>
        {featured && visibleJobs < featured.length && (
          <div
            onClick={handleSeeMore}
            className="flex justify-end my-5 w-[95%]"
          >
            <CustomButton link={""} text={"Explore more jobs"} />
          </div>
        )}
      </div>
    </>
  );
}
