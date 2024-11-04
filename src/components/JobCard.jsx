import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import CustomButton from "./CustomButton";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAddRatingMutation, useGetRatingQuery } from "../redux/appData";
import Rating from "react-rating";
import DOMPurify from "dompurify";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
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
  referral,
  vendorId,
  currency,
}) {
  const { data: currenRating } = useGetRatingQuery(vendorId, {
    skip: !vendorId, // Skip the query if vendorId is not defined
  });

  React.useEffect(() => {
    if (vendorId) {
      // console.log(currenRating);
      setRating(currenRating?.averageRating);
      // Process or log currenRating data here
    }
  }, [vendorId, currenRating]);

  const [rating, setRating] = React.useState(
    vendorId ? currenRating?.averageRating : 3
  );

  const currencySymbols = {
    naira: "₦",
    dollar: "$",
    rand: "R",
    cedi: "₵",
    shilling: "KSh",
    gbp: "£",
    egp: "E£",
    euro: "€", // Egyptian pound also uses £
  };

  const [addRating, { isSuccess, error }] = useAddRatingMutation();
  const handleRating = async (rate) => {
    setRating(rate);

    const credentials = {
      ratingValue: rate,
    };
    console.log(credentials);
    try {
      await addRating({ credentials, ownerId: vendorId });
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
      {referral === "yes" && (
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
                {currencySymbols[currency]}{" "}
                {new Intl.NumberFormat().format(priceFrom)} -{" "}
                {currencySymbols[currency]}{" "}
                {new Intl.NumberFormat().format(priceTo)}
              </button>

              <p className="">
                {jobType} | {location}
              </p>
            </>
          )}
          <p className="line-clamp-2 overflow-hidden text-left text-[12px] lg:text-[16px]">
            <div
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            />
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

// Define PropTypes for JobCard
JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  priceFrom: PropTypes.number.isRequired,
  priceTo: PropTypes.number.isRequired,
  jobType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userDashboard: PropTypes.bool.isRequired,
  services: PropTypes.bool,
  status: PropTypes.string,
  referral: PropTypes.string,
  vendorId: PropTypes.string.isRequired,
};
