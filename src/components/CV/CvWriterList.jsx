import React, { useEffect, useState } from "react";
import CvWriterCard from "./CvWriterCard";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/appData";

const CvWriterList = ({ searchQuery }) => {
  const [visibleCvWriters, setVisibleCvWriters] = useState(10);
  const {
    data: users,
    isLoading: fetchingUsers,
    error: errorUsers,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const cvWriters = users && users.filter((user) => user.role === "cvwriter");
  // const [filteredJobs, setFilteredJobs] = useState(jobs);

  console.log(cvWriters);
  console.log(users);
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

  const navigate = useNavigate(); // Initialize navigate

  const handleCvWriterClick = (cvwriter) => {
    navigate(`/cvwriter/${cvwriter.id}`, { state: { cvwriter } }); // Navigate to the details page with the current CV writer's id
  };
  return (
    <div className="space-y-4 mb-3">
      {/* {filteredJobs.slice(0, visibleJobs).map((job, index) => ( */}
      {cvWriters &&
        cvWriters.map((cvWriter, index) => (
          <CvWriterCard
            key={index}
            name={cvWriter.name}
            image={cvWriter.image}
            bio={cvWriter.bio}
            specialization="Resume Writing & Career Coaching"
            rating="4.8"
            services="Resume writing, cover letter creation, LinkedIn profile optimization"
            id={cvWriter.id}
            onClick={() => handleCvWriterClick(cvWriter)}
          />
        ))}
      {/* {visibleCvWriters < filteredCvWriters.length && ( */}
      {cvWriters && visibleCvWriters < cvWriters.length && (
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
