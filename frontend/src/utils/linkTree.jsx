import { SlHome } from "react-icons/sl";
import { MdOutlineExplore } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

export const links = [
  {
    name: "Home",
    url: "/dashboard/home",
    icon: <SlHome />,
    roles: ["admin", "user"],
  },
  {
    name: "Users",
    url: "/dashboard/users",
    icon: <FaUsers />,
    roles: ["admin"],
  },
  {
    name: "Explore",
    url: "/dashboard/explore",
    icon: <MdOutlineExplore />,
    roles: ["user"],
  },

  {
    name: "Bookings",
    url: "/dashboard/bookings",
    icon: <SlCalender />,
    roles: ["user"],
  },

  {
    name: "Messages",
    url: "/dashboard/messages",
    icon: <TiMessages />,
    roles: ["user"],
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
    icon: <CgProfile />,
    roles: ["admin", "user"],
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: <IoSettingsOutline />,
    roles: ["admin", "user"],
  },
];
