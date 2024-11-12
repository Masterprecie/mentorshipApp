import { useLocation } from "react-router-dom";
import banner from "assets/images/banner.jpg";
import { TbMessage } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { useGetMentorByIdQuery } from "../../../../features/users/api";
import Tabs from "../../profile/tabs/Tabs";
import Avatar from "../../../../components/avatar";
import Overview from "./tabs/Overview";
import Reviews from "./tabs/Reviews";
import { useEffect } from "react";

const SingleMentorDetails = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const {
    data: singleMentor,
    isLoading,
    error,
    refetch,
  } = useGetMentorByIdQuery(id);

  useEffect(() => {
    refetch();
  }, [singleMentor]);

  console.log(singleMentor);
  const tabs = [
    {
      label: "Overview",
      content: (
        <div>
          <Overview mentorProfile={singleMentor} refetch={refetch} />
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
              alt="img"
              className="w-full h-[250px] object-cover"
            />
            <button
              onClick={() => window.history.back()}
              className="bg-black text-white absolute top-20 left-3 rounded-md p-2 text-sm font-medium"
            >
              Back
            </button>
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

export default SingleMentorDetails;
