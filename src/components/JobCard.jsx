import React from "react";
import CustomButton from "./CustomButton";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useAddRatingMutation,
} from "../redux/appData";
import Rating from "react-rating";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long", // 'short' for abbreviated month
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format; set to false for 24-hour
  };
  return date.toLocaleDateString(undefined, options);
}

export default function JobCard({
  title,
  description,
  companyName,
  priceFrom,
  priceTo,
  jobType,
  location,
  postedTime,
  onClick,
  id,
  userDashboard,
  services,
  status,
  referal,
  vendorId,
}) {
  const [rating, setRating] = React.useState(3); // Default initial rating

  const [addRating, { isSuccess, isLoading, error }] = useAddRatingMutation();

  const handleRating = async (rate) => {
    setRating(rate);

    const data = {
      rating: rate,
    };
    console.log(data);
    try {
      await addRating({ data, owner: vendorId  });
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Rating added Successfully!");
    } else if (error) {
      toast.error(`failed to rate`);
    }
  }, [isSuccess, error]);

  return (
    <div
      className="border-[#001F3F]/40 border rounded-[30px] px-5 py-3 lg:py-10 w-full relative"
      id={id}
    >
      {referal === "yes" && (
        <div className="absolute top-0 right-0 bg-gray-300 rounded-tr-[30px] p-3 font-semibold italic text-sm">
          referral
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center h-[180px] lg:h-[120px] w-full">
        <div className="flex flex-col gap-1 lg:gap-2 items-start w-full lg:w-[80%]">
          <h2 className="text-left font-bold text-[14px] lg:text-[18px] line-clamp-1 overflow-hidden">
            {title} @ {companyName}
          </h2>
          {!userDashboard && (
            <>
              <button className="p-2 bg-[#2C2F4E]/70 text-center text-white rounded">
                &#8358;{priceFrom} - &#8358;{priceTo}
              </button>
              <p className="">
                {jobType} | {location}
              </p>
            </>
          )}
          <p className="line-clamp-2 overflow-hidden text-left text-[12px] lg:text-[16px]">
            {description}
          </p>
          <p className="text-xs text-red-500">{formatDate(postedTime)}</p>
          {services && userDashboard ? (
            <div className="">
              <p className="text-xs italic">Please rate this service here: </p>
              <Rating
                onChange={handleRating}
                start={0}
                stop={5}
                step={1}
                initialRating={rating}
                emptySymbol={<FaRegStar className="text-yellow-400" />}
                fullSymbol={<FaStar className="text-yellow-400" />}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        {userDashboard ? (
          <div className="">
            Current Status:{" "}
            <span className="bg-gray-300 p-2 font-semibold uppercase">
              {status}
            </span>
          </div>
        ) : (
          <CustomButton text={"VIEW DETAILS"} onClick={onClick} />
        )}
      </div>
    </div>
  );
}
