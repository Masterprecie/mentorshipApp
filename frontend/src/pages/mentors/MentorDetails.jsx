import { useNavigate, useParams } from "react-router-dom";
import { useGetMentorByIdQuery } from "../../features/users/api";
import Tabs from "../dashboard/profile/tabs/Tabs";
import Reviews from "./tabs/Reviews";
import Overview from "./tabs/Overview";
import Avatar from "../../components/avatar";
import banner from "assets/images/banner.jpg";
import { TbMessage } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";

const MentorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: singleMentor, isLoading, error } = useGetMentorByIdQuery(id);

  console.log(singleMentor);
  const tabs = [
    {
      label: "Overview",
      content: (
        <div>
          <Overview mentorProfile={singleMentor} />
        </div>
      ),
    },
    {
      label: "Reviews",
      content: (
        <div>
          <Reviews />
        </div>
      ),
    },
  ];

  const handleChat = (singleMentor) => {
    const fullName = `${singleMentor?.firstName} ${singleMentor?.lastName}`;
    console.log(fullName);
    navigate(
      `/dashboard/messages?mentorId=${singleMentor._id}&mentorName=${fullName}`
    );
  };
  return (
    <div className="">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : singleMentor ? (
        <div>
          <div className="relative">
            <img
              src={banner}
              alt=""
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="w-[90%] mx-auto ">
            <div className="mt-[-30px] flex justify-between items-center">
              <div className="lg:flex items-center gap-5">
                <Avatar
                  profilePicture={singleMentor?.profilePictureURL}
                  editable={false}
                />

                <div className="pt-5">
                  <h1 className="font-bold text-xl">
                    {singleMentor?.firstName} {singleMentor?.lastName}
                  </h1>
                  {singleMentor?.workExperience[0] && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {singleMentor?.workExperience[0]?.role}
                      </span>
                      at{" "}
                      <span className="font-medium">
                        {singleMentor?.workExperience[0]?.company}{" "}
                      </span>
                    </div>
                  )}
                  <p>{singleMentor?.yearsOfExperience} years of experience</p>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <TbMessage
                  onClick={() => handleChat(singleMentor)}
                  size={40}
                  className="bg-white shadow-md p-3 rounded-md w-16 h-16"
                />
                <IoMdHeartEmpty
                  size={30}
                  className="bg-white shadow-md p-3 rounded-md w-16 h-16"
                />
              </div>
            </div>

            <div>
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      ) : (
        <p>Mentor not found</p>
      )}
    </div>
  );
};

export default MentorDetails;
