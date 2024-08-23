import React, { useEffect, useState } from "react";
import CvWriterCard from "./CvWriterCard";

const cvWriters = [
  {
    name: "Victor James",
    bio: "Senior CV Writer with 10 years of experience helping professionals across various industries craft compelling CVs and advance their careers.",
    image: "",
    id: 1,
  },
  {
    name: "Sophia Martinez",
    bio: "Experienced CV Writer specializing in executive resumes, with a focus on highlighting leadership skills and achievements.",
    image: "",
    id: 2,
  },
  {
    name: "Ethan Williams",
    bio: "Creative CV Writer with a background in marketing and design, known for creating visually appealing and content-rich resumes.",
    image: "",
    id: 3,
  },
  {
    name: "Olivia Brown",
    bio: "CV Writing expert with a decade of experience, dedicated to helping job seekers stand out in competitive job markets.",
    image: "",
    id: 4,
  },
  {
    name: "Liam Johnson",
    bio: "Passionate about career development, I specialize in crafting resumes that reflect individual strengths and career goals.",
    image: "",
    id: 5,
  },
  {
    name: "Isabella Davis",
    bio: "Professional CV Writer with expertise in IT and tech industries, creating resumes that showcase technical skills and achievements.",
    image: "",
    id: 6,
  },
  {
    name: "Noah Wilson",
    bio: "CV Writer with a talent for transforming complex career histories into clear, concise, and impactful resumes.",
    image: "",
    id: 7,
  },
  {
    name: "Emma Garcia",
    bio: "Skilled CV Writer with a background in human resources, ensuring resumes align with what hiring managers are looking for.",
    image: "",
    id: 8,
  },
  {
    name: "Mason Lee",
    bio: "Dedicated to helping clients secure their dream jobs, I specialize in writing resumes that highlight key achievements.",
    image: "",
    id: 9,
  },
  {
    name: "Ava Rodriguez",
    bio: "With a focus on healthcare professionals, I craft CVs that emphasize qualifications, certifications, and experience.",
    image: "",
    id: 10,
  },
  {
    name: "Lucas Clark",
    bio: "CV Writer with a deep understanding of finance and banking sectors, creating resumes that speak to industry-specific skills.",
    image: "",
    id: 11,
  },
  {
    name: "Mia Lewis",
    bio: "Expert CV Writer for creative professionals, I help artists, designers, and writers showcase their talents effectively.",
    image: "",
    id: 12,
  },
  {
    name: "Elijah Walker",
    bio: "Experienced in writing CVs for academic and research professionals, highlighting publications, grants, and teaching experience.",
    image: "",
    id: 13,
  },
  {
    name: "Charlotte Young",
    bio: "CV Writer specializing in entry-level resumes, helping new graduates and career changers make a strong first impression.",
    image: "",
    id: 14,
  },
  {
    name: "Henry Scott",
    bio: "Skilled at crafting resumes for engineering professionals, emphasizing technical skills, project experience, and certifications.",
    image: "",
    id: 15,
  },
];

const CvWriterList = ({ searchQuery }) => {
  const [visibleCvWriters, setVisibleCvWriters] = useState(10);
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
    setVisibleCvWriters((prevVisibleCvWriters) => prevVisibleCvWriters + 5);
  };

  return (
    <div className="space-y-4 mb-3">
      {/* {filteredJobs.slice(0, visibleJobs).map((job, index) => ( */}
      {cvWriters.map((cvWriter, index) => (
        <CvWriterCard
          key={index}
          name={cvWriter.name}
          image={cvWriter.image}
          bio={cvWriter.bio}
          id={cvWriter.id}
        />
      ))}
      {/* {visibleCvWriters < filteredCvWriters.length && ( */}
      {visibleCvWriters < cvWriters.length && (
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

export default CvWriterList;
