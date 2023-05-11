import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProjectLogo from "/src/assets/project.svg";
import TicketLogo from "/src/assets/tickets.svg";
import AnalyticsLogo from "/src/assets/analytics.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath.includes("/ticket"));
  return (
    <div className="p-3 sticky h-screen -translate-y-16	top-0 w-64 bg-blue-900 text-white flex-1 cursor-pointer rounded-r-lg z-50">
      <h1 className="mr-auto font-bold text-3xl p-3 pt-0">Slash</h1>

      <span className="text-xs pt-3 font-bold text-gray-300">Dasboard</span>
      <div className="mx-3">
        <div
          className={`my-1 px-4 p-0.5 rounded flex flex-row ${
            currentPath.includes("project") && "bg-blue-600/70"
          }`}
          onClick={() => navigate("/project/")}
        >
          <img
            src={ProjectLogo}
            alt=""
            width="15"
            height="20"
            className="mr-1"
          />
          Projects
        </div>
        <div
          className={`my-1 px-4 p-0.5 rounded flex flex-row ${
            currentPath.includes("/ticket") && "bg-blue-600/70"
          }`}
          onClick={() => navigate("ticket")}
        >
          <img
            src={TicketLogo}
            alt=""
            width="15"
            height="20"
            className="mr-1"
          />
          Tickets
        </div>

        <div
          className={`my-1 px-4 p-0.5 rounded flex flex-row ${
            currentPath.includes("analytics") && "bg-blue-600/70"
          }`}
          onClick={() => navigate("/analytics/")}
        >
          <img
            src={AnalyticsLogo}
            alt=""
            width="15"
            height="20"
            className="mr-1"
          />
          Analytics
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
