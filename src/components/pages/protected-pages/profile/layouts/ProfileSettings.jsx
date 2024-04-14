import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../redux/actions/userActions";

const ProfileSettings = () => {
  const dispatch = useDispatch()
  return (
    <div className="profile-settings">
      <div className="container">
        <button className="logout-btn" onClick={() => dispatch(logout())}>
          <div className="d-flex align-items-center">
            <BiLogOut fontWeight={600} size={20}/>
          </div>
          <div className="d-flex align-items-center text">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
