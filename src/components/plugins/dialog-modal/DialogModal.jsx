import React, { useState } from "react";
import Logo from "../logo/Logo";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const DialogModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <div className="d-flex">
            <div className="content">
              <div className="d-flex align-items-center justify-content-center">
                <Logo />
              </div>
              <div className="d-flex align-items-center justify-content-center gap-2 font-weight-2 font-size-5">
                <div>GET</div>
                <div className="primary-color">20%</div>
                <div>OFFER</div>
              </div>
              <div className="dialog-modal-quotes-container">
                <div className="text-align-center dialog-modal-quotes">
                  Subscribe to the Threads & Shades newsletter to receive timely
                  updates from your favorite products.
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="mail-input">
                  <input />
                  <button>
                    <AiOutlineSend />
                  </button>
                </div>
              </div>
            </div>
            <div className="banner">
              <div className="close-icon" onClick={onClose}>
                <IoClose />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
