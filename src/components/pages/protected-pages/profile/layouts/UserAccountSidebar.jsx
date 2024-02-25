import React from "react";
import empty_profile_img from "../../../../../assets/imgs/profile/profile-empty.jpg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { USER_ACCOUNT_DETAILS_PAGE } from "../../../../../helpers/route-paths/paths";

const UserAccountSidebar = () => {
  const { user } = useSelector((state) => state.authState);
  const { pathname } = useLocation();
  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="user-profile-sidebar">
      <div className="res-side">
        <div className="d-flex align-items-center justify-content-center pt-2 pb-2">
          <div className="profile-img">
            <img src={empty_profile_img} alt="dummy-profile-img" />
          </div>
        </div>
        <div className="container-fluid">
          <div className="text-align-center">
            <div className="user-email">sambinudickson05@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="container-fluid res-center">
        <div className="links">
          <div
            className={`link ${
              isCurrentPath(USER_ACCOUNT_DETAILS_PAGE) && "active"
            }`}
          >
            Account
          </div>
          <div className={`link ${isCurrentPath("null") && "active"}`}>
            Address
          </div>
          <div className={`link ${isCurrentPath("null") && "active"}`}>
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountSidebar;
