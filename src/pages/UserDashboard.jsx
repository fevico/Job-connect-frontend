import React from "react";
import JobCard from "../components/JobCard";
import { Helmet } from "react-helmet";
import { Spinner } from "@material-tailwind/react";
import {
  useGetAllAppliedJobsQuery,
  useGetUserOrdersQuery,
} from "../redux/appData";
import Breadcrumb from "../components/Breadcrumb";
import useSession from "../components/hooks/useSession";

export default function UserDashboard() {
  const {
    data: allJobs,
    isLoading,
    error,
  } = useGetAllAppliedJobsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: allServices,
    isLoading: isLoadingServices,
    error: errorServices,
  } = useGetUserOrdersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // console.log("applied", allJobs);
  console.log("applied", allServices);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (isLoadingServices) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const { userDetails } = useSession();

  return (
    <>
      <Helmet>
        <title>Jobkonnekt - All User Jobs</title>
        <meta name="description" content="Jobkonnekt - All User Jobs" />
        <meta name="keywords" content="Jobkonnekt, All User Jobs" />
        <meta name="author" content="Jobkonnekt" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <Breadcrumb
        title1={`Hello ${userDetails?.email}, Welcome to Your Dashboard`}
        title2={"Check out what’s happening"}
      />

      <div className="flex justify-between w-[90%] mx-auto mt-5 items-center">
        <div className="flex flex-col items-center leading-5 mb-3">
          <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
            Job Applications
          </h2>
          <span className="flex items-center w-full justify-end">
            <hr className="border-2 border-primary w-1/2" />
            <hr className="rounded-full p-1 bg-primary border-none" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3  w-[90%] mx-auto  my-5">
        <div className="space-y-4">
          {allJobs &&
            allJobs.map((job, index) => (
              <JobCard
                key={index}
                title={job.jobTitle}
                companyName={job?.companyName || "companyName"}
                // description={job.description}
                // priceFrom={job.priceFrom || 20888}
                // priceTo={job.priceTo || 60300}
                // jobType={job.jobType || "Remote"}
                // location={`${job.location.state}, ${job.location.country}`}
                postedTime={job.appliedAt}
                // onClick={() => handleJobClick(job)}
                // id={job._id}
                status={job.status}
                userDashboard
              />
            ))}
        </div>
      </div>

      <div className="flex justify-between w-[90%] mx-auto mt-5 items-center">
        <div className="flex flex-col items-center leading-5 mb-3">
          <h2 className="text-primary font-bold text-[16px] lg:text-[24px]">
            Services
          </h2>
          <span className="flex items-center w-full justify-end">
            <hr className="border-2 border-primary w-1/2" />
            <hr className="rounded-full p-1 bg-primary border-none" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3  w-[90%] mx-auto  my-5">
        <div className="space-y-4">
          {allServices &&
            allServices.map((service, index) => (
              <JobCard
                key={index}
                title={
                  service?.productId?.type === "cvwriter"
                    ? "CV Writing"
                    : "LinkedIn Service"
                }
                companyName={`₦${service?.productId?.price}`}
                // description={job.description}
                // priceFrom={job.priceFrom || 20888}
                // priceTo={job.priceTo || 60300}
                // jobType={job.jobType || "Remote"}
                // location={`${job.location.state}, ${job.location.country}`}
                postedTime={service?.updatedAt}
                // onClick={() => handleJobClick(job)}
                // id={job._id}
                status={service.serviceStatus}
                vendorId={service.vendorId}
                userDashboard
                services
              />
            ))}
        </div>
      </div>
    </>
  );
}
