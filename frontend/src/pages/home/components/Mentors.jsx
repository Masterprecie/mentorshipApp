import { Link } from "react-router-dom";
import { useGetAllMentorsQuery } from "../../../features/users/api";
import MentorCard from "../../../components/card/MentorCard";

const Mentors = () => {
  const { data: allMentors, isLoading } = useGetAllMentorsQuery({
    page: 1,
    limit: 3,
  });

  const mentors = allMentors?.docs || [];
  console.log(mentors);

  return (
    <div className="w-[90%] py-10 mx-auto md:flex items-center gap-5">
      <div className="md:w-[30%] lg:w-[20%] border-2 border-blue-900 py-8 px-5">
        <div className="lg:relative">
          <p className="text-3xl font-bold inline-block uppercase pb-1 text-blue-900">
            Top Mentors
          </p>
          <div className="lg:absolute bottom-0 left-0 lg:w-1/2 md:w-1/5 w-1/4 border-b-4 border-yellow-400"></div>
        </div>
        <p className="py-5 text-gray-500">
          Our mission is to connect individuals seeking guidance and mentorship
          with experienced professionals eager to share their knowledge and
          insights.
        </p>
        <p className="text-xl font-bold text-blue-900">
          <Link to="/all-mentors">
            See all Mentors <span className="text-yellow-500">&gt;</span>
          </Link>
        </p>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-blue-900">Loading...</p>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:w-[70%] lg:w-[80%] gap-5 md:mt-0 pt-5">
          {mentors?.map((mentor) => {
            const {
              _id,
              firstName,
              lastName,
              profilePictureURL,
              workExperience,
              yearsOfExperience,
            } = mentor;
            return (
              <MentorCard
                key={_id}
                mentor={{
                  _id,
                  firstName,
                  lastName,
                  profilePictureURL,
                  workExperience,
                  yearsOfExperience,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Mentors;
