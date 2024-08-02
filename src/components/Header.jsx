import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import CustomButton from "./CustomButton";
import Logo from "./Logo";

function NavList() {
  const [openMenu, setOpenMenu] = React.useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <ul className="w-full my-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center justify-around gap-2">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium "
      >
        <Link
          to="/"
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
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Job Listing
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />

      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-semibold relative"
        onMouseEnter={toggleMenu}
        onMouseLeave={closeMenu}
      >
        <Link
          to="#"
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Services
          <IoIosArrowDown
            className={`transition-transform ${openMenu ? "rotate-180" : ""}`}
          />
        </Link>
        {openMenu && (
          <div
            className="absolute top-8 left-0 py-2 bg-white shadow-lg rounded-lg w-[230px] 
          
          "
          >
            <Link
              className="px-4 py-2  hover:bg-gray-200 gap-2 text-[#797B89] text-sm mb-1 no-underline flex items-center"
              to=""
            >
              CV Writing
            </Link>
            <Link
              className="px-4 py-2  hover:bg-gray-200 gap-2 text-[#797B89] text-sm mb-1 no-underline flex items-center"
              to="#"
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
          className="flex items-center text-white hover:text-blue-500 text-[14px] font-semibold transition-colors"
        >
          Contact Us
        </Link>
      </Typography>
      <hr className="bg-primary lg:hidden" />

      {/* <span className="lg:mt-0 my-1 bg-red-500"> */}
      <CustomButton text={"Post Jobs"} link={"#"} />
      {/* </span> */}
      <hr className="bg-primary lg:hidden" />

      {/* <span className="lg:mt-0 my-1"> */}
      <CustomButton text={"Login"} link={"/login"} />
      <CustomButton text={"Signup"} link={"signup/home"} />
      {/* </span> */}
      <hr className="bg-primary lg:hidden" />
    </ul>
  );
}

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="w-[98%] mx-auto px-6 py-3  bg-primary text-white sticky top-0 z-10 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-[30%] h-[30px] lg:h-auto lg:w-[15%]">
          <Logo />
        </div>
        <div className="hidden lg:block w-[85%]">
          <NavList />
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
        <NavList />
      </Collapse>
    </div>
  );
}
