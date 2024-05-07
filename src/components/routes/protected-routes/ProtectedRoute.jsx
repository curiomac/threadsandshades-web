import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  BILLING_ADDRESS_PAGE,
  CART_ITEMS_PAGE,
  CART_PAGE,
  HOME_PAGE,
} from "../../../helpers/route-paths/paths";
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
    console.log("pathname: ", pathname);
    if (
      pathname === CART_ITEMS_PAGE ||
      pathname === CART_PAGE ||
      pathname === BILLING_ADDRESS_PAGE
    ) {
      return <Navigate to={`${CART_ITEMS_PAGE}?isAuth=false`} />;
    } else {
      return <Navigate to={`${HOME_PAGE}?isAuth=false`} />;
    }
  }
  return children;
};

export default ProtectedRoute;
