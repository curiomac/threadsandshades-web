import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  login,
  register,
  sendOtp,
} from "../../../redux/actions/userActions";
import OtpInput from "react-otp-input";
import { MdEmail } from "react-icons/md";
import { clearCode, clearOtpError } from "../../../redux/slices/authSlice";
import { FaCircleCheck } from "react-icons/fa6";
import moment from "moment";
import { getCart, updateCart } from "../../../redux/actions/cartAction";
const DialogModalAuth = ({ isOpen, onClose, isAuth }) => {
  const { user, code, otp_error, auth_error, expires_on, otp_loading } =
    useSelector((state) => state.authState);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [proceedOTP, setProceedOTP] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const dispatch = useDispatch();
  const handleSendOTP = () => {
    const payload = {
      email,
      isAuth,
    };
    dispatch(sendOtp(payload));
  };
  const handleReSendOTP = () => {
    const payload = {
      email,
      isAuth,
      reSendOTP: true,
    };
    dispatch(sendOtp(payload));
  };
  useEffect(() => {
    if (code === "proceed-otp") {
      setProceedOTP(true);
      setVerifySuccess(false);
      dispatch(clearOtpError());
      setRemainingTime(0);
    } else if (code === "proceed-verify-success") {
      setProceedOTP(false);
      setVerifySuccess(true);
      setEmail("");
      setRemainingTime(0);
    } else {
      setOTP("");
      setProceedOTP(false);
      setVerifySuccess(false);
    }
  }, [code]);
  const calculateRemainingTime = () => {
    const currentTime = moment();
    const expirationTime = moment(expires_on);
    const diff = expirationTime.diff(currentTime);
    const remainingSeconds = Math.max(0, Math.floor(diff / 1000));
    return remainingSeconds;
  };

  const formatTime = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    const minutes = Math.floor(duration.asMinutes());
    const remainingSeconds = Math.floor(duration.asSeconds()) % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };
  useEffect(() => {
    setRemainingTime(calculateRemainingTime());
  }, []);
  useEffect(() => {
    if (otp.length === 6 && remainingTime > 0) {
      const payload = {
        email,
        otp,
      };
      isAuth === "Login"
        ? dispatch(login(payload))
        : dispatch(register(payload));
      dispatch(clearAuthError());
    }
  }, [otp]);
  useEffect(() => {
    if (code === "proceed-verify-success") {
      const payload = {
        user_id: user?._id,
      };
      const local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      if (local_cart_items?.length > 0) {
        const payload = {
          user_id: user?._id,
          cart_details: local_cart_items,
        };
        dispatch(updateCart(payload));
      } else {
        dispatch(getCart(payload));
      }
      setTimeout(() => {
        dispatch(clearCode());
        dispatch(clearOtpError());
        dispatch(clearAuthError());
        setProceedOTP(false);
        setVerifySuccess(false);
        onClose();
      }, 3000);
    }
  }, [code]);

  useEffect(() => {
    if (!otp_loading) {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime, otp_loading]);
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="modal-overlay"
      onClick={() => {
        onClose();
        dispatch(clearCode());
        dispatch(clearOtpError());
        dispatch(clearAuthError());
        dispatch(clearCode());
      }}
    >
      <div className="modal-content-auth" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="d-flex">
            {proceedOTP ? (
              <div className="content">
                <div className="close-icon-container">
                  <div
                    className="close-icon"
                    onClick={() => {
                      onClose();
                      dispatch(clearCode());
                      dispatch(clearOtpError());
                      dispatch(clearAuthError());
                      dispatch(clearCode());
                    }}
                  >
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
                  {auth_error && (
                    <div className="request-register-error">*{auth_error}</div>
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
                <div className="d-flex align-items-center justify-content-space-between">
                  <div className="resend-otp-button">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleReSendOTP()}
                    >
                      Resend OTP?
                    </div>
                  </div>
                  <div className="otp-expiry-time">
                    Expires In:{" "}
                    {remainingTime > 0 ? formatTime(remainingTime) : "00:00"}
                  </div>
                </div>
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
                  <div
                    className="close-icon"
                    onClick={() => {
                      onClose();
                      dispatch(clearCode());
                      dispatch(clearOtpError());
                      dispatch(clearAuthError());
                    }}
                  >
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
                    className="auth-btn d-flex align-items-center justify-content-center gap-2 cursor-pointer"
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
