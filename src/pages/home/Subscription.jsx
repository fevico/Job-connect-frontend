import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types"

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
      className={`h-[600px] p-8 ${
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
          className="font-normal uppercase bg-gray-900 text-white p-2"
        >
          {plan.name}
        </Typography>
        <Typography
          variant="h1"
          color={isActive ? "white" : "black"}
          className="mt-6 flex justify-center gap-1 text-5xl"
        >
          <span className="mt-2 text-4xl">₦</span>
          {plan.priceNGN}
          <span className="self-end text-2xl font-normal">/Job post</span>
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
        <ul className="flex flex-col gap-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      {/* <CardFooter className="mt-12 p-0">
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
      </CardFooter> */}
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
  // const [currentPlan, setCurrentPlan] = useState(null);

  // Updated plan data based on your image
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
        "1-month Candidate Database access",
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
        "3-month Candidate Database access",
        "Premium Filtering Tools",
        "Company Logo on Listings",
      ],
    },
  ];

  // const handleSelectPlan = (planId) => {
  //   setCurrentPlan(planId);
  // };

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

      <div className="w-[90%] mx-auto flex flex-col lg:flex-row  items-center p-5 gap-3 justify-between mt-5">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            // isActive={currentPlan === plan.id}
            // onSelect={handleSelectPlan}
          />
        ))}
      </div>
    </>
  );
}
