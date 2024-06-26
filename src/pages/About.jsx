import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import about from "@/assets/images/about.png";
import about1 from "@/assets/images/about1.png";
import about2 from "@/assets/images/about2.png";
import about3 from "@/assets/images/about3.png";
import about4 from "@/assets/images/about4.png";
import CustomButton from "@/components/CustomButton";
import { Helmet } from "react-helmet";

const data = [
  {
    image: about1,
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
    image: about2,
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
    image: about3,
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
    image: about4,
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

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - JobKonnectaNG</title>
        <meta name="description" content="About Us - JobKonnectaNG" />
        <meta name="keywords" content="About Us, JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JobKonnectaNG" />
      </Helmet>

      <Breadcrumb
        title1={"Want to Know More About Us"}
        title2={"Get to know us more"}
      />

      <p className="text-center lg:text-[20px] font-[300] text-primary w-[90%] lg:w-[80%] mx-auto mt-4">
        Welcome to JobKonnecta, your premier destination for comprehensive
        career services designed to elevate your professional journey. We
        understand that navigating the job market can be challenging, and we are
        here to provide the tools and support you need to succeed. At
        JobKonnecta, our mission is to bridge the gap between job seekers and
        their dream careers. We are dedicated to empowering individuals with the
        resources, guidance, and expertise necessary to stand out in a
        competitive job market.
      </p>
      <img src={about} alt="" className="h-[250px] w-full mt-4 object-cover" />

      {data.map((about, index) => (
        <div
          key={index}
          className="w-[97%] mx-auto bg-[#D5D5DC] p-5 mt-4 rounded-lg lg:max-h-[300px] mb-2 "
        >
          <div
            className={`flex flex-col lg:flex-row gap-5 ${
              index % 2 === 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-1/2">
              <img
                src={about.image}
                alt={about.title}
                className="w-full h-3/4"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-3 p-5">
              <h2 className="lg:text-[20px] font-[700] text-primary text-left">
                {about.title}
              </h2>
              <p className="lg:text-[20px] font-[400] text-primary text-left">
                {about.paragraph}
              </p>

              {about.features.map((feature, i) => (
                <li
                  key={i}
                  className="lg:text-[20px] font-[400] text-primary text-left leading-3"
                >
                  {feature}
                </li>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end my-[30px] w-[95%]">
        <CustomButton link={"#"} text={"Signup/login"} />
      </div>
    </>
  );
}
