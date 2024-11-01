import banner from "assets/images/banner.jpg";
import Avatar from "../../../components/avatar";
import Overview from "./components/Overview";
import MyMentors from "./components/Mentors";
import Tabs from "./tabs/Tabs";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../features/auth/api";
import Modal from "../../../components/modal/Modal";
import { useState } from "react";
import BasicInfo from "./infoTabs/BasicInfo";
import Experience from "./infoTabs/Experience";
import SocialLink from "./infoTabs/SocialLink";
import { useFormik } from "formik";
import { alert } from "../../../utils/alert";
import Education from "./infoTabs/Education";
const Profile = () => {
  const { data: userProfile } = useGetProfileQuery();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();
  const profile = userProfile?.user;

  console.log(profile);

  const handleEditProfile = (values) => {
    console.log(values);
    const payload = {
      ...values,
      role: profile?.role,
    };
    console.log(payload);

    updateProfile(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Profile Updated successfully",
          timer: 2000,
          cb: () => handleClose(),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      interest: profile?.interest || "",
      age: profile?.age || "",
      gender: profile?.gender || "",
      languages: profile?.languages || "",
      country: profile?.country || "",
      yearsOfExperience: profile?.yearsOfExperience || "",
      workExperience: profile?.workExperience || [],
      about: profile?.about || "",
      linkedinUrl: profile?.linkedinUrl || "",
      twitterUrl: profile?.twitterUrl || "",
      facebookUrl: profile?.facebookUrl || "",
      websiteUrl: profile?.websiteUrl || "",
      expertise: profile?.expertise || "",
    },
    //    validationSchema: LoginValidationSchema,
    onSubmit: (values) => handleEditProfile(values),
  });

  const tabs = [
    {
      label: "Overview",
      content: (
        <div>
          <Overview profile={profile} handleOpen={handleOpen} />
        </div>
      ),
    },
    {
      label: `${profile?.role === "mentor" ? "Mentees" : "My Mentors"}`,
      content: (
        <div>
          <MyMentors />
        </div>
      ),
    },
  ];

  const editProfile = [
    {
      label: "Basic Info",
      content: (
        <div>
          <BasicInfo
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            errors={errors}
            handleEditProfile={handleEditProfile}
            loading={loading}
            setFieldValue={setFieldValue}
            profile={profile}
          />
        </div>
      ),
    },
    {
      label: "Experience",
      content: (
        <div>
          <Experience
            values={values}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            errors={errors}
            handleEditProfile={handleEditProfile}
            loading={loading}
            setFieldValue={setFieldValue}
            profile={profile}
            handleClose={handleClose}
          />
        </div>
      ),
    },
    {
      label: "Education",
      content: (
        <div>
          <Education profile={profile} handleClose={handleClose} />
        </div>
      ),
    },
    {
      label: "Social Links",
      content: (
        <div>
          <SocialLink
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            handleEditProfile={handleEditProfile}
            loading={loading}
          />
        </div>
      ),
    },
  ];

  const handleFileChange = (file) => {
    console.log("Selected file:", file);

    updateProfile({ profilePictureURL: file })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Profile Picture Updated successfully",
          timer: 2000,
        });
        // Update local storage
        // const existingProfile =
        //   JSON.parse(localStorage.getItem("@tredah_user")) || {};
        // const updatedProfile = {
        //   ...existingProfile,
        //   user: {
        //     ...existingProfile.user,
        //     user_image: file,
        //   },
        // };
        // localStorage.setItem("@tredah_user", JSON.stringify(updatedProfile));
      })
      .catch((err) => {
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 2000,
        });
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <div className="relative">
        <img src={banner} alt="" className="w-full h-[250px] object-cover" />
      </div>
      <div className="w-[90%] mx-auto ">
        <div className="mt-[-30px] flex justify-between items-center">
          <div className="lg:flex items-center gap-5">
            <Avatar
              profilePicture={profile?.profilePictureURL}
              onFileChange={handleFileChange}
            />

            <div className="pt-5">
              <h1>
                {profile?.firstName} {profile?.lastName}
              </h1>
              {profile?.workExperience[0] && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {profile?.workExperience[0]?.role}
                  </span>
                  at{" "}
                  <span className="font-medium">
                    {profile?.workExperience[0]?.company}{" "}
                  </span>
                </div>
              )}
              <p>{profile?.yearsOfExperience} years of experience</p>
            </div>
          </div>

          <div>
            <button
              onClick={handleOpen}
              className="border rounded-md px-3 py-2"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div>
          <Tabs tabs={tabs} />
        </div>
      </div>

      <Modal
        title={"Update your profile details"}
        open={open}
        handleClose={handleClose}
      >
        <div className="px-[20px]  w-[500px] ">
          <Tabs tabs={editProfile} />
        </div>
      </Modal>
    </div>
  );
};
export default Profile;
