import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import About from "./pages/About";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AllJobs from "./pages/AllJobs";
import CareerProfile from "./pages/CareerProfile";
import SignUpHome from "./pages/Auth";
import RegAsJobSeeker from "./pages/Auth/RegAsJobSeeker";
import Login from "./pages/Auth/Login";
import RegAsJobEmployer from "./pages/Auth/RegAsJobEmployer";
import VerifyAccount from "./pages/Auth/VerifyAccount";
import SpecialLayout from "./components/SpecialLayout";
import Dashboard from "./components/dashboard";
import PostJobs from "./components/dashboard/PostJobs";
import Applications from "./components/dashboard/Applications";
import ActiveListings from "./components/dashboard/ActiveListings";
import LoggedInLayout from "./components/LoggedInLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegAsLinkedIn from "./pages/Auth/RegAsLinkedIn";
import RegAsCVWriter from "./pages/Auth/RegAsCVWriter";
import AllCVWriters from "./pages/CV/AllCvWriters";
import CvWriterDetails from "./pages/CV/CvWriterDetails";
import AllLinkedIn from "./pages/LINKEDIN/AllLinkedIn";
import LinkedInDetails from "./pages/LINKEDIN/LinkedInDetails";
// import { AuthProvider, useAuth } from './components/Session';

function App() {
  const timeout = 60 * 60 * 1000; // 60 minutes === 1 hour
  const navigate = useNavigate()

  if (localStorage.getItem('AuthToken') === 'undefined') {
    toast.error('You are not logged in')
  } else {
    setTimeout(() => {
      toast.error("Session Timeout.")
      navigate('/login')
    }, timeout);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/" element={<LoggedInLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/all-cvwriters" element={<AllCVWriters />} />
          <Route path="/all-linkedin" element={<AllLinkedIn />} />
          <Route path="/career-profile" element={<CareerProfile />} />
          <Route path="/signup/home" element={<SignUpHome />} />
          <Route path="/signup/jobseeker" element={<RegAsJobSeeker />} />
          <Route path="/signup/cvwriter" element={<RegAsCVWriter />} />
          <Route path="/signup/linkedin" element={<RegAsLinkedIn />} />
          <Route path="/signup/verify" element={<VerifyAccount />} />
          <Route path="/signup/employer" element={<RegAsJobEmployer />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/cvwriter/:id" element={<CvWriterDetails />} />
          <Route path="/linkedin/:id" element={<LinkedInDetails />} />
        </Route>

        <Route path="/" element={<SpecialLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/active-listing" element={<ActiveListings />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/analytics" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
