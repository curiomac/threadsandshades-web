import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserAccountSidebar from "./UserAccountSidebar";

const NestedUserAccountPage = () => {
  return (
    <div className="nested-user-profile-page">
      <div className="d-flex content">
        <div
        // className={`${
        //   proceed === true || proceed === "true" ? "w-fill" : "w-none"
        // }`}
        >
          <UserAccountSidebar />
        </div>
        <div className={`outlet`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NestedUserAccountPage;
