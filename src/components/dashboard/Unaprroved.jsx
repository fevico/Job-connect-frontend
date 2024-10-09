import React from "react";
import { Spinner } from "@material-tailwind/react"; // Assuming you're using this Spinner component
import {
  useApproveUserMutation,
  useGetUnapprovedUsersQuery,
} from "../../redux/appData";
import { Switch } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function Unapproved() {
  const [approveUser, { isLoading }] = useApproveUserMutation();

  const [loadingStates, setLoadingStates] = React.useState({}); // To track loading per user

  const handleSubmit = async (userId) => {
    // Set loading true for the specific user
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    const credentials = {
      userId: userId,
    };
    console.log(credentials);

    try {
      await approveUser(credentials).unwrap();
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    } catch (err) {
      toast.error("failed");

      // setErrors({ message: "An error occurred while posting the job." });
      console.error(err);
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
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
      <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[18%] pr-2">Name</p>
              <p className="text-xs font-normal w-[20%] pr-2">Location</p>
              <p className="text-xs font-normal w-[18%] pr-2">Email</p>
              <p className="text-xs font-normal w-[14%] pr-2">Role</p>
              <p className="text-xs font-normal w-[10%] pr-2">Status</p>
              <p className="text-xs font-normal w-[15%]"></p>
            </div>

            {/* Jobs Data Rows */}
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((users) => (
                <div
                  key={users?._id}
                  className="flex items-center w-full px-4 py-2 mb-4"
                >
                  <p className="text-sm font-normal w-[18%] pr-2">
                    {users?.name}
                  </p>
                  <p className="text-sm font-normal w-[18%] pr-2">
                    {users?.location?.state
                      ? users?.location?.state
                      : users?.location}
                    , {users?.location?.country ? users?.location?.country : ""}
                  </p>
                  <p className="text-sm font-normal w-[20%] pr-2">
                    {users?.email}
                  </p>
                  <p className="text-sm font-normal w-[14%] pr-2">
                    {users?.role}
                  </p>
                  <p className="text-sm font-normal w-[10%] pr-2">
                    {users?.isApproved === false ? "Unapproved" : "approved"}
                  </p>
                  <p className="text-sm font-normal w-[15%] flex items-center gap-4">
                    {isLoading && loadingStates[users?._id] ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      <Switch
                        checked={users?.isApproved}
                        label="approve"
                        onChange={() => handleSubmit(users?._id)}
                        disabled={loadingStates[users?._id]} // Disable switch while loading
                      />
                    )}
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
    </>
  );
}
