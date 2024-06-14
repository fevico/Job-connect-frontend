import React from "react";
import JobCard from "./JobCard";

const jobs = [
  {
    title: "Sales Team Lead",
    company: "ShortComingsNG",
    salary: "₦300,000 - ₦350,000",
    jobType: "Full-Time",
    location: "Lagos State, Nigeria",
    postedTime: "Posted 3 mins ago",
    link: "#"
  },
  {
    title: "Marketing Manager",
    company: "AwesomeCorp",
    salary: "₦400,000 - ₦500,000",
    jobType: "Part-Time",
    location: "Abuja, Nigeria",
    postedTime: "Posted 1 hour ago",
    link: "#"
  },
  {
    title: "Software Developer",
    company: "Techie Ltd.",
    salary: "₦600,000 - ₦700,000",
    jobType: "Remote",
    location: "Anywhere, Nigeria",
    postedTime: "Posted 2 days ago",
    link: "#"
  },
  // Add more job objects as needed
];

export default function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          company={job.company}
          salary={job.salary}
          jobType={job.jobType}
          location={job.location}
          postedTime={job.postedTime}
          link={job.link}
        />
      ))}
    </div>
  );
}
