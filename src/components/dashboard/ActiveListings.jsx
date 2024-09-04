import React from "react";
import CustomButton from "../CustomButton";
import { Spinner } from "@material-tailwind/react"; // Assuming you're using this Spinner component
import { useGetAllJobsByEmployerQuery } from "../../redux/appData";
import useSession from "@/components/hooks/useSession";
import { BiChevronRight, BiPencil, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ActiveListings() {
  const { userDetails } = useSession(); // Get the user session details

  // Fetch jobs by employer using the user's ID
  const {
    data: allJobs,
    isLoading,
    error,
  } = useGetAllJobsByEmployerQuery(userDetails?.id, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  console.log(allJobs);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load jobs. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[24%] pr-2">Job Title</p>
              <p className="text-xs font-normal w-[20%] pr-2">Location</p>
              <p className="text-xs font-normal w-[12%] pr-2">Date Posted</p>
              <p className="text-xs font-normal w-[14%] pr-2">Applications</p>
              <p className="text-xs font-normal w-[10%] pr-2">Status</p>
              <p className="text-xs font-normal w-[15%]"></p>
            </div>

            {/* Jobs Data Rows */}
            {allJobs && allJobs.length > 0 ? (
              allJobs.map((job) => (
                <div
                  key={job?._id}
                  className="flex items-center w-full px-4 py-2 mb-4"
                >
                  <p className="text-sm font-normal w-[24%] pr-2">
                    {job?.title}
                  </p>
                  <p className="text-sm font-normal w-[20%] pr-2">
                    {job?.location.state}, {job?.location.country}
                  </p>
                  <p className="text-sm font-normal w-[12%] pr-2">
                    {new Date(job?.postedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-normal w-[14%] pr-2">
                    <Link
                      state={{ jobId: job?._id }}
                      to={"/applications"}
                      className="flex gap-1 items-center justify-center rounded-lg bg-primary p-2 text-white font-semibold"
                    >
                      view <BiChevronRight />
                    </Link>
                  </p>
                  <p className="text-sm font-normal w-[10%] pr-2">
                    {job?.status}
                  </p>
                  <p className="text-sm font-normal w-[15%] flex items-center gap-4">
                    <BiPencil onClick={""} className="w-5 h-5 cursor-pointer" />
                    <BiTrash
                      onClick={""}
                      className="w-5 h-5 text-red-400 cursor-pointer"
                    />
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-10">
                <p className="text-sm font-normal">No jobs posted yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function handleJobClick(job) {
  // Logic to handle job click and navigate to the job details page
  console.log("Job clicked:", job);
  // navigate(`/job/${job?._id}`, { state: { job } }); // Example using react-router's navigate with state
}

// navigaey to applcatons page with
