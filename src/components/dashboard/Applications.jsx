import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { useLocation } from "react-router-dom";
import {
  useGetJobAppQuery,
  useHireMutation,
  useRejectMutation,
  useShortlistMutation,
} from "../../redux/appData";
import { Dialog } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function Applications() {
  const location = useLocation();
  const jobId = location.state?.jobId;

  const {
    data: applications,
    isLoading,
    error,
  } = useGetJobAppQuery(jobId, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(applications);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleViewInfo = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
  };

  const [hire, { isSuccess, isLoading: isHiring, error: hireError }] =
    useHireMutation();

  const handleHireCandidate = async (e) => {
    e.preventDefault();

    const data = {
      id: selectedApplication._id,
      // status: selectedApplication.status,
      applicantId: selectedApplication.userId,
    };
    console.log(data);
    try {
      await hire({ data, id: jobId });
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
      toast.success("Hired Successfully!");
    } else if (hireError) {
      setOpenDialog(false);
      toast.error(`failed to hire, ${hireError.data.message}`);
    }
  }, [isSuccess, hireError]);

  const [
    shortlist,
    {
      isSuccess: isShortlistSuccess,
      isLoading: isShortlisting,
      error: shortlistError,
    },
  ] = useShortlistMutation();

  const handleShortlistCandidate = async (e) => {
    e.preventDefault();

    const data = {
      jobId: jobId,
      // status: selectedApplication.status,
      userId: selectedApplication.userId,
    };
    console.log(data);
    try {
      await shortlist({ data, id: selectedApplication._id });
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (isShortlistSuccess) {
      setOpenDialog(false);
      toast.success("Shortlisted Successfully!");
    } else if (shortlistError) {
      setOpenDialog(false);
      toast.error(`failed to Shortlist, ${shortlistError.data.message}`);
    }
  }, [isShortlistSuccess, shortlistError]);

  const [
    reject,
    { isSuccess: isRejectSuccess, isLoading: isRejecting, error: rejectError },
  ] = useRejectMutation();

  const handleRejectCandidate = async (e) => {
    e.preventDefault();

    const data = {
      jobId: jobId,
      // status: selectedApplication.status,
      userId: selectedApplication.userId,
    };
    console.log(data);
    try {
      await reject({ data, id: selectedApplication._id });
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (isRejectSuccess) {
      setOpenDialog(false);
      toast.success("Rejected Successfully!");
    } else if (rejectError) {
      setOpenDialog(false);
      toast.error(`failed to reject, ${rejectError.data.message}`);
    }
  }, [isRejectSuccess, rejectError]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading applications: {error.message}</p>;

  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[25%] pr-2">Candidate Name</p>
              <p className="text-xs font-normal w-[26%] pr-2">Job Title</p>
              <p className="text-xs font-normal w-[16%] pr-2">Date Applied</p>
              <p className="text-xs font-normal w-[13%] pr-2">Status</p>
              <p className="text-xs font-normal w-[20%]"></p>
            </div>

            {/* Data Rows */}
            {applications?.map((application) => (
              <div
                key={application._id}
                className="flex items-center w-full px-4 py-2 mb-4"
              >
                <p className="text-sm font-normal w-[25%] pr-2">
                  {application.name}
                </p>
                <p className="text-sm font-normal w-[26%] pr-2">
                  {application.jobTitle}
                </p>
                <p className="text-sm font-normal w-[16%] pr-2">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-normal w-[13%] pr-2">
                  {application.status}
                </p>
                <p className="text-sm font-normal w-[20%]">
                  <CustomButton
                    text="View Info"
                    onClick={() => handleViewInfo(application)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog for application details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          {selectedApplication && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {selectedApplication.jobTitle}
              </h2>
              <p className="text-gray-700">
                <strong>Candidate Name:</strong> {selectedApplication.name}
              </p>
              <p className="text-gray-700">
                <strong>Date Applied:</strong>{" "}
                {new Date(selectedApplication.appliedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {selectedApplication.status}
              </p>
              <p className="text-gray-700">
                <strong>Company Name:</strong> {selectedApplication.companyName}
              </p>
              <p className="text-gray-700">
                <strong>User Email:</strong> {selectedApplication.userEmail}
              </p>
              <p className="mt-4">
                <strong>Resume:</strong>
                <CustomButton
                  text="View Resume"
                  onClick={() =>
                    window.open(selectedApplication.resume, "_blank")
                  }
                  className="ml-2 mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                />
              </p>
            </>
          )}
          <div className="mt-6 flex justify-between">
            <CustomButton
              text="Close"
              onClick={handleCloseDialog}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            />

            {selectedApplication && (
              <>
                {selectedApplication.status === "shortlisted" && (
                  <>
                    <CustomButton
                      text={isHiring ? "Hiring..." : "Hire"}
                      onClick={handleHireCandidate}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                    />
                    <CustomButton
                      text={isRejecting ? "Rejecting..." : "Reject"}
                      onClick={handleRejectCandidate}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    />
                  </>
                )}

                {selectedApplication.status === "applied" && (
                  <CustomButton
                    text={isShortlisting ? "Shortlisting..." : "Shortlist"}
                    onClick={handleShortlistCandidate}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
