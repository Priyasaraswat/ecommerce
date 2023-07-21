import React from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css"

const DashBoard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer"></div>
    </div>
  );
};

export default DashBoard;
