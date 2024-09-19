import React from "react";
import { Spinner } from "@material-tailwind/react"; // Assuming you're using this Spinner component
import {
  useGetAllMessagesQuery,
  useUpdateMessageMutation,
} from "../../redux/appData";
import { toast } from "react-toastify";

export default function Messages() {
  const {
    data: allMessages,
    isLoading: fetchingMessages,
    error: errorMessages,
  } = useGetAllMessagesQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(allMessages);

  const [updateMessage, { isSuccess, error }] = useUpdateMessageMutation();

  const handleSubmit = async (updatedMessage) => {
    // Extract the updated status from the message
    const credentials = {
      status: updatedMessage.status,
    };

    console.log(credentials);

    try {
      // Pass the updated credentials and message ID to the updateMessage API
      await updateMessage({
        credentials,
        contactId: updatedMessage._id,
      }).unwrap();
      // toast.success("Message status updated successfully!");
    } catch (err) {
      toast.error("Failed to update message status.");
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("status updated Successfully!");
    } else if (error) {
      toast.error("failed to update message status");
    }
  }, [isSuccess, error]);

  if (fetchingMessages) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (errorMessages) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load users. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      {/* <p className="font-bold my-3">WELCOME BACK, EMPLOYER</p> */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="bg-[#E2F0FF] p-5">
            {/* Header Row */}
            <div className="flex items-center w-full px-4 py-2 mb-4 border-b-2 border-primary">
              <p className="text-xs font-normal w-[18%] pr-2">firstName</p>
              <p className="text-xs font-normal w-[20%] pr-2">Date</p>
              <p className="text-xs font-normal w-[18%] pr-2">Email</p>
              {/* <p className="text-xs font-normal w-[14%] pr-2">Role</p> */}
              <p className="text-xs font-normal w-[15%] pr-2">Status</p>
              <p className="text-xs font-normal w-[15%]"></p>
            </div>

            {/* Jobs Data Rows */}
            {allMessages && allMessages.length > 0 ? (
              allMessages.map((message) => (
                <div
                  key={message?._id}
                  className="flex items-center w-full px-4 py-2 mb-4"
                >
                  <p className="text-sm font-normal w-[18%] pr-2">
                    {message?.firstName}
                  </p>
                  <p className="text-sm font-normal w-[18%] pr-2">
                    {new Date(message?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-normal w-[20%] pr-2">
                    {message?.email}
                  </p>
                  {/* <p className="text-sm font-normal w-[14%] pr-2">
                    {users?.role}
                  </p> */}
                  <p className="text-sm font-normal w-[15%] pr-2 ml-4">
                    {message.status}
                  </p>
                  <p className="text-sm font-normal w-[15%] flex items-center gap-4">
                    <button
                      disabled={message.status === "success"}
                      onClick={() => {
                        const updatedMessage = { ...message };

                        // Update the message status based on its current status
                        if (message.status === "pending") {
                          updatedMessage.status = "processing";
                        } else if (message.status === "processing") {
                          updatedMessage.status = "success";
                        }

                        // Pass the updated message object to the handleSubmit function
                        handleSubmit(updatedMessage);
                      }}
                      className="text-xs bg-primary p-2 text-white cursor-pointer text-center font-semibold hover:bg-primary/70 rounded-md shadow-md"
                    >
                      {message.status === "pending"
                        ? "Mark as Processing"
                        : message.status === "processing"
                        ? "Mark as Resolved"
                        : "Resolved"}
                    </button>
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
