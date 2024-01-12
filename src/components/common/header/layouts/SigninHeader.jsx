import React from "react";
import { RxSlash } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_PAGE,
  REGISTER_PAGE,
} from "../../../../helpers/route-paths/paths";

const SigninHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authPages = [LOGIN_PAGE, REGISTER_PAGE];
  const isNotAuthPage = () => {
    if (authPages.find((page) => page === location.pathname)) {
      return false;
    } else {
      return true;
    }
  };
  if (isNotAuthPage()) {
    return (
      <div className="signin-header">
        <div className="container-fluid">
          <div className="signin-header-links">
            <div className="d-flex align-items-center">
              <div className="link" onClick={() => navigate(LOGIN_PAGE)}>
                Sign In
              </div>
              <div>
                <RxSlash className="d-flex align-items-center font-size-2-h" />
              </div>
              <div className="link" onClick={() => navigate(REGISTER_PAGE)}>
                Create Account
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SigninHeader;
