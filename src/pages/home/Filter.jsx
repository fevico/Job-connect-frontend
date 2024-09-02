import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "../../redux/appData";

export default function Filter() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {
    data: allJobs,
    isLoading,
    error,
  } = useGetAllJobsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Filter products based on search query
  const filteredJobs = allJobs && allJobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchQuery);
    navigate(`/all-jobs/?search=${searchQuery}`, {
      state: { SearchResults: filteredJobs },
    });

    setSearchQuery("");
    // Implement search logic if needed
  };
  return (
    <>
      <form className="" onSubmit={handleSearch}>
        <div className="mt-4 lg:mt-8 flex flex-col gap-5 items-center">
          <div className="relative w-[80%] lg:w-2/5">
            <input
              autoComplete="false"
              type="search"
              name="search"
              className=" py-3 px-5 bg-white outline-none border-2 border-primary w-full rounded-[50px]"
              placeholder="Search for job title, industry, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2  py-2 px-4  font-medium text-white  text-center border-[#ACD4FF] hover:bg-blue-500 rounded-[50px] border-2 bg-primary "
            >
              Search
            </button>
            {searchQuery && (
              <div className="bg-white  p-2 rounded shadow-lg absolute top-[55px] w-full">
                {filteredJobs.length > 0 ? (
                  filteredJobs.slice(0, 3).map((job) => (
                    <div
                      key={job._id}
                      className="cursor-pointer hover:bg-gray-300 p-2 border-b border-gray-200"
                    >
                      <div
                        onClick={() => {
                          navigate(`/all-jobs/?search=${job.title}`, {
                            state: { SearchResults: filteredJobs },
                          });
                          setSearchQuery("");
                        }}
                      >
                        {job.title}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-2">No jobs found.</div>
                )}
              </div>
            )}
          </div>

          {/* <div className="bg-[#2C2F4E] p-4 w-full flex flex-col lg:flex-row gap-3 justify-around items-center ">
            <div className="flex items-center lg:justify-between gap-4 lg:overflow-x-hidden w-full lg:w-[70%] mx-auto overflow-x-scroll ">
              <select className="py-3 px-5 w-full  rounded-lg bg-gray-200">
                <option value="">Select job location</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
              <select className="py-3 px-5 w-full rounded-lg bg-gray-200">
                <option value="">Select job type</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
              <button
                type="submit"
                className="w-full py-2 px-4  font-medium text-white  text-center border-[#ACD4FF] hover:bg-blue-500 rounded-lg border-2 bg-primary "
              >
                Search
              </button>
            </div>
          </div> */}
        </div>
      </form>
    </>
  );
}
