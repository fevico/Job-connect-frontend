import JobCard from "../components/JobCard";
import { Helmet } from "react-helmet";
import { Spinner } from "@material-tailwind/react";
import {
  useGetAllAppliedJobsQuery,
  useGetAllUsersQuery,
  useGetUserOrdersQuery,
} from "../redux/appData";
import Breadcrumb from "../components/Breadcrumb";
import useSession from "../components/hooks/useSession";

export default function UserDashboard() {
  const { userDetails } = useSession();

  const { data: allJobs, isLoading } = useGetAllAppliedJobsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: allServices, isLoading: isLoadingServices } =
    useGetUserOrdersQuery(undefined, {
      refetchOnMountOrArgChange: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // console.log(userDetails.id)

  const jobseeker =
    users &&
    users.filter(
      (user) => user.role === "jobseeker" && user._id === userDetails.id
    );
  // console.log("applied", jobseeker);
  // console.log("applied", allServices);

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

      <div className="bg-white shadow-md shadow-gray-500 p-4 flex flex-col w-[70%] mx-auto mt-5 items-center">
        <p className="font-semibold text-sm">Referral Balance</p>
        <div className="flex flex-col items-center gap-2 mt-4">
          <h2 className="font-bold text-4xl">
            &#8358;{(jobseeker && jobseeker?.referralBalance) || 0}
          </h2>
          {/* <p className="text-sm">Available for Withdrawal</p> */}
        </div>
      </div>

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
