import banner from "assets/images/banner.jpg";
import Avatar from "../../components/avatar";
import Overview from "./components/Overview";
import MyMentors from "./components/Mentors";
import Tabs from "./tabs/Tabs";
import { useGetProfileQuery } from "../../features/auth/api";
const Profile = () => {
  const { data: userProfile, isLoading } = useGetProfileQuery();

  console.log(userProfile);

  const profilePicture = "";
  const handleFileChange = (imageUrl) => {
    console.log(imageUrl);
  };

  const tabs = [
    {
      label: "Overview",
      content: (
        <div>
          <Overview />
        </div>
      ),
    },
    {
      label: "My Mentors",
      content: (
        <div>
          <MyMentors />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <div className="relative">
        <img src={banner} alt="" className="w-full h-[250px] object-cover" />
      </div>
      <div className="w-[90%] mx-auto ">
        <div className="mt-[-30px] flex justify-between items-center">
          <div className="lg:flex items-center gap-5">
            <Avatar
              profilePicture={profilePicture}
              onFileChange={handleFileChange}
            />

            <div>
              <h1>Precious Ikpa</h1>
              <p>Software Engineer at Techbeaver</p>
            </div>
          </div>

          <div>
            <button className="border rounded-md px-3 py-2">
              Edit Profile
            </button>
          </div>
        </div>

        <div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
