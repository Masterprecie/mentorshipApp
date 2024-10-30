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
import Profile from "./pages/profile";

const App = () => {
  const location = useLocation();

  const showNavandFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/verify-email"
      ? false
      : true;

  return (
    <div>
      {showNavandFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/available" element={<Available />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/all-mentors" element={<Mentors />} />
        <Route path="/mentor/:id" element={<MentorDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {showNavandFooter && <Footer />}
    </div>
  );
};

export default App;
