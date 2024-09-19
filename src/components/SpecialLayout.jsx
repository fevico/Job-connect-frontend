import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderSpecial from "./HeaderSpecial";

export default function SpecialLayout() {
  return (
    <div className="flex bg-[#ECECEC] h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <HeaderSpecial />
        <main className="pt-[30px] px-8 w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
