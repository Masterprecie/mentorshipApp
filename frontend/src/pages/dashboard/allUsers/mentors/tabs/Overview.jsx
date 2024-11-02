import propTypes from "prop-types";
import { BiWorld } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TwitterIcon from "assets/svg/twitter.svg?react";
import { formatDate } from "../../../utils/helpers";
import Education from "assets/svg/education.svg?react";
import Experience from "assets/svg/experience.svg?react";
import { useState } from "react";
const Overview = ({ mentorProfile }) => {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleShowFullAbout = () => setShowFullAbout(!showFullAbout);
  const toggleExperience = () => setShowAllExperience(!showAllExperience);
  const toggleEducation = () => setShowAllEducation(!showAllEducation);

  const aboutLimit = 150;
  return (
    <div className="grid grid-cols-12 pb-5">
      <div className="col-span-6">
        <div>
          <p className="text-sm font-medium text-black">
            {showFullAbout || mentorProfile?.about?.length <= aboutLimit
              ? mentorProfile.about
              : `${mentorProfile?.about?.slice(0, aboutLimit)}...`}
          </p>
          {mentorProfile?.about?.length > aboutLimit && (
            <p
              className="text-sm text-green-400 mt-3 cursor-pointer"
              onClick={toggleShowFullAbout}
            >
              {showFullAbout ? "Show Less" : "Show More"}
            </p>
          )}
        </div>

        {mentorProfile?.facebookUrl ||
        mentorProfile?.linkedinUrl ||
        mentorProfile?.websiteUrl ||
        mentorProfile?.twitterUrl ? (
          <div>
            <p className="mt-5 mb-3 text-gray-500  text-sm font-medium">
              Social Links
            </p>
            <div className="flex items-center gap-5 ">
              {mentorProfile?.facebookUrl && (
                <Link
                  to={mentorProfile?.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareFacebook />
                </Link>
              )}
              {mentorProfile?.twitterUrl && (
                <Link
                  to={mentorProfile?.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </Link>
              )}

              {mentorProfile?.linkedinUrl && (
                <Link
                  to={mentorProfile?.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </Link>
              )}
              {mentorProfile?.websiteUrl && (
                <Link
                  to={mentorProfile?.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiWorld />
                </Link>
              )}
            </div>
          </div>
        ) : null}

        <div className="flex border rounded-lg p-3 mt-5 items-center justify-between w-[400px]">
          <p className="text-base font-medium text-black">Expertise</p>
          <div className="">
            <div>
              {mentorProfile?.expertise?.map((exp, idx) => (
                <p
                  key={idx}
                  className="inline-block text-sm bg-orange-300 text-orange-700 px-4 py-2 rounded-md font-medium"
                >
                  {exp}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            {mentorProfile?.workExperience?.length > 0 && (
              <div className="border rounded-lg p-3 mt-5  w-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-medium text-black ">
                    Experience
                  </p>
                  <button
                    onClick={toggleExperience}
                    className="text-xs font-medium text-blue-600"
                  >
                    {showAllExperience ? "Show Less" : "View All"}
                  </button>
                </div>
                <div className="space-y-5">
                  {(showAllExperience
                    ? mentorProfile?.workExperience || []
                    : (mentorProfile?.workExperience || []).slice(0, 1)
                  ).map((exp) => (
                    <div key={exp._id}>
                      <div className="flex gap-8 items-center text-sm ">
                        <div className="w-[8%] ">
                          <Experience />
                        </div>
                        <div className="w-[92%] flex justify-between">
                          <div>
                            <h1 className="text-black font-semibold text-sm">
                              {exp.role}
                            </h1>
                            <p className="text-gray-500 text-xs">
                              {exp.company}
                            </p>
                          </div>
                          <div>
                            <p className="text-black rounded px-2 py-1 bg-blue-100 font-medium text-[10px]">
                              {formatDate(exp.startDate)} -{" "}
                              {exp.endDate
                                ? formatDate(exp.endDate)
                                : "PRESENT"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mentorProfile?.education?.length > 0 && (
              <div className="border rounded-lg p-3 mt-5  w-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-medium text-black ">Education</p>
                  <button
                    onClick={toggleEducation}
                    className="text-xs font-medium text-blue-600"
                  >
                    {showAllEducation ? "Show Less" : "View All"}
                  </button>
                </div>
                <div className="space-y-5">
                  {(showAllEducation
                    ? mentorProfile?.education || []
                    : (mentorProfile?.education || []).slice(0, 1)
                  ).map((edu) => (
                    <div key={edu?._id}>
                      <div className="flex gap-8 items-center text-sm ">
                        <div className="w-[8%] ">
                          <Education />
                        </div>
                        <div className="w-[92%] flex justify-between">
                          <div>
                            <h1 className="text-black font-semibold text-sm">
                              {edu?.degree}
                            </h1>
                            <p className="text-gray-500 text-xs">
                              {edu?.schoolName}
                              <span>
                                {" "}
                                {formatDate(edu?.startYear)} -{" "}
                                {edu?.endYear
                                  ? formatDate(edu?.endYear)
                                  : "PRESENT"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

Overview.propTypes = {
  mentorProfile: propTypes.object.isRequired,
};

export default Overview;
