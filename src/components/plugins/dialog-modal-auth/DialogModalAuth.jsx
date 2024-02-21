import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { register, sendOtp } from "../../../redux/actions/userActions";
import OtpInput from "react-otp-input";
import { MdEmail } from "react-icons/md";
import { clearCode, clearOtpError } from "../../../redux/slices/authSlice";
import { FaCircleCheck } from "react-icons/fa6";

const DialogModalAuth = ({ isOpen, onClose, isAuth }) => {
  const { code, otp_error, register_error } = useSelector(
    (state) => state.authState
  );
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [proceedOTP, setProceedOTP] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const dispatch = useDispatch();
  const handleSendOTP = () => {
    const payload = {
      email,
    };
    dispatch(sendOtp(payload));
  };
  useEffect(() => {
    if (code === "proceed-otp") {
      setProceedOTP(true);
      setVerifySuccess(false);
      dispatch(clearOtpError());
    } else if (code === "proceed-verify-success") {
      setProceedOTP(false);
      setVerifySuccess(true);
      setEmail("");
    } else {
      setOTP("");
      setProceedOTP(false);
      setVerifySuccess(false);
    }
  }, [code]);
  console.log("code", code);
  useEffect(() => {
    if (otp.length === 6) {
      const payload = {
        email,
        otp,
      };
      dispatch(register(payload));
    } else {
      console.log("length: ", otp.length, "::");
    }
  }, [otp]);
  useEffect(() => {
    if (code === "proceed-verify-success") {
      setTimeout(() => {
        dispatch(clearCode());
        setProceedOTP(false);
        setVerifySuccess(false);
        onClose();
      }, 2500);
    }
  }, [code]);
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-auth" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="d-flex">
            {proceedOTP ? (
              <div className="content">
                <div className="close-icon-container">
                  <div className="close-icon" onClick={onClose}>
                    <IoClose />
                  </div>
                </div>
                <div className="w-fill d-flex align-items-center justify-content-center">
                  <div>
                    <div className="d-flex align-items-center justify-content-center">
                      <MdEmail className="d-flex align-items-center justify-content-center font-size-4 default-color" />
                    </div>
                    <div className="otp-heading default-color">
                      OTP sent to your mail
                    </div>
                  </div>
                </div>
                <div className="h-0">
                  {register_error && (
                    <div className="request-register-error">*{register_error}</div>
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <OtpInput
                    containerStyle={{
                      display: "flex",
                      gap: "7px",
                    }}
                    value={otp}
                    onChange={setOTP}
                    numInputs={6}
                    renderSeparator={<span>{"  "}</span>}
                    renderInput={(props) => (
                      <input {...props} className="otp-input" />
                    )}
                  />
                </div>
                <div className="resend-otp-button">Resend OTP?</div>
              </div>
            ) : verifySuccess ? (
              <div className="content">
                <div className="d-flex align-items-center justify-content-center pt-5 pb-5">
                  <div>
                    <div className="d-flex align-items-center justify-content-center">
                      <FaCircleCheck className="d-flex align-items-center justify-content-center verify-ic" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center otp-verified-quote">
                      OTP Verified Successfully!
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content">
                <div className="close-icon-container">
                  <div className="close-icon" onClick={onClose}>
                    <IoClose />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center font-size-3 font-weight-1 auth-heading">
                  {isAuth} with OTP
                </div>
                <div className="d-flx align-items-center justify-content-center">
                  <div className="number-input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="h-0">
                    {otp_error && (
                      <div className="request-otp-error">*{otp_error}</div>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="auth-btn d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleSendOTP()}
                  >
                    <div>Request OTP</div>
                    <div>
                      <FaArrowRightLong className="d-flex align-items-center" />
                    </div>
                  </button>
                </div>
                <div className="external-link-sub-heading">
                  <div className="external-link-hr default-bg"></div>
                  <div className="default-color">
                    Or {isAuth} with Mobile no
                  </div>
                  <div className="external-link-hr default-bg"></div>
                </div>
                <div className="mobile-no-btn">
                  <button>Mobile</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModalAuth;
