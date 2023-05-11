import { Outlet, Navigate } from "react-router-dom";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { ITokenProps, TSetToken } from "../types";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-16 overflow-hidden h-[calc(100vh)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
