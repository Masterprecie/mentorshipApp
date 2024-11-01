import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../../utils/data";
import { logout } from "../../features/auth/slice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../features/auth/hook";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const { user, isAuthenticated } = useAuth();
  console.log(user);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full bg-blue-900 sticky z-50 top-0 shadow-lg">
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <nav className="text-white font-bold p-4 flex flex-row-reverse justify-between items-center">
          {/* Mobile Sidebar Toggle Button */}
          <div>
            <button
              onClick={toggleMobileSidebar}
              className="text-white p-2 focus:outline-none"
            >
              {mobileSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo on Mobile Navbar */}
          <div>
            <h1 className="font-bold text-3xl">
              Me<span className="text-yellow-400 font-bold text-4xl">2</span>
              Mentor
            </h1>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          mobileSidebarOpen ? "block" : "hidden"
        } lg:hidden fixed top-0 pt-10 px-5 left-0 w-32 shadow-lg bg-white text-black font-semibold z-10 h-full overflow-y-auto transition-all ease-in-out duration-300`}
      >
        <ul className="space-y-5">
          {navLinks.map((link) => {
            const { id, url, name } = link;
            return (
              <li
                key={id}
                className={`
                      ${
                        activeLink === url ? "border-b-2 border-yellow-400" : ""
                      } hover:text-yellow-300 transition-all ease-in-out duration-300                    
                    `}
              >
                <Link to={url} onClick={toggleMobileSidebar}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr className="my-4" />
        <div>
          {isAuthenticated ? (
            <div className="">
              <ul className="space-y-1">
                <li className="flex items-center gap-2 py-2 hover:border-b-2 border-yellow-400 cursor-pointer duration-500 transition-all">
                  <FaRegUserCircle />
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li className="flex items-center gap-2 py-2 hover:border-b-2 border-yellow-400 cursor-pointer duration-500 transition-all">
                  <IoSettingsOutline />
                  <Link to="/dashboard/settings">Settings</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 hover:border-b-2 border-yellow-400 cursor-pointer duration-500 transition-all"
                >
                  <IoMdLogOut />
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <button className="border-2 py-2 px-5 rounded-md hover:text-black hover:bg-white transition">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex justify-between w-[90%] mx-auto  bg-blue-900 text-white  ">
        <div className="w-full bg-blue-900 ">
          <nav className=" text-white  py-4 flex justify-between items-center">
            <div>
              <h1 className="font-bold text-3xl">
                Me<span className="text-yellow-400 font-bold text-4xl">2</span>
                Mentor
              </h1>
            </div>

            <div>
              <ul className="p-4 lg:flex gap-4 items-center hidden ">
                {navLinks.map((link) => {
                  const { id, url, name } = link;
                  return (
                    <li
                      key={id}
                      className={`
                      ${
                        activeLink === url ? "border-b-2 border-yellow-400" : ""
                      } hover:text-yellow-300 transition-all ease-in-out duration-300                    
                    `}
                    >
                      <Link to={url} onClick={toggleMobileSidebar}>
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex gap-4 items-center">
              <div>
                {isAuthenticated ? (
                  <div
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                    className="relative flex gap-3  items-center"
                  >
                    <FaRegUserCircle />
                    <p className="text-white font-bold cursor-pointer">
                      {user.firstName} {user.lastName}
                    </p>
                    <IoMdArrowDropdown
                      onClick={toggleDropdown}
                      className={`cursor-pointer
                      ${dropdown ? "transform rotate-180" : ""}`}
                    />
                    {dropdown && (
                      <div className="absolute top-full right-0 bg-white text-black py-2 rounded-md shadow-lg">
                        <ul className="space-y-1">
                          <li>
                            <Link
                              to="/dashboard/profile"
                              onClick={toggleDropdown}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer duration-500 transition-all"
                            >
                              <FaRegUserCircle />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/settings"
                              onClick={toggleDropdown}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer duration-500 transition-all"
                            >
                              <IoSettingsOutline />
                              Settings
                            </Link>
                          </li>
                          <li
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 cursor-pointer duration-500 transition-all"
                          >
                            <IoMdLogOut />
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-5">
                    <button className="border-2 py-2 px-5 rounded-md hover:text-black hover:bg-white transition">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="border-2 py-2 px-5 rounded-md hover:text-black hover:bg-white transition">
                      <Link to="/signup">Signup</Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
