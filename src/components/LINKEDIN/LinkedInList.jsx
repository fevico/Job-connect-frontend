import React, { useEffect, useState } from "react";
import LinkedInCard from "./LinkedInCard";
import { useGetAllUsersQuery } from "../../redux/appData";

const LinkedInList = ({ searchQuery }) => {
  const [visibleLinkedIn, setVisibleLinkedIn] = useState(10);
  const {
    data: users,
    isLoading: fetchingUsers,
    error: errorUsers,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const linkedinOptimizers =
    users && users.filter((user) => user.role === "linkedinOptimizer");
  // const [filteredJobs, setFilteredJobs] = useState(jobs);

  console.log(linkedinOptimizers);
  console.log(users);
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
      {linkedinOptimizers.map((linkedin, index) => (
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
      {visibleLinkedIn < linkedinOptimizers.length && (
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
