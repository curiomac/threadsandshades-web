import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CART_ITEMS_PAGE,
  CART_PAGE,
  BILLING_ADDRESS_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
  USER_ACCOUNT_PAGE,
} from "../../../../helpers/route-paths/paths";
import DialogModalAuth from "../../../plugins/dialog-modal-auth/DialogModalAuth";
import { getQueryParam } from "../../../../helpers/search-query-params/getQueryParams";

const SigninHeader = () => {
  const {pathname} = useLocation()
  const isAuth = getQueryParam("isAuth");
  const location = useLocation();
  const navigate = useNavigate();
  const authPages = [LOGIN_PAGE, REGISTER_PAGE];
  const defaultPages = [BILLING_ADDRESS_PAGE];
  const protectedPages = [USER_ACCOUNT_PAGE, USER_ACCOUNT_DETAILS_PAGE];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState("");
  const documentDimensions = () => {
    if (
      window.innerWidth < 849
    ) {
      console.log("pathnamepathname: ", pathname);
    }
    return window.innerWidth;
  };

  window.addEventListener("resize", documentDimensions);
  const closeModal = () => {
    navigate(`${location.pathname}?proceed=true&isAuth=null`);
    setIsModalOpen(false);
  };
  const isNotRestrictedPage = () => {
    if (authPages.find((page) => page === location.pathname)) {
      return false;
    } else if (defaultPages.find((page) => page === location.pathname)) {
      return false;
    } else if (protectedPages.find((page) => page === location.pathname)) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    console.log("isAuth: ", isAuth);
    if (isAuth === "false") {
      setIsModalOpen(true);
      setAuth("Login");
    }
  }, [isAuth]);
  if (isNotRestrictedPage()) {
    return (
      <div className="signin-header" style={{ zIndex: isModalOpen ? 100 : 10 }}>
        <div className="container-fluid">
          <div className="signin-header-links">
            <div className="d-flex align-items-center">
              <div
                className="link"
                onClick={() => {
                  setAuth("Login");
                  setIsModalOpen(true);
                }}
              >
                Sign In
              </div>
              <div>
                <RxSlash className="d-flex align-items-center font-size-2-h" />
              </div>
              <div
                className="link"
                onClick={() => {
                  setAuth("Register");
                  setIsModalOpen(true);
                }}
              >
                Create Account
              </div>
            </div>
          </div>
        </div>
        <DialogModalAuth
          isOpen={isModalOpen}
          onClose={closeModal}
          isAuth={auth}
        />
      </div>
    );
  }
};

export default SigninHeader;
