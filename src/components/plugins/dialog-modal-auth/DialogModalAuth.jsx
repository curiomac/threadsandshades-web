import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";

const DialogModalAuth = ({ isOpen, onClose, isAuth }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-auth" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="d-flex">
            <div className="content">
              <div className="close-icon-container">
                <div className="close-icon" onClick={onClose}>
                  <IoClose />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center font-size-3 font-weight-1 auth-heading">
                {isAuth} with OTP
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="number-input">
                  <input type="number" placeholder="Enter your phone number" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button className="auth-btn d-flex align-items-center justify-content-center gap-2">
                  <div>Request OTP</div>
                  <div>
                    <FaArrowRightLong className="d-flex align-items-center" />
                  </div>
                </button>
              </div>
              <div className="external-link-sub-heading">
                <div className="external-link-hr"></div>
                <div>Or {isAuth} with email</div>
                <div className="external-link-hr"></div>
              </div>
              <div className="email-btn">
                <button>Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModalAuth;
