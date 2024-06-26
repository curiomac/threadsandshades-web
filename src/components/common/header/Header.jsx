import React from "react";
import { useLocation } from "react-router-dom";
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  NOT_FOUND_404,
  LOGIN_PAGE,
  REGISTER_PAGE,
  COLLECTIONS_PAGE,
  LOCKED_CLOTH_PAGE,
  CART_PAGE,
  CART_ITEMS_PAGE,
  BILLING_ADDRESS_PAGE,
  USER_ACCOUNT_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
  ORDER_STATUS_PAGE,
  ORDER_LIST_PAGE,
  ORDER_ADDRESS,
  SETTINGS_PAGE,
} from "../../../helpers/route-paths/paths";
import NavBar from "./layouts/NavBar";

const Header = () => {
  const location = useLocation();

  const defaultPages = [
    HOME_PAGE,
    ABOUT_PAGE,
    CONTACT_PAGE,
    COLLECTIONS_PAGE,
    LOCKED_CLOTH_PAGE,
    CART_PAGE,
    CART_ITEMS_PAGE,
    BILLING_ADDRESS_PAGE,
    USER_ACCOUNT_PAGE,
    USER_ACCOUNT_DETAILS_PAGE,
    ORDER_STATUS_PAGE,
    ORDER_LIST_PAGE,
    ORDER_ADDRESS,
    SETTINGS_PAGE
  ];

  const authPages = [LOGIN_PAGE, REGISTER_PAGE];

  const errorPages = [NOT_FOUND_404];

  const isDefaultPage = () => {
    if (defaultPages.find((page) => page === location.pathname)) {
      return true;
    } else {
      return false;
    }
  };

  const isAuthPage = () => {
    if (authPages.find((page) => page === location.pathname)) {
      return true;
    } else {
      return false;
    }
  };

  const isErrorPage = () => {
    if (errorPages.find((page) => page === location.pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`${
        (isAuthPage() || isErrorPage()) && "d-none"
      } position-sticky-0`}
    >
      {isDefaultPage() ? <NavBar /> : ""}
    </div>
  );
};

export default Header;
