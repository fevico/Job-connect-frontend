import React, { useEffect, useState } from "react";
import { Collapse, Typography, IconButton } from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import CustomButton from "./CustomButton";
import Logo from "./Logo";
import useSession from "./hooks/useSession";
import { BiUserCircle } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";

function NavList({ setOpenNav, isSignedIn, signOut, userDetails }) {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const closeProfile = () => {
    setOpenProfile(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavLinkClick = () => {
    if (isMobile) {
      setOpenNav(false);
    }
  };

  return (
    <ul className="w-full my-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center justify-around gap-2">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/"
          onClick={handleNavLinkClick}
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Home
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium "
      >
        <Link
          to="all-jobs"
          onClick={handleNavLinkClick}
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Job Listing
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold relative"
        onMouseEnter={toggleMenu}
        onMouseLeave={closeMenu}
      >
        <div className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors">
          Services
          <IoIosArrowDown
            className={`transition-transform ${openMenu ? "rotate-180" : ""}`}
          />
        </div>
        {openMenu && (
          <div className="absolute top-8 left-0 py-2 bg-white shadow-lg rounded-lg w-[230px]">
            <Link
              to="/all-cvwriters"
              onClick={handleNavLinkClick}
              className="px-4 py-2 hover:bg-gray-200 gap-2 text-[#797B89] text-sm mb-1 no-underline flex items-center"
            >
              CV Writing
            </Link>
            <Link
              to="/all-linkedin"
              onClick={handleNavLinkClick}
              className="px-4 py-2 hover:bg-gray-200 gap-2 text-[#797B89] text-sm mb-1 no-underline flex items-center"
            >
              LinkedIn Profile Optimization
            </Link>
          </div>
        )}
      </Typography>
      <hr className="bg-primary lg:hidden" />

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium "
      >
        <Link
          to="/about"
          onClick={handleNavLinkClick}
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          About Us
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium "
      >
        <Link
          to="/contact"
          onClick={handleNavLinkClick}
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Contact Us
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />
      {isSignedIn ? (
        <>
          {(userDetails?.role === "admin" ||
            userDetails?.role === "employer") && (
            <CustomButton text={"Post Jobs"} link={"/post-jobs"} />
          )}
        </>
      ) : (
        <CustomButton text={"Post Jobs"} link={"/login"} />
      )}
      <hr className="bg-primary lg:hidden" />
      {isSignedIn ? (
        isMobile ? (
          // <hr className="bg-primary lg:hidden" />

          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
          >
            <Link
              to={
                userDetails?.role === "jobseeker"
                  ? "/user/dashboard"
                  : "/dashboard"
              }
              className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
            >
              My Profile{userDetails?.role}
            </Link>
          </Typography>
        ) : (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-semibold relative"
            onMouseEnter={toggleProfile}
            onMouseLeave={closeProfile}
          >
            <div className="flex items-center gap-1 cursor-pointer relative">
              <BiUserCircle className="w-7 h-7" />
              <FaAngleDown
                className={`transition-transform ${
                  openProfile ? "rotate-180" : ""
                }`}
              />
              {openProfile && (
                <div className="absolute top-8 right-0 py-2 bg-white shadow-lg rounded-lg w-[230px]">
                  <Link
                    to={
                      userDetails?.role === "jobseeker"
                        ? "/user/dashboard"
                        : "/dashboard"
                    }
                    onClick={handleNavLinkClick}
                    className="px-4 py-2 hover:bg-gray-200 gap-2  text-[#797B89] text-sm mb-1 no-underline flex items-center"
                  >
                    Profile
                  </Link>
                  {/* <Link
                    to="/settings"
                    onClick={handleNavLinkClick}
                    className="px-4 py-2 hover:bg-gray-200 gap-2 text-[#797B89] text-sm mb-1 no-underline flex items-center"
                  >
                    Settings
                  </Link> */}
                  <p
                    className="text-red-400 font-bold text-left px-4 py-2"
                    onClick={() => {
                      handleNavLinkClick();
                      signOut();
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </Typography>
        )
      ) : (
        <>
          <CustomButton text={"Login"} link={"/login"} />
          <CustomButton text={"Signup"} link={"signup/home"} />
        </>
      )}
    </ul>
  );
}

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const { isSignedIn, userDetails, signOut } = useSession();

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // console.log(userDetails);

  return (
    <div className="w-[98%] mx-auto px-6 py-3 bg-primary text-white sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-[30%] h-[30px] lg:h-auto lg:w-[15%]">
          <Logo />
        </div>
        <div className="hidden lg:block w-[85%]">
          <NavList
            setOpenNav={setOpenNav}
            signOut={signOut}
            isSignedIn={isSignedIn}
            userDetails={userDetails}
          />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <IoCloseSharp className="h-6 w-6" strokeWidth={2} />
          ) : (
            <GiHamburgerMenu className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList
          setOpenNav={setOpenNav}
          signOut={signOut}
          isSignedIn={isSignedIn}
          userDetails={userDetails}
        />
      </Collapse>
    </div>
  );
}

NavList.propTypes = {
  setOpenNav: PropTypes.func.isRequired, // Function to set navigation state
  isSignedIn: PropTypes.bool.isRequired, // Boolean indicating if the user is signed in
  signOut: PropTypes.func.isRequired, // Function to sign out the user
  userDetails: PropTypes.shape({
    // Object for user details
    role: PropTypes.string,
    // Add any other user properties you need here
  }), // userDetails can be an object or undefined/null
};
