import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BiBell, BiNotification } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import useSession from "./hooks/useSession";
import { GiHamburgerMenu } from "react-icons/gi";
//   import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function HeaderSpecial() {
  const { userDetails } = useSession();

  return (
    <Navbar
      variant="gradient"
      color=""
      className="mx-auto w-[95%] bg-primary px-4 py-3 mt-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <div className="flex items-center gap-3">
          <GiHamburgerMenu className="h-6 w-6 lg:hidden" strokeWidth={2} />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="text-[12px] lg:text-[14px] mr-4 ml-2 cursor-pointer py-1.5"
          >
            Welcome, {userDetails.email}
          </Typography>
        </div>

        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton variant="text" color="white">
            <BiBell className="h-6 w-6" />
          </IconButton>
          <IconButton variant="text" color="white">
            <CgProfile className="h-6 w-6 " />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
