import React, { useState } from "react";
import { RxSlash } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import {
  LOGIN_PAGE,
  REGISTER_PAGE,
} from "../../../../helpers/route-paths/paths";
import DialogModalAuth from "../../../plugins/dialog-modal-auth/DialogModalAuth";

const SigninHeader = () => {
  const location = useLocation();
  const authPages = [LOGIN_PAGE, REGISTER_PAGE];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
