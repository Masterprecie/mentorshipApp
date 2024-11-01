import { GoPencil } from "react-icons/go";
import Education from "assets/svg/education.svg?react";
import Experience from "assets/svg/experience.svg?react";
import propTypes from "prop-types";
import { formatDate } from "../../../../utils/helpers";
import { FaLinkedin } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { FaSquareFacebook } from "react-icons/fa6";
import TwitterIcon from "assets/svg/twitter.svg?react";
import { Link } from "react-router-dom";
const Overview = ({ profile, handleOpen }) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="pb-5">
        <h2>{profile?.about ?? "--"}</h2>

        {profile?.facebookUrl ||
        profile?.linkedinUrl ||
        profile?.websiteUrl ||
        profile?.twitterUrl ? (
          <div>
            <p className="mt-5 mb-3 text-gray-500  text-sm font-medium">
              Social Links
            </p>
            <div className="flex items-center gap-5 ">
              {profile?.facebookUrl && (
                <Link
                  to={profile?.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSquareFacebook />
                </Link>
              )}
              {profile?.twitterUrl && (
                <Link
                  to={profile?.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                </Link>
              )}

              {profile?.linkedinUrl && (
                <Link
                  to={profile?.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </Link>
              )}
              {profile?.websiteUrl && (
                <Link
                  to={profile?.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiWorld />
                </Link>
              )}
            </div>
          </div>
        ) : null}

        {profile?.role === "mentor" ? (
          <div>
            <p className="mt-5 mb-3 text-gray-500  text-sm font-medium">
              Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {profile?.expertise?.map((exp, idx) => (
                <div
                  key={idx}
                  className="inline-block text-sm bg-orange-300 text-orange-700 px-4 py-2 rounded-md font-medium"
                >
                  {exp}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="mt-5 mb-3 text-gray-500  text-sm font-medium">
              Interest
            </p>
            <div className="flex flex-wrap gap-2">
              {profile?.interest?.map((int, idx) => (
                <div
                  key={idx}
                  className="inline-block text-sm bg-orange-300 text-orange-700 px-4 py-2 rounded-md font-medium"
                >
                  {int}
                </div>
              ))}
            </div>
          </div>
        )}

        {profile?.workExperience?.length > 0 && (
          <div className="border px-3 pb-3 rounded-md mt-5">
            <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
              Experience
              <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                <GoPencil onClick={handleOpen} />
              </div>
            </p>

            <div className="space-y-5">
              {profile?.workExperience?.map((exp) => (
                <div key={exp._id}>
                  <div className="flex gap-5 items-center text-sm ">
                    <div className="w-[8%] ">
                      <Experience />
                    </div>
                    <div className="w-[92%] flex justify-between">
                      <div>
                        <h1 className="text-black font-semibold text-sm">
                          {exp.role}
                        </h1>
                        <p className="text-gray-500 text-xs">{exp.company}</p>
                      </div>
                      <div>
                        <p className="text-black rounded px-2 py-1 bg-blue-100 font-medium text-[10px]">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "PRESENT"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {exp.briefContribution && (
                    <p className="text-gray-500 mt-3 text-xs">
                      {exp.briefContribution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {profile?.education?.length > 0 && (
          <div className="border px-3 pb-3 rounded-md mt-5">
            <div>
              <p className="flex items-center justify-between mt-5 mb-3 text-black  text-sm font-medium">
                Education
                <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                  <GoPencil onClick={handleOpen} />
                </div>
              </p>
              <div className="space-y-5">
                {profile?.education?.map((edu) => (
                  <div key={edu?._id}>
                    <div className="flex gap-5 items-center text-sm ">
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
          </div>
        )}
      </div>
    </div>
  );
};

Overview.propTypes = {
  profile: propTypes.object.isRequired,
  handleOpen: propTypes.func.isRequired,
};

export default Overview;
