import React from "react";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineInventory,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useSession from "./hooks/useSession";

export function SidebarLinks() {
  const { userDetails } = useSession();

  return (
    <List>
      <NavLink
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
        to="/applications"
        className={({ isActive }) =>
          isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
        }
      >
        <ListItem className="focus:bg-transparent text-white">
          <ListItemPrefix>
            <MdOutlineCategory className="h-5 w-5" />
          </ListItemPrefix>
          Applications
        </ListItem>
      </NavLink>

      <NavLink
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

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive ? "bg-blue-800 rounded-md" : "bg-transparent"
        }
      >
        <ListItem className="focus:bg-transparent text-white">
          <ListItemPrefix>
            <MdOutlineInventory className="h-5 w-5" />
          </ListItemPrefix>
          Analytics & Reports
        </ListItem>
      </NavLink>
    </List>
  );
}

export default function Sidebar() {
  return (
    <div className="max-w-[300px] hidden lg:flex bg-primary text-white pt-2 p-4 h-full flex-col gap-10 overflow-hidden">
      <div className="flex items-center w-full justify-center rounded-full">
        <Logo />
      </div>

      <div>
        <SidebarLinks />
      </div>
    </div>
  );
}
