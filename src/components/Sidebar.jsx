import React from "react";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineInventory,
  MdSubscriptions,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useSession from "./hooks/useSession";
import { BsArrow90DegLeft, BsCashStack, BsGear } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

export function SidebarLinks({ closeDrawer }) {
  const { userDetails, signOut } = useSession();
  const role = userDetails.role;

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <List>
      {/* Admin and Employer */}
      {(role === "admin" || role === "employer") && (
        <>
          <NavLink
            onClick={handleClose}
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <MdDashboard className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>

          <NavLink
            onClick={handleClose}
            to="/active-listing"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <AiOutlineProduct className="h-5 w-5" />
              </ListItemPrefix>
              Active listing
            </ListItem>
          </NavLink>

          <NavLink
            onClick={handleClose}
            to="/post-jobs"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <MdOutlineInventory className="h-5 w-5" />
              </ListItemPrefix>
              Post Jobs
            </ListItem>
          </NavLink>
        </>
      )}

      {/* Admin only */}
      {role === "admin" && (
        <NavLink
          onClick={handleClose}
          to="/earnings"
          className={({ isActive }) =>
            isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
          }
        >
          <ListItem className="focus:bg-transparent text-white">
            <ListItemPrefix>
              <BsCashStack className="h-5 w-5" />
            </ListItemPrefix>
            Earnings
          </ListItem>
        </NavLink>
      )}

      {/* Admin, CV Writer, LinkedIn Optimizer */}
      {(role === "cvwriter" || role === "linkdinOptimizer") && (
        <>
          <NavLink
            onClick={handleClose}
            to="/service-applications"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <AiOutlineProduct className="h-5 w-5" />
              </ListItemPrefix>
              Applications
            </ListItem>
          </NavLink>

          <NavLink
            onClick={handleClose}
            to="/"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <BsArrow90DegLeft className="h-5 w-5" />
              </ListItemPrefix>
              Return to Site
            </ListItem>
          </NavLink>
        </>
      )}

      {/* Admin, Employer, CV Writer, LinkedIn Optimizer */}
      {role !== "jobseeker" && (
        <NavLink
          onClick={handleClose}
          to=""
          className={({ isActive }) =>
            isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
          }
        >
          <ListItem className="focus:bg-transparent text-white">
            <ListItemPrefix>
              <BsGear className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </NavLink>
      )}

      {/* Admin only */}
      {role === "employer" && (
        <NavLink
          onClick={handleClose}
          to="/subscription"
          className={({ isActive }) =>
            isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
          }
        >
          <ListItem className="focus:bg-transparent text-white">
            <ListItemPrefix>
              <MdSubscriptions className="h-5 w-5" />
            </ListItemPrefix>
            Subscription
          </ListItem>
        </NavLink>
      )}

      {/* All roles except jobseeker */}
      {role !== "jobseeker" && (
        <NavLink
          to=""
          onClick={() => {
            handleClose();
            signOut();
          }}
          className={({ isActive }) =>
            isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
          }
        >
          <ListItem className="focus:bg-transparent text-white">
            <ListItemPrefix>
              <BiLogOut className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </NavLink>
      )}
    </List>
  );
}

export default function Sidebar({ mobile, closeDrawer }) {
  return (
    <div
      className={`max-w-[300px] ${
        mobile ? "" : "hidden"
      } lg:flex bg-primary text-white pt-2 p-4 h-full flex-col gap-10 overflow-hidden`}
    >
      <div
        className={` ${
          mobile ? "hidden" : ""
        } flex items-center w-full justify-center rounded-full`}
      >
        <Logo />
      </div>

      <div>
        <SidebarLinks closeDrawer={closeDrawer} />
      </div>
    </div>
  );
}
