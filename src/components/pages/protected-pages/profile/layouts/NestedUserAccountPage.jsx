import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserAccountSidebar from "./UserAccountSidebar";

const NestedUserAccountPage = () => {
  const [sidebarOpenParams, setSidebarOpenParams] = useState(true);
  const handleSidebarOpenParams = (params) => {
    setSidebarOpenParams(params);
  };
  return (
    <div className="nested-user-profile-page">
      <div className="d-flex content">
        <div
        // className={`${
        //   proceed === true || proceed === "true" ? "w-fill" : "w-none"
        // }`}
        >
          <UserAccountSidebar
            handleSidebarOpenParams={handleSidebarOpenParams}
            sidebarOpenParams={sidebarOpenParams}
          />
        </div>
        <div className={`outlet`} onClick={() => setSidebarOpenParams(false)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NestedUserAccountPage;
