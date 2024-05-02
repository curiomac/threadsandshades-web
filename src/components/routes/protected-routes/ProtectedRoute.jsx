import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../../helpers/route-paths/paths";
import NotFound404 from "../../pages/error-pages/404NotFound";

const ProtectedRoute = ({ isMaxScreen, isAuth, role, children }) => {
  const { isAuthenticated } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const documentDimensions = () => {
    return window.innerWidth;
  };

  window.addEventListener("resize", documentDimensions);

  // if (isMaxScreen && documentDimensions() < 849) {
  //   return <NotFound404 />;
  // }
  if (isAuth && !isAuthenticated) {
    console.log("isAuthenticated: ", isAuthenticated);
    return <Navigate to={`${HOME_PAGE}?isAuth=false`} />;
  }
  return children;
};

export default ProtectedRoute;
