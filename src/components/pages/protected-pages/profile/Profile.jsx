import React, { useEffect } from "react";
import NestedUserAccountPage from "./layouts/NestedUserAccountPage";
import { useDispatch } from "react-redux";
import { getUserProfile, getUserProfileImage } from "../../../../redux/actions/userActions";

const UserAccount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    if (user_id) {
      dispatch(getUserProfileImage(user_id));
      dispatch(getUserProfile(user_id))
    }
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <NestedUserAccountPage />
      </div>
    </div>
  );
};

export default UserAccount;
