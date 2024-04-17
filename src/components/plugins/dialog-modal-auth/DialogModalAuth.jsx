import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { login, register, sendOtp } from "../../../redux/actions/userActions";
import OtpInput from "react-otp-input";
import { MdEmail } from "react-icons/md";
import {
  clearAuthCode,
  clearAuthMessage,
  clearAuthStatus,
} from "../../../redux/slices/authSlice";
import { FaCircleCheck } from "react-icons/fa6";
import moment from "moment";
import { getCart, updateCart } from "../../../redux/actions/cartAction";
import {
  clearOtpCode,
  clearOtpMessage,
  clearOtpStatus,
} from "../../../redux/slices/otpSlice";
import ToastMessage from "../toast-msg/ToastMessage";
const DialogModalAuth = ({ isOpen, onClose, isAuth }) => {
  const {
    user,
    message: auth_message,
    status: auth_status,
    code: auth_code,
    auth_error,
  } = useSelector((state) => state.authState);
  const {
    loading: otp_loading,
    message: otp_message,
    status: otp_status,
    code: otp_code,
    expires_on: otp_expires_on,
  } = useSelector((state) => state.otpState);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [proceedOTP, setProceedOTP] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [toastMsg, setToastMsg] = useState(false);
  const [toastMessageValue, setToastMessageValue] = useState(null);
  const [status, setStatus] = useState(null);
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
  const calculateRemainingTime = () => {
    const currentTime = moment();
    const expirationTime = moment(otp_expires_on);
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
    console.log("code: ", otp_code, auth_code);
    if (otp_code && !auth_code) {
      setProceedOTP(true);
      setVerifySuccess(false);
      setRemainingTime(0);
      console.log("Code: ", "exe - 1");
    } else if (otp_code && auth_code) {
      setProceedOTP(false);
      setVerifySuccess(true);
      setEmail("");
      setRemainingTime(0);
      console.log("Code: ", "exe - 2");
    } else {
      setOTP("");
      setProceedOTP(false);
      setVerifySuccess(false);
      console.log("Code: ", "exe - 3");
    }
  }, [otp_code, auth_code]);
  useEffect(() => {
    console.log("otp_message: ", otp_message);
    switch (auth_status) {
      case "success": {
        setStatus(auth_status);
        setToastMessageValue(auth_message);
        setToastMsg(true);
        setTimeout(() => {
          dispatch(clearAuthMessage());
          dispatch(clearAuthStatus());
          setStatus(null);
        }, 5000);
        break;
      }
      case "error": {
        setStatus(auth_status);
        setToastMessageValue(auth_message);
        setToastMsg(true);
        setTimeout(() => {
          setStatus(null);
          dispatch(clearAuthMessage());
          dispatch(clearAuthStatus());
          setToastMsg(false);
        }, 5000);
        break;
      }
      default: {
        setStatus(auth_status);
        setToastMessageValue(null);
        setToastMsg(false);
        dispatch(clearAuthMessage());
        dispatch(clearAuthStatus());
        break;
      }
    }
  }, [auth_status]);
  useEffect(() => {
    console.log("otp_message: ", otp_message);
    switch (otp_status) {
      case "success": {
        setStatus(otp_status);
        setToastMessageValue(otp_message);
        setToastMsg(true);
        setTimeout(() => {
          setStatus(null);
          dispatch(clearOtpMessage());
          dispatch(clearOtpStatus());
        }, 5000);
        break;
      }
      case "error": {
        setStatus(otp_status);
        setToastMessageValue(otp_message);
        setToastMsg(true);
        setTimeout(() => {
          setStatus(null);
          dispatch(clearOtpMessage());
          dispatch(clearOtpStatus());
          setToastMsg(false);
        }, 5000);
        break;
      }
      default: {
        setStatus(otp_status);
        setToastMessageValue(null);
        setToastMsg(false);
        dispatch(clearOtpMessage());
        dispatch(clearOtpStatus());
        break;
      }
    }
  }, [otp_status]);
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
      dispatch(clearAuthMessage());
    }
  }, [otp]);
  useEffect(() => {
    if (auth_code) {
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
        dispatch(clearAuthCode());
        dispatch(clearOtpCode());
        dispatch(clearAuthMessage());
        setProceedOTP(false);
        setVerifySuccess(false);
        onClose();
      }, 3000);
    }
  }, [auth_code]);

  useEffect(() => {
    if (!otp_loading) {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime, otp_loading]);
  useEffect(() => {
    console.log("code: ", proceedOTP, verifySuccess);
  }, [proceedOTP, verifySuccess]);
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="modal-overlay"
      onClick={() => {
        onClose();
        dispatch(clearAuthCode());
        dispatch(clearOtpCode());
        dispatch(clearAuthMessage());
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
                      dispatch(clearAuthCode());
                      dispatch(clearOtpCode());
                      dispatch(clearAuthMessage());
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
                      dispatch(clearAuthCode());
                      dispatch(clearOtpCode());
                      dispatch(clearAuthMessage());
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
      <ToastMessage message={toastMessageValue} status={status} />
    </div>
  );
};

export default DialogModalAuth;
