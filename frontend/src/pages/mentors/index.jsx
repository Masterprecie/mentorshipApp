import { Link } from "react-router-dom";
import { useGetAllMentorsQuery } from "../../features/mentors/api";
import { useState } from "react";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(3);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const { data: allMentors, isLoading, error } = useGetAllMentorsQuery({
    page: 1,
    limit: 10,
    search: searchQuery,
  });

  const mentors = allMentors?.docs || [];

  return (
    <div>
      <div className="w-[90%] mx-auto py-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mentors</h1>
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by name, category, experience, and expertise"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border outline-0 p-2 px-3 rounded-md bg-[#f5f8fa] focus:border-2 focus:shadow-[0-0-4px-1px-rgba(0,208,228,0.3)]"
            />
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.data?.message || "An error occurred"}</p>
        ) : mentors.length === 0 ? (
          <p>No mentors found</p>
        ) : (
          <div>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:mt-0 pt-5">
              {mentors?.map((mentor) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  profilePictureURL,
                  expertise,
                  experience,
                } = mentor;
                return (
                  <div key={_id} className="rounded-md shadow-md mb-5 md:mb-0">
                    <div>
                      <Link to={`/mentor/${_id}`}>
                        <img
                          src={profilePictureURL}
                          alt="top-mentors"
                          className="rounded-t-md w-full"
                        />
                      </Link>
                    </div>
                    <div className="bg-blue-700 text-white p-2 hover:bg-yellow-400 hover:text-black transition rounded-b-md">
                      <p className="font-bold text-lg">
                        {firstName},{" "}
                        <span className="text-sm font-normal">{lastName}</span>
                      </p>
                      <p className="font-semibold">
                        Expertise:{" "}
                        <span className="text-black ">{expertise}</span>
                      </p>
                      <p className="font-semibold">
                        Experience:{" "}
                        <span className="text-black ">{experience}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;
