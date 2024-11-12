import propTypes from "prop-types";
import { BiWorld } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TwitterIcon from "assets/svg/twitter.svg?react";
import Education from "assets/svg/education.svg?react";
import Experience from "assets/svg/experience.svg?react";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { formatDate } from "../../../../../utils/helpers";
import Modal from "../../../../../components/modal/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import {
  useVerifyMentorIdMutation,
  useDeclineMentorIdMutation,
} from "../../../../../features/admin/api";
import { alert } from "../../../../../utils/alert";

const Overview = ({ mentorProfile, refetch }) => {
  const [verifyId] = useVerifyMentorIdMutation();
  const [declineId] = useDeclineMentorIdMutation();
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [email, setEmail] = useState(mentorProfile?.email);
  const [reason, setReason] = useState("");
  const [isEditEmail, setIsEditEmail] = useState(false);
  const userId = mentorProfile?._id;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const toggleEditEmail = () => setIsEditEmail(!isEditEmail);

  const toggleShowFullAbout = () => setShowFullAbout(!showFullAbout);
  const toggleExperience = () => setShowAllExperience(!showAllExperience);
  const toggleEducation = () => setShowAllEducation(!showAllEducation);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeEmail = (e, userId) => {
    e.preventDefault();
    console.log("Change email", userId, email);
    verifyId(userId)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "MentorID Verified successfully",
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.data?.message || "An error occurred",
          timer: 3000,
        });
      });
    setIsEditEmail(false);
  };

  const handleApprove = (userId) => {
    console.log("Approve User", userId);
    verifyId({
      mentorId: userId,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "MentorID Verified successfully",
          timer: 2000,
          cb: () => refetch(),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.data?.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const handleDecline = (e, userId, reason) => {
    e.preventDefault();
    console.log("Decline User", userId);
    declineId({
      mentorId: userId,
      reason: reason,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "MentorID Verified successfully",
          timer: 2000,
          cb: () => {
            refetch();
            handleClose();
            setReason("");
          },
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.data?.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const aboutLimit = 150;
  return (
    <div className="grid grid-cols-12 gap-10 pb-5">
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
                  className="inline-block text-sm mx-2 bg-orange-300 text-orange-700 px-4 py-2 rounded-md font-medium"
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
                              {formatDate ? formatDate(exp.endDate) : "PRESENT"}
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

      <div className="col-span-5">
        <div className="text-right text-white space-x-3">
          <button className="bg-gray-500 capitalize rounded-md p-2 text-sm font-medium">
            {mentorProfile?.role}
          </button>
          <button
            onClick={() => handleApprove(userId)}
            className="bg-green-500 rounded-md p-2 text-sm font-medium"
          >
            Approve ID
          </button>
          <button
            onClick={handleOpen}
            className="bg-red-500 rounded-md p-2 text-sm font-medium"
          >
            Decline ID
          </button>
        </div>
        <div className=" mt-5 ">
          <div className="flex items-center gap-20">
            {isEditEmail ? (
              <input
                type="email"
                className="border p-2 rounded outline-0"
                value={email}
                onChange={handleEmailChange}
              />
            ) : (
              <p className="text-sm text-gray-500 font-medium ">
                Email : {mentorProfile?.email}
              </p>
            )}

            {isEditEmail ? (
              <div className="flex items-center gap-3">
                <div className="rounded-full border cursor-pointer bg-gray-100 h-6 w-6 flex items-center justify-center">
                  <LiaTimesSolid
                    onClick={toggleEditEmail}
                    className="text-red-500"
                  />
                </div>
                <div className="rounded-full border cursor-pointer bg-gray-100 h-6 w-6 flex items-center justify-center">
                  <IoCheckmarkOutline
                    onClick={(e) => handleChangeEmail(e, userId)}
                    className="text-green-500"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-full border cursor-pointer bg-gray-100 h-6 w-6 flex items-center justify-center">
                <GoPencil onClick={toggleEditEmail} />
              </div>
            )}
          </div>

          {mentorProfile?.mentorIdcard.length > 0 ? (
            <div className="pt-3">
              <p className="pb-2 text-gray-500 font-medium text-sm">
                Uploaded ID Card
              </p>
              <div className="flex flex-wrap gap-5">
                {mentorProfile?.mentorIdcard.map((idcard, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={idcard}
                      alt="image"
                      className="w-[300px] h-[300px]"
                    />
                    <div
                      className={`absolute capitalize top-2 right-2 rounded-xl py-1 px-3 ${
                        mentorProfile?.idCardStatus === "verified"
                          ? "bg-green-500"
                          : mentorProfile?.idCardStatus === "declined"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      } text-white`}
                    >
                      {mentorProfile?.idCardStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-5">ID Card Not Uploaded Yet</p>
          )}
        </div>
      </div>
      <Modal open={open} handleClose={handleClose}>
        <div className="px-[20px]  w-[500px] ">
          <h1 className="text-2xl font-semibold">Reason for declining</h1>
          <form onSubmit={(e) => handleDecline(e, userId, reason)}>
            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border w-full p-2 mt-5 outline-0"
              placeholder="Reason for declining"
            />

            <div className="flex justify-end gap-5 mt-5">
              <button
                type="button"
                onClick={handleClose}
                className="border rounded-md px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white rounded-md px-3 py-2"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

Overview.propTypes = {
  mentorProfile: propTypes.object.isRequired,
  refetch: propTypes.func.isRequired,
};

export default Overview;
