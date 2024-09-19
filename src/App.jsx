import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import About from "./pages/About";
// import Search from "./pages/Search";
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
import ApplicationsServices from "./components/dashboard/ApplicationsServices";
import ActiveListings from "./components/dashboard/ActiveListings";
import RegAsLinkedIn from "./pages/Auth/RegAsLinkedIn";
import RegAsCVWriter from "./pages/Auth/RegAsCVWriter";
import AllCVWriters from "./pages/CV/AllCvWriters";
import CvWriterDetails from "./pages/CV/CvWriterDetails";
import AllLinkedIn from "./pages/LINKEDIN/AllLinkedIn";
import LinkedInDetails from "./pages/LINKEDIN/LinkedInDetails";
import { AuthRoute, PrivateRoute } from "./components/hooks/RouteGuards";
import Earnings from "./components/dashboard/Earnings";
import AllUsers from "./components/dashboard/AllUsers";
import AllPackage from "./components/dashboard/AllPackage";
import CreatePackage from "./components/dashboard/CreatePackage";
import Subscription from "./components/dashboard/Subscription";
import UserDashboard from "./pages/UserDashboard";
import Messages from "./components/dashboard/Messages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:reference" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/all-cvwriters" element={<AllCVWriters />} />
          <Route path="/all-linkedin" element={<AllLinkedIn />} />
          <Route path="/settings" element={<CareerProfile />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/cvwriter/:id" element={<CvWriterDetails />} />
          <Route path="/linkedin/:id" element={<LinkedInDetails />} />
        </Route>

        {/* Protect these routes using PrivateRoute */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SpecialLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/active-listing" element={<ActiveListings />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications-services" element={<ApplicationsServices />} />
          <Route path="/post-jobs" element={<PostJobs />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/all-messages" element={<Messages />} />
          <Route path="/all-package" element={<AllPackage />} />
          <Route path="/create-package" element={<CreatePackage />} />

          <Route path="/analytics" element={<Dashboard />} />
        </Route>

        {/* Redirect signed-in users away from auth pages */}
        <Route
          path="/signup/home"
          element={
            <AuthRoute>
              <SignUpHome />
            </AuthRoute>
          }
        />
        <Route
          path="/signup/jobseeker"
          element={
            <AuthRoute>
              <RegAsJobSeeker />
            </AuthRoute>
          }
        />
        <Route
          path="/signup/cvwriter"
          element={
            <AuthRoute>
              <RegAsCVWriter />
            </AuthRoute>
          }
        />
        <Route
          path="/signup/linkedin"
          element={
            <AuthRoute>
              <RegAsLinkedIn />
            </AuthRoute>
          }
        />
        <Route
          path="/signup/employer"
          element={
            <AuthRoute>
              <RegAsJobEmployer />
            </AuthRoute>
          }
        />
        <Route
          path="/signup/verify"
          element={
            <AuthRoute>
              <VerifyAccount />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
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
