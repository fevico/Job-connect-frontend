import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
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

function PricingCard({ plan, isActive, onSelect }) {
  return (
    <Card
      variant="gradient"
      className={`w-full max-w-[15rem] p-8 ${
        isActive ? "bg-gray-900 text-white" : "bg-gray-500"
      }`}
      onClick={() => onSelect(plan.id)}
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
          <span className="mt-2 text-4xl">$</span>
          {plan.price}
          <span className="self-end text-4xl">/mo</span>
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
          onClick={() => onSelect(plan.id)}
        >
          {isActive ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState(null);


  // Example plan data
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 19,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      id: "standard",
      name: "Standard",
      price: 29,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      id: "premium",
      name: "Premium",
      price: 49,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
  ];

  const handleSelectPlan = (planId) => {
    setCurrentPlan(planId);
  };


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
      </div>

        <div className="w-[90%] mx-auto flex flex-col lg:flex-row flex-wrap items-center p-5 gap-3 justify-between mt-5">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isActive={currentPlan === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      
    </>
  );
}
