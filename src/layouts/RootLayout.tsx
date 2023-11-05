import React from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useAppSelector } from "../rtk/hooks";
import RouteGuard from "../components/RouteGuard";
import Foot from "../components/Foot";

type Props = { children: React.ReactNode };

const RootLayout = ({ children }: Props) => {
  const { isSidebarOpen } = useAppSelector((state) => state.mixedSlice);
  const location = useLocation();

  if (location.pathname === "/auth") {
    return <>{children}</>;
  }

  return (
    <>
      <RouteGuard>
        <Navbar />
        <div className=" w-full relative">
          <Sidebar />
          <div
            className={` ${
              !isSidebarOpen ? "ml-0" : "max-sm:ml-0 ml-[200px]"
            } h-main overflow-x-auto transition-all duration-75`}
          >
            {children}
          </div>
        </div>
        <Foot/>
      </RouteGuard>
    </>
  );
};

export default RootLayout;
