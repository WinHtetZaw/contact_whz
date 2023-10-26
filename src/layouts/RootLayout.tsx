import React from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

type Props = { children: React.ReactNode };

const RootLayout = ({ children }: Props) => {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};

export default RootLayout;
