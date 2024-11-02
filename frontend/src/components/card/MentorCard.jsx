import { IoBriefcaseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import avatar from "assets/images/avatar.jpg";
const MentorCard = ({ mentor }) => {
  return (
    <div>
      <div
        key={mentor._id}
        className="border rounded-md shadow-md mb-5 md:mb-0 p-2"
      >
        <div>
          <Link to={`/mentor/${mentor._id}`}>
            <img
              src={mentor.profilePictureURL || avatar}
              alt="top-mentors"
              className="rounded-md object-cover h-[300px] w-full"
            />
          </Link>
        </div>
        <div className="text-black">
          <p className="font-bold text-lg mt-3">
            {mentor.firstName},{" "}
            <span className="text-sm font-normal">{mentor.lastName}</span>
          </p>
          {mentor.workExperience?.length > 0 ? (
            <div className="flex items-center mt-2 gap-3">
              <IoBriefcaseOutline />
              {mentor.workExperience?.slice(0, 1).map((exp, idx) => (
                <div key={idx} className="">
                  <span className="font-medium pr-2">{exp?.role}</span>
                  at <span className="font-medium">{exp?.company} </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base text-gray-500 mt-2">--</p>
          )}
        </div>
        <div className="text-black rounded-md p-3 mt-5 bg-gray-300">
          <p className="font-xs text-gray-600">Experience </p>
          <p className="text-black font-medium ">
            {mentor.yearsOfExperience} years
          </p>
        </div>
      </div>
    </div>
  );
};

MentorCard.propTypes = {
  mentor: propTypes.object.isRequired,
};
export default MentorCard;
