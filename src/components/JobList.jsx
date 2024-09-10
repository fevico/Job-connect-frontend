import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobList = ({ searchQuery }) => {
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery]);

  const handleSeeMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 5);
  };

  return (
    <div className="space-y-4">
      {filteredJobs.slice(0, visibleJobs).map((job, index) => (
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
      {visibleJobs < filteredJobs.length && (
        <button
          onClick={handleSeeMore}
          className="bg-primary text-white p-2 rounded"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default JobList;
