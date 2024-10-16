import React, { useState } from "react";
import { Button, Dialog, Spinner } from "@material-tailwind/react"; // Assuming you're using this Spinner component
import {
  useApproveUserMutation,
  useGetUnapprovedUsersQuery,
} from "../../redux/appData";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";
import useSession from "../hooks/useSession";

export default function Unapproved() {
  const [approveUser, { isLoading }] = useApproveUserMutation();
  const { userDetails } = useSession(); // Get the user session details
  const role = userDetails.role;

  // const [loadingStates, setLoadingStates] = React.useState({}); // To track loading per user

  const handleSubmit = async (userId) => {
    // Set loading true for the specific user
    // setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    const credentials = {
      userId: userId,
    };
    console.log(credentials);

    try {
      await approveUser(credentials).unwrap();
      // setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    } catch (err) {
      toast.error("failed");

      // setErrors({ message: "An error occurred while posting the job." });
      console.error(err);
      // setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewInfo = (users) => {
    setSelectedUser(users);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const {
    data: allUsers,
    isLoading: fetchingUsers,
    error: errorUsers,
  } = useGetUnapprovedUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(allUsers);

  if (fetchingUsers) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (errorUsers) {
    // console.log(errorUsers)
    if (errorUsers.data.message === "No unapproved users found") {
      return (
        <div className="flex items-center justify-center w-full py-10">
          <p className="text-sm font-normal">
            No unapproved user at this time.
          </p>
        </div>
      );
    } else
      return (
        <div className="h-screen flex items-center justify-center">
          <p className="text-red-500">
            Failed to load users. Please try again.
          </p>
        </div>
      );
  }

  return (
    <>
      <p className="font-bold my-3 uppercase">WELCOME BACK, {role}</p>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[24%] pr-2">Name</p>
              {/* <p className="text-xs font-normal w-[20%] pr-2">Location</p> */}
              <p className="text-xs font-normal w-[18%] pr-2 mr-4">Email</p>
              <p className="text-xs font-normal w-[14%] pr-2">Role</p>
              <p className="text-xs font-normal w-[15%] pr-2">Status</p>
              <p className="text-xs font-normal w-[15%]"></p>
            </div>

            {/* Jobs Data Rows */}
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((users) => (
                <div
                  key={users?._id}
                  className="flex items-center w-full px-4 py-2 mb-4"
                >
                  <p className="text-sm font-normal w-[24%] pr-2">
                    {users?.name}
                  </p>
                  {/* <p className="text-sm font-normal w-[18%] pr-2">
                    {users?.location?.state
                      ? users?.location?.state
                      : users?.location}
                    , {users?.location?.country ? users?.location?.country : ""}
                  </p> */}
                  <p className="text-sm font-normal w-[20%] pr-2 mr-4">
                    {users?.email}
                  </p>
                  <p className="text-sm font-normal w-[14%] pr-2">
                    {users?.role}
                  </p>
                  <p className="text-sm font-normal w-[15%] pr-2">
                    {users?.isApproved === false ? "Unapproved" : "approved"}
                  </p>
                  <p className="text-sm font-normal w-[15%] flex items-center gap-4">
                    {/* {isLoading && loadingStates[users?._id] ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      <Switch
                        checked={users?.isApproved}
                        label="approve"
                        onChange={() => handleSubmit(users?._id)}
                        disabled={loadingStates[users?._id]} // Disable switch while loading
                      />
                    )} */}

                    <CustomButton
                      text="View Info"
                      onClick={() => handleViewInfo(users)}
                    />
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-10">
                <p className="text-sm font-normal">
                  No unapproved user at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          {selectedUser && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                {selectedUser.role === "employer"
                  ? selectedUser.companyName
                  : selectedUser.name}
              </h2>

              {/* Common fields for all users */}
              <p className="text-gray-700">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p className="text-gray-700">
                <strong>State:</strong> {selectedUser.state}
              </p>
              <p className="text-gray-700">
                <strong>Account Verification:</strong>{" "}
                {selectedUser.isVerified ? "Verified" : "Not Verified"}
              </p>
              <p className="text-gray-700">
                <strong>Suspended:</strong>{" "}
                {selectedUser.suspended ? "Yes" : "No"}
              </p>
              <p className="text-gray-700">
                <strong>Account Status:</strong>{" "}
                {selectedUser.isApproved ? "Approved" : "Pending Approval"}
              </p>

              {/* Employer-specific fields */}
              {selectedUser.role === "employer" && (
                <>
                  <p className="text-gray-700">
                    <strong>Employer Name:</strong> {selectedUser.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Company Address:</strong>{" "}
                    {selectedUser.companyAddress}
                  </p>
                  <p className="text-gray-700">
                    <strong>Industry:</strong> {selectedUser.industry}
                  </p>
                  <p className="text-gray-700">
                    <strong>Employer Type:</strong> {selectedUser.employerType}
                  </p>
                  <p className="text-gray-700">
                    <strong>Number of Employees:</strong>{" "}
                    {selectedUser.numberOfEmployees}
                  </p>
                  <p className="text-gray-700">
                    <strong>Registration Number:</strong>{" "}
                    {selectedUser.registrationNumber}
                  </p>
                  <p className="text-gray-700">
                    <strong>Website:</strong> {selectedUser.website}
                  </p>
                </>
              )}

              {/* Linkedin Optimizer-specific fields */}
              {selectedUser.role === "linkedinOptimizer" && (
                <>
                  <p className="text-gray-700">
                    <strong>Years of Experience:</strong>{" "}
                    {selectedUser.yearsOfExperience}
                  </p>
                  <p className="text-gray-700">
                    <strong>Work Hours:</strong> {selectedUser.workHours}
                  </p>
                  <p className="text-gray-700">
                    <strong>Response Time:</strong> {selectedUser.responseTime}
                  </p>
                </>
              )}

              {/* CV Writer-specific fields */}
              {selectedUser.role === "cvWriter" && (
                <>
                  <p className="text-gray-700">
                    <strong>Years of Experience:</strong>{" "}
                    {selectedUser.yearsOfExperience}
                  </p>
                  <p className="text-gray-700">
                    <strong>Work Hours:</strong> {selectedUser.workHours}
                  </p>
                  <p className="text-gray-700">
                    <strong>Response Time:</strong> {selectedUser.responseTime}
                  </p>
                </>
              )}
            </>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              onClick={handleCloseDialog}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Close
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => handleSubmit(selectedUser?._id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              {isLoading ? "Loading..." : "Approve User"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
