import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Drawer,
} from "@material-tailwind/react";
import { BiBell } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import useSession from "./hooks/useSession";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

export function MobileSidebar({ open, openDrawer, closeDrawer, setOpen }) {
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between h-5">
          <h2 className="font-bold text-primary text-[18px]">DASHBOARD </h2>

          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Sidebar mobile closeDrawer={closeDrawer} />
      </Drawer>
    </React.Fragment>
  );
}

export default function HeaderSpecial() {
  const { userDetails } = useSession();
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  console.log(userDetails)

  return (
    <Navbar
      variant="gradient"
      color="transparent"
      className="mx-auto w-[95%] bg-primary px-4 py-3 mt-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <div className="flex items-center gap-3">
          <GiHamburgerMenu
            onClick={openDrawer}
            className="h-6 w-6 lg:hidden"
            strokeWidth={2}
          />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="text-[12px] lg:text-[14px] mr-4 ml-2 cursor-pointer py-1.5"
          >
            Welcome, {userDetails.name}
          </Typography>
        </div>

        <div className="ml-auto flex gap-1 md:mr-4 items-center">
       <p className="font-bold text-white uppercase">{userDetails.role}</p> 
          {/* <IconButton variant="text" color="white">
            <BiBell className="h-6 w-6" />
          </IconButton>
          <IconButton variant="text" color="white">
            <CgProfile className="h-6 w-6 " />
          </IconButton> */}
        </div>
      </div>
      <MobileSidebar
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        setOpen={setOpen}
      />
    </Navbar>
  );
}
