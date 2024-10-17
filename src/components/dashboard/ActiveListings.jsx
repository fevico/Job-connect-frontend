import React, { useState } from "react";
import {
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  useDeleteJobMutation,
  useGetAllJobsByEmployerQuery,
  useUpdateJobMutation,
} from "../../redux/appData";
import useSession from "@/components/hooks/useSession";
import { BiChevronRight, BiPencil, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import PostJobs from "./PostJobs"; // Assuming this is the add/edit job form component
import { toast } from "react-toastify";

export default function ActiveListings() {
  const { userDetails } = useSession(); // Get the user session details
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [
    deleteJob,
    { isLoading: isDeleting, isSuccess: isDeleted, error: errorDelete },
  ] = useDeleteJobMutation();
  const [updateJob, { isLoading: isUpdating, isSuccess: isUpdated, error: errorUpdate },] = useUpdateJobMutation();
  const [loadingStates, setLoadingStates] = React.useState({}); // To track loading per user

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

  React.useEffect(() => {
    if (isDeleted) {
      toast.success("Job Deleted Successfully!");
    } else if (errorDelete) {
      toast.error("failed to delete job");
    }
  }, [isDeleted, errorDelete]);

  React.useEffect(() => {
    if (isUpdated) {
      toast.success("Job updated Successfully!");
    } else if (errorUpdate) {
      toast.error("failed to update job");
    }
  }, [isUpdated, errorUpdate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load jobs. Please try again.</p>
      </div>
    );
  }
  const role = userDetails.role;

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [jobId]: true }));

      // console.log(jobId)
      await deleteJob(jobId); // Call delete mutation
      setLoadingStates((prev) => ({ ...prev, [jobId]: false }));
    } catch (error) {
      console.error("Failed to delete job", error);
      setLoadingStates((prev) => ({ ...prev, [jobId]: false }));
    }
  };

  const handleEditJob = async (updatedJobData) => {
    try {
      // console.log(updatedJobData);
      await updateJob({ id: selectedJob._id, updatedJob: updatedJobData }); // Call edit mutation
      setOpenDialog(false); // Close dialog after edit
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };


  

  return (
    <>
      <p className="font-bold my-3 uppercase">WELCOME BACK, {role}</p>
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
                    <BiPencil
                      onClick={() => handleOpenDialog(job)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    {isDeleting && loadingStates[job?._id] ? (
                      <Spinner className="w-8 h-8" />
                    ) : (
                      <BiTrash
                        onClick={() => handleDeleteJob(job?._id)}
                        className="w-5 h-5 text-red-400 cursor-pointer"
                      />
                    )}
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

      {/* Dialog for editing job */}
      <Dialog
        size="xl"
        className="h-[90%] overflow-y-auto"
        open={openDialog}
        handler={() => setOpenDialog(false)}
      >
        <DialogHeader>Edit Job</DialogHeader>
        <DialogBody divider>
          {selectedJob && (
            <PostJobs // Reusing the PostJobs component for editing
              initialData={selectedJob}
              isUpdating={isUpdating}
              // onSubmit={""}
              onSubmit={handleEditJob} // Custom handler for job editing
            />
          )}
        </DialogBody>
        <DialogFooter>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
