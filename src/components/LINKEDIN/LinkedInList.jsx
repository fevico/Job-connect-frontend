import React, { useEffect, useState } from "react";
import LinkedInCard from "./LinkedInCard";

const linkedinoptimizers = [
  {
    name: "Victor James",
    bio: "Senior LinkedIn Optimizer with 10 years of experience helping professionals across various industries enhance their LinkedIn profiles and advance their careers.",
    image: "",
    id: 1,
  },
  {
    name: "Sophia Martinez",
    bio: "Experienced LinkedIn Optimizer specializing in executive profiles, with a focus on highlighting leadership skills and achievements.",
    image: "",
    id: 2,
  },
  {
    name: "Ethan Williams",
    bio: "Creative LinkedIn Optimizer with a background in marketing and design, known for creating visually appealing and content-rich profiles.",
    image: "",
    id: 3,

  },
  {
    name: "Olivia Brown",
    bio: "LinkedIn Optimization expert with a decade of experience, dedicated to helping job seekers stand out in competitive online networks.",
    image: "",
    id: 4,

  },
  {
    name: "Liam Johnson",
    bio: "Passionate about career development, I specialize in crafting LinkedIn profiles that reflect individual strengths and career goals.",
    image: "",
    id: 5,

  },
  {
    name: "Isabella Davis",
    bio: "Professional LinkedIn Optimizer with expertise in IT and tech industries, creating profiles that showcase technical skills and achievements.",
    image: "",
    id: 6,

  },
  {
    name: "Noah Wilson",
    bio: "LinkedIn Optimizer with a talent for transforming complex career histories into clear, concise, and impactful profiles.",
    image: "",
    id: 7,

  },
  {
    name: "Emma Garcia",
    bio: "Skilled LinkedIn Optimizer with a background in human resources, ensuring profiles align with what hiring managers are looking for.",
    image: "",
    id: 8,

  },
  {
    name: "Mason Lee",
    bio: "Dedicated to helping clients secure their dream jobs, I specialize in optimizing LinkedIn profiles that highlight key achievements.",
    image: "",
    id: 9,

  },
  {
    name: "Ava Rodriguez",
    bio: "With a focus on healthcare professionals, I craft LinkedIn profiles that emphasize qualifications, certifications, and experience.",
    image: "",
    id: 10,

  },
  {
    name: "Lucas Clark",
    bio: "LinkedIn Optimizer with a deep understanding of finance and banking sectors, creating profiles that speak to industry-specific skills.",
    image: "",
    id: 11,

  },
  {
    name: "Mia Lewis",
    bio: "Expert LinkedIn Optimizer for creative professionals, I help artists, designers, and writers showcase their talents effectively.",
    image: "",
    id: 12,

  },
  {
    name: "Elijah Walker",
    bio: "Experienced in optimizing LinkedIn profiles for academic and research professionals, highlighting publications, grants, and teaching experience.",
    image: "",
    id: 13,

  },
  {
    name: "Charlotte Young",
    bio: "LinkedIn Optimizer specializing in entry-level profiles, helping new graduates and career changers make a strong first impression.",
    image: "",
    id: 14,

  },
  {
    name: "Henry Scott",
    bio: "Skilled at crafting LinkedIn profiles for engineering professionals, emphasizing technical skills, project experience, and certifications.",
    image: "",
    id: 15,

  },
];


const LinkedInList = ({ searchQuery }) => {
  const [visibleLinkedIn, setVisibleLinkedIn] = useState(10);
  // const [filteredJobs, setFilteredJobs] = useState(jobs);

  // useEffect(() => {
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     const filtered = jobs.filter(
  //       (job) =>
  //         job.title.toLowerCase().includes(query) ||
  //         job.company.toLowerCase().includes(query) ||
  //         job.location.toLowerCase().includes(query)
  //     );
  //     setFilteredJobs(filtered);
  //   } else {
  //     setFilteredJobs(jobs);
  //   }
  // }, [searchQuery]);

  const handleSeeMore = () => {
    setVisibleLinkedIn((prevVisibleLinkedIn) => prevVisibleLinkedIn + 5);
  };

  return (
    <div className="space-y-4 mb-3">
      {/* {filteredJobs.slice(0, visibleJobs).map((job, index) => ( */}
      {linkedinoptimizers.map((linkedin, index) => (
        <LinkedInCard
          key={index}
          name={linkedin.name}
          image={linkedin.image}
          bio={linkedin.bio}
          id={linkedin.id}
          specialization="Resume Writing & Career Coaching"
          rating="4.8"
          services="Resume writing, cover letter creation, LinkedIn profile optimization"
        />
      ))}
      {/* {visibleLinkedIn < filteredCvWriters.length && ( */}
      {visibleLinkedIn < linkedinoptimizers.length && (
        <div className="flex w-full justify-end">
          <button
            onClick={handleSeeMore}
            className="bg-primary text-white p-2 rounded my-3"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkedInList;
