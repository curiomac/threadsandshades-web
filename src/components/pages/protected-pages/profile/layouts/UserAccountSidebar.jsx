import React, { useEffect, useState } from "react";
import empty_profile_img from "../../../../../assets/imgs/profile/profile-empty.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ORDER_LIST_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
} from "../../../../../helpers/route-paths/paths";
import { updateProfileImage } from "../../../../../redux/actions/userActions";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const UserAccountSidebar = ({handleSidebarOpenParams, sidebarOpenParams}) => {
  const { user, user_image } = useSelector((state) => state.authState);
  const { pathname } = useLocation();
  const [profileImage, setProfileImage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(sidebarOpenParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const formdata = new FormData();
      formdata.append("avatar", file);
      const user_id = localStorage.getItem("user-id");
      if (user_id) {
        dispatch(updateProfileImage(user_id, formdata));
      }
    }
  };
  useEffect(() => {
    if (user_image) {
      setProfileImage(user_image);
    }
  }, [user_image]);
  useEffect(() => {
      setSidebarOpen(sidebarOpenParams);
  }, [sidebarOpenParams]);
  return (
    <div>
      <div className="sidebar-opener-container">
        <div
          className={`sidebar-opener ${sidebarOpen ? "open" : ""}`}
          onClick={() => handleSidebarOpenParams(!sidebarOpen)}
        >
          <FaAngleDown className="angle-ic"/>
        </div>
      </div>
      <div className={`user-profile-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="res-side">
          <div className="d-flex align-items-center justify-content-center pt-2 pb-2">
            <div className="profile-img">
              {profileImage ? (
                <img
                  className="profile-img-src"
                  src={
                    profileImage instanceof Blob
                      ? URL.createObjectURL(profileImage)
                      : profileImage
                  }
                  alt="profile-img"
                />
              ) : (
                <img
                  className="profile-img-src dummy"
                  src={empty_profile_img}
                  alt="dummy-profile-img"
                />
              )}
              <input
                type="file"
                id="profile-img"
                className="d-none"
                onChange={handleProfileImage}
              />
              <div className="edit-img-container">
                <label
                  className={`edit-img-content ${
                    profileImage ? "img" : "dummy"
                  }`}
                  htmlFor="profile-img"
                >
                  Edit
                </label>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="text-align-center">
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
        </div>
        <div className="container-fluid res-center">
          <div className="links">
            <div
              className={`link ${
                isCurrentPath(USER_ACCOUNT_DETAILS_PAGE) && "active"
              }`}
              onClick={() => {
                navigate(USER_ACCOUNT_DETAILS_PAGE);
                handleSidebarOpenParams(!sidebarOpen);
              }}
            >
              <div className="d-flex align-items-center">
                <FaUser />
              </div>
              <div className="res-849px-d-none">Account</div>
            </div>
            <div
              className={`link ${isCurrentPath(ORDER_LIST_PAGE) && "active"}`}
              onClick={() => {
                navigate(ORDER_LIST_PAGE)
                handleSidebarOpenParams(!sidebarOpen);
              }}
            >
              <div className="d-flex align-items-center">
                <BsBoxSeamFill />
              </div>
              <div className="res-849px-d-none">Order List</div>
            </div>
            <div className={`link ${isCurrentPath("null") && "active"}`}>
              <div className="d-flex align-items-center">
                <FaAddressBook />
              </div>
              <div className="res-849px-d-none">Address</div>
            </div>
            <div className={`link ${isCurrentPath("null") && "active"}`}>
              <div className="d-flex align-items-center">
                <IoSettingsOutline />
              </div>
              <div className="res-849px-d-none">Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountSidebar;
