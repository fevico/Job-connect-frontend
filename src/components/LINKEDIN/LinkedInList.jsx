import { useState } from "react";
import LinkedInCard from "./LinkedInCard";
import { useGetAllUsersQuery } from "../../redux/appData";
import { useNavigate } from "react-router-dom";

const LinkedInList = () => {
  const [visibleLinkedIn, setVisibleLinkedIn] = useState(10);
  const {
    data: users,
    // isLoading: fetchingUsers,
    // error: errorUsers,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

 


  const linkedinOptimizers =
    users &&
    users.filter(
      (user) =>
        user.role === "linkedinOptimizer" &&
        user.suspended === false &&
        user.isApproved === true &&
        user.isVerified === true
    );
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
  const navigate = useNavigate(); // Initialize navigate

  const handleLinkedinOptimizerClick = (linkedin) => {
    navigate(`/linkedin/${linkedin._id}`, { state: { linkedin } }); // Navigate to the details page with the current CV writer's id
  };
  return (
    <div className="space-y-4 mb-3">
      {/* {filteredJobs.slice(0, visibleJobs).map((job, index) => ( */}
      {linkedinOptimizers &&
        linkedinOptimizers.map((linkedin, index) => (
          <LinkedInCard
            key={index}
            name={linkedin.name}
            image={linkedin.avatar}
            bio={linkedin.bio}
            id={linkedin._id}
            specialization={linkedin.specialization}
            services={linkedin.services}
            onClick={() => handleLinkedinOptimizerClick(linkedin)}
          />
        ))}
      {linkedinOptimizers && visibleLinkedIn < linkedinOptimizers.length && (
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
