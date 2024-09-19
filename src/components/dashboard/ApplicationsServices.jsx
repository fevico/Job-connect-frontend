import React, { useState } from "react";
import CustomButton from "../CustomButton";
import { useLocation } from "react-router-dom";
import {
  useGetSuccessfulOrdersQuery,

  useSendCVMutation,
} from "../../redux/appData";
import { Dialog } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { storage } from "../hooks/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ApplicationsServices() {
  const location = useLocation();
  const productId = location.state?.productId;

  const {
    data: applications,
    isLoading: isLoadingApplications,
    error,
  } = useGetSuccessfulOrdersQuery(productId, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log("jja", applications);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewInfo = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
  };

  const [cvFile, setCvFile] = useState(null);
  const handleCVFileChange = (e) => {
    setCvFile(e.target.files[0]); // Save the selected file to state
  };

  const [
    sendCV,
    { isSuccess: isSendingSuccess, error: sendError },
  ] = useSendCVMutation();

  const handleUploadCV = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error("Please select a CV file to upload.");
      return;
    }

    let cvUrl = "";

    // Proceed with the upload if CV file is present
    if (cvFile) {
      const storageRef = ref(storage, `newcv/${cvFile.name}`);
      try {
        setIsLoading(true);
        // Upload the file
        await uploadBytes(storageRef, cvFile);
        // Get the download URL
        cvUrl = await getDownloadURL(storageRef);
        setIsLoading(false);

        // console.log("Uploaded CV URL:", cvUrl);
      } catch (error) {
        setIsLoading(false);
        console.error("Error uploading CV:", error);
        toast.error("Failed to upload CV. Please try again.");
        return;
      }
    }

    const data = {
      name: selectedApplication.name,
      email: selectedApplication.email,
      cv: cvUrl,
    };
    // console.log("DATA", data);
    try {
      await sendCV(data);
      setOpenDialog(false); // Close the dialog after successful upload
      setCvFile(null); // Clear the file input
    } catch (error) {
      toast.error("Failed to upload CV.");
      console.error("Upload CV error", error);
    }
  };

  React.useEffect(() => {
    if (isSendingSuccess) {
      setOpenDialog(false);

      toast.success("CV Sent successfully!");
    } else if (sendError) {
      setOpenDialog(false);
      toast.error(`failed to send cv, ${sendError.data.message}`);
    }
  }, [isSendingSuccess, sendError]);

  if (isLoadingApplications) return <p>Loading...</p>;
  if (error) return <p>Error loading applications: {error.message}</p>;

  return (
    <>
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[35%] pr-2">
                Candidate Email
              </p>
              {/* <p className="text-xs font-normal w-[26%] pr-2">Job Title</p> */}
              <p className="text-xs font-normal w-[24%] pr-2">Date Applied</p>
              <p className="text-xs font-normal w-[21%] pr-2">Service Status</p>
              <p className="text-xs font-normal w-[20%]"></p>
            </div>

            {/* Data Rows */}
            {applications?.map((application) => (
              <div
                key={application._id}
                className="flex items-center w-full px-4 py-2 mb-4"
              >
                <p className="text-sm font-normal w-[35%] pr-2">
                  {application.email}
                </p>
                {/* <p className="text-sm font-normal w-[26%] pr-2">
                  {application.jobTitle}
                </p> */}
                <p className="text-sm font-normal w-[24%] pr-2">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-normal w-[21%] pr-2">
                  {application.serviceStatus}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        className="h-screen overflow-y-scroll"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          {selectedApplication && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {selectedApplication.packageTitle} Package
              </h2>

              <p className="text-gray-700">
                <strong>Candidate Name:</strong>{" "}
                {selectedApplication.name || "Not Provided"}
              </p>

              <p className="text-gray-700">
                <strong>User Email:</strong> {selectedApplication.email}
              </p>

              {/* <p className="text-gray-700">
                <strong>Phone Number:</strong>{" "}
                {selectedApplication.phoneNumber || "Not Provided"}
              </p> */}

              <p className="text-gray-700">
                <strong>Professional Summary:</strong>{" "}
                {selectedApplication.professionalSummary}
              </p>

              <p className="text-gray-700">
                <strong>Work Experience:</strong>{" "}
                {selectedApplication.workExperience}
              </p>

              <p className="text-gray-700">
                <strong>Education:</strong> {selectedApplication.education}
              </p>

              <p className="text-gray-700">
                <strong>Skills:</strong> {selectedApplication.skills}
              </p>

              <div className="mt-4 flex justify-start">
                <CustomButton
                  text="Upload CV"
                  onClick={() => setShowInput(true)} // Add the logic for uploading a CV here
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                />
              </div>
              {showInput && (
                <form onSubmit={handleUploadCV} className="my-4">
                  <input
                    type="file"
                    onChange={handleCVFileChange}
                    className="border my-3 rounded-md border-primary"
                    placeholder="Upload CV"
                  />
                  <button
                    onClick={handleCloseDialog}
                    disabled={isLoading}
                    type="submit"
                    className="p-2 bg-primary text-white rounded-md"
                  >
                    {isLoading ? "sending..." : "Send CV"}
                  </button>
                </form>
              )}
            </>
          )}

          <div className="mt-6 flex justify-between">
            <CustomButton
              text="Close"
              onClick={handleCloseDialog}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
