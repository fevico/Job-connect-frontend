import { Spinner } from "@material-tailwind/react"; // Assuming you're using this Spinner component
import { useGetAllPackagesQuery } from "../../redux/appData"; // Assuming you're fetching packages
import useSession from "@/components/hooks/useSession";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AllPackages() {
  const { userDetails } = useSession(); // Get the user session details
  const role = userDetails.role;
  // Fetch all packages
  const {
    data: allPackages,
    isLoading,
    error,
  } = useGetAllPackagesQuery(userDetails?.id, {
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

  console.log(error);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error?.data?.message ? error.data.message : "Failed to load packages. Please try again."}
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
              <p className="text-xs font-normal w-[34%] pr-2">Package Name</p>
              <p className="text-xs font-normal w-[26%] pr-2">Price</p>
              {/* <p className="text-xs font-normal w-[12%] pr-2">Duration</p> */}
              <p className="text-xs font-normal w-[20%] pr-2">Subscribers</p>
              {/* <p className="text-xs font-normal w-[15%] pr-2">Status</p> */}
              <p className="text-xs font-normal w-[15%]"></p>
            </div>

            {/* Packages Data Rows */}
            {allPackages && allPackages.length > 0 ? (
              allPackages.map((pkg) => (
                <div
                  key={pkg?._id}
                  className="flex items-center w-full px-4 py-2 mb-4"
                >
                  <p className="text-sm font-normal w-[34%] pr-2">
                    {pkg?.title}
                  </p>
                  <p className="text-sm font-normal w-[26%] pr-2">
                  ₦{pkg?.price}
                  </p>
                  {/* <p className="text-sm font-normal w-[17%] pr-2">
                    {pkg?.duration} days
                  </p> */}
                  <p className="text-sm font-normal w-[20%] pr-2">
                    <Link
                      state={{ productId: pkg?._id }}
                      to={"/applications-services"}
                      className="flex gap-1 items-center justify-center rounded-lg bg-primary p-2 text-white font-semibold"
                    >
                      view <BiChevronRight />
                    </Link>
                  </p>
                  {/* <p className="text-sm font-normal w-[15%] pr-2">
                    {pkg?.status === "active" ? "Active" : "Inactive"}
                  </p> */}
                  <p className="text-sm font-normal w-[15%] flex items-center gap-4 ml-5">
                    {/* <BiPencil
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleEditPackage(pkg?._id)}
                    />
                    <BiTrash
                      className="w-5 h-5 text-red-400 cursor-pointer"
                      onClick={() => handleDeletePackage(pkg?._id)}
                    /> */}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-10">
                <p className="text-sm font-normal">
                  No packages available yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

