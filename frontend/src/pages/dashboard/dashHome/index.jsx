import { IconButton } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { CgRadioCheck } from "react-icons/cg";
import { useAuth } from "../../../features/auth/hook";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../../features/auth/api";

const DashHome = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const { data: userProfile } = useGetProfileQuery();
  const profile = userProfile?.user;

  console.log(profile);

  const toggleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="mt-32 px-10 md:grid grid-cols-12 gap-16">
      <div className="col-span-8">
        <h1 className="font-bold text-3xl">Welcome 👋</h1>
        <p>You have no upcoming sessions</p>
        <div className="text-yellow-200 text-sm mt-3 border border-yellow-700 bg-yellow-600 p-2 rounded-md">
          Account Pending
        </div>

        {open && (
          <div className="relative mt-10 bg-gray-200 rounded-lg px-3 py-5 flex justify-between">
            <div>
              <h1 className="text-lg font-semibold pb-2">
                Let’s start with the basics
              </h1>
              <p className="text-base text-gray-800">
                Get more by setting up a profile you love.
              </p>
              <div className="flex gap-3 items-center my-2">
                <FaCircleCheck color={"green"} />
                <p className={`${user.isEmailVerified ? "line-through" : ""}`}>
                  Verify email
                </p>
              </div>
              {user?.role === "mentor" ? (
                <div className="flex gap-3 items-center">
                  <CgRadioCheck size={20} />
                  <Link to="/dashboard/settings" className="hover:underline">
                    <p>Upload a verified ID Card</p>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <CgRadioCheck size={20} />
                  <Link to="/dashboard/explore" className="hover:underline">
                    <p>Book your first session — Learn/network with mentors.</p>
                  </Link>
                </div>
              )}
            </div>
            <IconButton
              aria-label="close"
              onClick={toggleCancel}
              sx={{
                position: "absolute",
                right: 15,
                top: 10,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <MdCancel />
            </IconButton>
            <div className="mt-8 text-gray-800 text-sm">
              <p>50% Completed</p>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4">
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
};
export default DashHome;
