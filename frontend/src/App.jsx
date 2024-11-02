import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import MentorDetails from "./pages/mentors/MentorDetails";
import Login from "./pages/auth/login";
import Available from "./pages/Auth/Available";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyEmail from "./pages/auth/verify-email";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home";
import Mentors from "./pages/mentors";
import Blog from "./pages/blog";
import AboutPage from "./pages/about";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Signup from "./pages/auth/register";
import Profile from "./pages/dashboard/profile";
import Settings from "./pages/dashboard/settings";
import DashHome from "./pages/dashboard/dashHome";
import Explore from "./pages/dashboard/explore";
import { DashboardLayout } from "./layout";
import { useEffect } from "react";
import Bookings from "./pages/dashboard/bookings";
import Messages from "./pages/dashboard/messages";
import ForgetPassword from "./pages/auth/forget-password";
import ResetPassword from "./pages/auth/reset-password";

const App = () => {
  const location = useLocation();

  const showNavandFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-email" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/reset-password" ||
    location.pathname.includes("dashboard")
      ? false
      : true;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {showNavandFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/available" element={<Available />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/all-mentors" element={<Mentors />} />
        <Route path="/mentor/:id" element={<MentorDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashHome />} />
          <Route path="explore" element={<Explore />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>

      {showNavandFooter && <Footer />}
    </div>
  );
};

export default App;
