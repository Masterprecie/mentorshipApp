import { SlHome } from "react-icons/sl";
import { MdOutlineExplore } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    url: "/dashboard/home",
    icon: <SlHome />,
  },
  {
    name: "Explore",
    url: "/dashboard/explore",
    icon: <MdOutlineExplore />,
  },

  {
    name: "Bookings",
    url: "/dashboard/bookings",
    icon: <SlCalender />,
  },

  {
    name: "Messages",
    url: "/dashboard/messages",
    icon: <TiMessages />,
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
    icon: <CgProfile />,
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: <IoSettingsOutline />,
  },
];
