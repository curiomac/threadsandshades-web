import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, LOGIN_PAGE } from "../../../helpers/route-paths/paths";

const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    console.log("isAuthenticated: ", isAuthenticated);
    return <Navigate to={`${HOME_PAGE}?isAuth=false`} />;
  }
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
