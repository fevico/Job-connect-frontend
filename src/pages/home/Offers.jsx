import React, { useEffect, useState } from "react";
import offers1 from "@/assets/images/offers1.png";
import offers2 from "@/assets/images/offers2.png";
import offers3 from "@/assets/images/offers3.png";
import offers4 from "@/assets/images/offers4.png";
import CustomButton from "../../components/CustomButton";
import Slider from "react-slick";

const data = [
  {
    image: offers1,
    title: "CV Writing",
    paragraph:
      "A well-crafted CV can make all the difference in landing your dream job. We tailor your CV to highlight your strengths and experiences, ensuring it stands out. Our services include:",
    features: [
      "Personalized Consultation",
      "Professional Formatting",
      "Content Enhancement",
      "Industry-Specific Focus",
    ],
  },
  {
    image: offers2,
    title: "Interview Coaching",
    paragraph:
      "Prepare with confidence. Our coaching services help you master interview techniques, body language, and responses to common questions.",
    features: [
      "Mock Interviews",
      "Feedback and Improvement",
      "Body Language Tips",
      "Response Strategies",
    ],
  },
  {
    image: offers3,
    title: "Job Search Assistance",
    paragraph:
      "Find the right job opportunities. We guide you through effective job search strategies, networking, and application processes.",
    features: [
      "Job Boards and Listings",
      "Networking Tips",
      "Application Assistance",
      "Follow-up Techniques",
    ],
  },
  {
    image: offers4,
    title: "Career Counseling",
    paragraph:
      "Get personalized career advice. Our counselors help you set career goals, identify strengths, and plan your career path.",
    features: [
      "Career Assessments",
      "Goal Setting",
      "Strength Identification",
      "Path Planning",
    ],
  },
];

export default function Offers() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // **Responsive adjustments for centering:**
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          // Centering for larger screens using `centerMode`
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="w-full bg-[#8cb2bd] mt-5 py-4">
        <h2 className="text-[20px] lg:text-[30px] font-bold text-primary">
          What Our Platform Offers
        </h2>
        <p className="text-[12px] lg:text-[18px]">
          Your Future, Our Priority: Discover Opportunities, Land Your Dream Job
        </p>
        {isDesktop ? (
          <div className="w-[90%] mx-auto flex flex-col lg:flex-row flex-wrap items-center p-5 gap-5 justify-between mt-5">
            {data.map((offer, index) => (
              <div key={index} className="max-w-[250px] ">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-auto"
                />
                <div className="rounded-b-xl flex flex-col bg-[#464545] px-3 py-4 text-white text-[14px] gap-3 h-[300px]">
                  <h2 className="text-center text-[18px] font-semibold">
                    {offer.title}
                  </h2>
                  <p className="text-center h-[60%]">{offer.paragraph}</p>
                  {offer.features.map((feature, i) => (
                    <li key={i} className="text-left leading-3">
                      {feature}
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="slider-container p-2 mt-5 ">
            <Slider {...settings}>
              {data.map((offer, index) => (
                <div key={index} className=" ">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-auto"
                  />
                  <div className="rounded-b-xl flex flex-col bg-[#464545] px-3 py-4 text-white text-[14px] gap-3 h-[300px]">
                    <h2 className="text-center text-[18px] font-semibold">
                      {offer.title}
                    </h2>
                    <p className="text-center h-[60%]">{offer.paragraph}</p>
                    {offer.features.map((feature, i) => (
                      <li key={i} className="text-left leading-3">
                        {feature}
                      </li>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className="flex justify-end w-[90%] mx-auto ">
          <CustomButton link={"#"} text={"READ MORE"} />
        </div>
      </div>
    </>
  );
}
