import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdDashboard,
  MdOutlineInventory,
  MdSubscriptions,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useSession from "./hooks/useSession";
import { BsArrow90DegLeft, BsCashStack,  } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import PropTypes from "prop-types"

export function SidebarLinks({ closeDrawer, userDetails, signOut }) {
  const role = userDetails.role;

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <List>
      {role !== "jobseeker" && (
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
      )}
      {/* Admin and Employer */}
      {(role === "admin" || role === "employer" || role === "jobPoster") && (
        <>
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
      {(role === "admin" ||
        role === "cvwriter" ||
        role === "linkdinOptimizer") && (
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

      {/* Admin only */}
      {role === "admin" && (
        <NavLink
          onClick={handleClose}
          to="/all-users"
          className={({ isActive }) =>
            isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
          }
        >
          <ListItem className="focus:bg-transparent text-white">
            <ListItemPrefix>
              <BsCashStack className="h-5 w-5" />
            </ListItemPrefix>
            All Users
          </ListItem>
        </NavLink>
      )}

      {/* Admin, CV Writer, LinkedIn Optimizer */}
      {(role === "cvwriter" || role === "linkdinOptimizer") && (
        <>
          

          <NavLink
            onClick={handleClose}
            to="/create-package"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <AiOutlineProduct className="h-5 w-5" />
              </ListItemPrefix>
              Create Packages
            </ListItem>
          </NavLink>

          <NavLink
            onClick={handleClose}
            to="/all-package"
            className={({ isActive }) =>
              isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
            }
          >
            <ListItem className="focus:bg-transparent text-white">
              <ListItemPrefix>
                <AiOutlineProduct className="h-5 w-5" />
              </ListItemPrefix>
              All Packages
            </ListItem>
          </NavLink>
        </>
      )}

      {/* Admin, Employer, CV Writer, LinkedIn Optimizer */}
      {role !== "jobseeker" && (
        <>
          

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
    
        <ListItem className="focus:bg-transparent text-white">
          <ListItemPrefix>
            <BiLogOut className="h-5 w-5" />
          </ListItemPrefix>
          <p
            className="text-red-400 font-bold text-left px-4 py-2"
            onClick={() => {
              signOut();
              window.location.reload();
            }}
          >
            Logout
          </p>
        </ListItem>
        // </NavLink>
      )}
    </List>
  );
}


SidebarLinks.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default function Sidebar({ mobile, closeDrawer }) {
  const { userDetails, signOut } = useSession();

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
        <SidebarLinks
          closeDrawer={closeDrawer}
          signOut={signOut}
          userDetails={userDetails}
        />
      </div>
    </div>
  );
}


Sidebar.propTypes = {
  mobile: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};