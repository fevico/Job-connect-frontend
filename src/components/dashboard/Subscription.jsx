import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import useSession from "../hooks/useSession";
import PropTypes from "prop-types";
import {
  useSubscribeMutation,
  useGetEmployerPlanQuery,
  useGetSubscriptionVerifyPaymentQuery,
} from "../../redux/appData";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function PricingCard({ plan, isActive, onSelect, disabled }) {
  return (
    <Card
      variant="gradient"
      className={`p-8 ${isActive ? "bg-gray-900 text-white" : "bg-gray-500"}`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color={isActive ? "white" : "black"}
          className="font-normal uppercase"
        >
          {plan.name}
        </Typography>
        <Typography
          variant="h1"
          color={isActive ? "white" : "black"}
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">₦</span>
          {plan.priceNGN}
          <span className="self-end text-4xl">/job post</span>
        </Typography>
        <Typography
          variant="small"
          color={isActive ? "white" : "black"}
          className="font-normal uppercase"
        >
          ({plan.priceUSD} USD)
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color={isActive ? "white" : "black"}
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
          onClick={() => !disabled && onSelect(plan.id)} // Prevent click if disabled
          disabled={disabled}
        >
          {isActive ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}

PricingCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming plan.id is a string
    name: PropTypes.string.isRequired,
    priceNGN: PropTypes.number.isRequired, // Assuming price is a number
    priceUSD: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of feature strings
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired, // onSelect should be a function
  disabled: PropTypes.bool, // Optional, defaults to false
};

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { userDetails } = useSession();

  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Call the query hook with the reference
  const {
    data: paymentData,
    isSuccess: isSuccessVPayment,
    error: errorVPayment,
  } = useGetSubscriptionVerifyPaymentQuery(reference, {
    skip: !reference, // Skip the query if there is no reference
  });

  React.useEffect(() => {
    if (isSuccessVPayment) {
      console.log("Payment verification successful:", paymentData);
      setSearchParams({}); // Clear search params after verification
      setIsModalOpen(true); // Open the modal on successful verification
    } else if (errorVPayment) {
      console.error("Error verifying payment:", errorVPayment);
    }
  }, [isSuccessVPayment, errorVPayment, paymentData, setSearchParams]);

  // Fetch current plan from server (this should return plan details including expiry date)
  const { data: currentPlanDetails } = useGetEmployerPlanQuery();
  // console.log(currentPlanDetails);

  const [subscribe] = useSubscribeMutation();

  const userEmail = userDetails?.email;

  useEffect(() => {
    // Set the current plan based on what is fetched from the API
    if (currentPlanDetails) {
      setCurrentPlan(currentPlanDetails.planId); // Assuming `planId` is returned
    }
  }, [currentPlanDetails]);

  const handleSelectPlan = async (planId) => {
    const plan = plans.find((p) => p.id === planId);
    // setLoading(true);

    try {
      const metadata = {
        planName: plan.name,
        userId: userDetails.id,
      };

      const credentials = {
        amount: plan.priceNGN * 100,
        email: userEmail,
        metadata,
      };

      const response = await subscribe(credentials);
      // setLoading(false);
      console.log(response);

      if (response?.data?.data?.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        console.error("Authorization URL not found.");
      }
    } catch (error) {
      console.error("Payment Error: ", error);
      // setLoading(false);
    }
  };

  const hasActivePlan = !!currentPlanDetails?.expiryDate; // Check if a plan is active
  const expiryDate = new Date(currentPlanDetails?.expiryDate);

  // const isPlanExpired = expiryDate && expiryDate < new Date();

  // Updated plan data
  const plans = [
    {
      id: "basic",
      name: "Basic",
      priceNGN: 10000,
      priceUSD: 15,
      features: ["3 Jobs Post", "14 days Job Visibility", "Email Support"],
    },
    {
      id: "standard",
      name: "Standard",
      priceNGN: 25000,
      priceUSD: 35,
      features: [
        "5 Job Posts",
        "30 days Job Visibility",
        "Featured Job Listing",
        "Social Media Promotion",
        "Employer Branding",
        "Email & Phone Support",
        "1-month Access to Candidate Database",
        "Custom Candidate Filtering",
        "Company Logo on Listings",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      priceNGN: 50000,
      priceUSD: 70,
      features: [
        "10 Job Posts",
        "45 days Job Visibility",
        "Featured Job Listing",
        "Social Media Promotion",
        "Priority Listing and Branding",
        "24/7 Priority Support",
        "3-month Access to Candidate Database",
        "Premium Filtering Tools",
        "Company Logo on Listings",
      ],
    },
  ];

  return (
    <>
      <div className="bg-white">
        <p className="text-[12px] lg:text-[18px]">Pricing plans</p>
        <h2 className="text-[20px] lg:text-[30px] font-bold text-primary">
          Introducing pricing plans
        </h2>
        <p className="text-[12px] lg:text-[18px]">
          Explore Plans that make life easier for the Employer
        </p>
        {hasActivePlan && (
          <p className="text-[14px] mt-4 text-gray-600">
            Your current plan expires on: {expiryDate.toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="w-[90%] mx-auto flex flex-col lg:flex-row flex-wrap items-center p-5 gap-3 justify-between mt-5">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isActive={currentPlan === plan.id}
            onSelect={handleSelectPlan}
            // disabled={!isPlanExpired && currentPlan !== plan.id}
            disabled={false}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Payment Successful!</DialogHeader>
        <DialogBody>
          <p>Your payment was successful! Thank you for your purchase.</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
