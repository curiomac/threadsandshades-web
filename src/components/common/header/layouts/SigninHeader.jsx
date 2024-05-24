import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {
  CART_ITEMS_PAGE,
  CART_PAGE,
  BILLING_ADDRESS_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
  USER_ACCOUNT_PAGE,
} from "../../../../helpers/route-paths/paths";
import logo_loader from "../../../../assets/imgs/store-room/logo-loader.png";
import { getQueryParam } from "../../../../helpers/search-query-params/getQueryParams";
import CmacModal from "../../../plugins/cmac-plugins-ts/CmacModal";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  sendOtp,
} from "../../../../redux/actions/userActions";
import {
  clearAuthCode,
  clearAuthMessage,
  clearAuthStatus,
} from "../../../../redux/slices/authSlice";
import moment from "moment";
import {
  clearOtpCode,
  clearOtpMessage,
  clearOtpStatus,
} from "../../../../redux/slices/otpSlice";
import { getCart, updateCart } from "../../../../redux/actions/cartAction";
import ToastMessage from "../../../plugins/toast-msg/ToastMessage";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import OTPInput from "react-otp-input";
import {
  getWishList,
  updateWishList,
} from "../../../../redux/actions/wishListAction";

const SigninHeader = () => {
  const { pathname } = useLocation();
  const isAuth = getQueryParam("isAuth");
  const location = useLocation();
  const navigate = useNavigate();
  const authPages = [LOGIN_PAGE, REGISTER_PAGE];
  const defaultPages = [BILLING_ADDRESS_PAGE];
  const protectedPages = [USER_ACCOUNT_PAGE, USER_ACCOUNT_DETAILS_PAGE];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth, setAuth] = useState("Login");
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
      auth,
    };
    dispatch(sendOtp(payload));
  };
  const handleReSendOTP = () => {
    const payload = {
      email,
      auth,
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

  const documentDimensions = () => {
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
    if (isAuth === "false") {
      // setIsModalOpen(true);
      setAuth("Login");
    }
  }, [isAuth]);
  useEffect(() => {
    if (otp_code && !auth_code) {
      setProceedOTP(true);
      setVerifySuccess(false);
      setRemainingTime(0);
    } else if (otp_code && auth_code) {
      setProceedOTP(false);
      setVerifySuccess(true);
      setEmail("");
      setRemainingTime(0);
    } else {
      setOTP("");
      setProceedOTP(false);
      setVerifySuccess(false);
    }
  }, [otp_code, auth_code]);
  useEffect(() => {
    switch (auth_status) {
      case "success": {
        setStatus(auth_status);
        setToastMessageValue(auth_message);
        setToastMsg(true);
        setTimeout(() => {
          setIsModalOpen(false);
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
      auth === "Login" ? dispatch(login(payload)) : dispatch(register(payload));
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
      const local_wish_list_items =
        JSON.parse(localStorage.getItem("wish-list-items")) || [];
      if (local_cart_items?.length > 0) {
        const payload = {
          user_id: user?._id,
          cart_details: local_cart_items,
        };
        dispatch(updateCart(payload));
      } else {
        dispatch(getCart(payload));
      }
      if (local_wish_list_items?.length > 0) {
        const payload = {
          user_id: user?._id,
          wish_list_details: local_wish_list_items,
        };
        dispatch(updateWishList(payload));
      } else {
        dispatch(getWishList(payload));
      }
      setTimeout(() => {
        dispatch(clearAuthCode());
        dispatch(clearOtpCode());
        dispatch(clearAuthMessage());
        setProceedOTP(false);
        setVerifySuccess(false);
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
        {/* <DialogModalAuth
          isOpen={isModalOpen}
          onClose={closeModal}
          auth={auth}
        /> */}
        <CmacModal
          active={isModalOpen}
          onClickOutsider={closeModal}
          className="auth-modal"
          portalUsage={true}
          blurStrength="stronger"
        >
          <div
            className="modal-overlay"
            onClick={(e) => {
              // dispatch(clearAuthCode());
              // dispatch(clearOtpCode());
              // dispatch(clearAuthMessage());
              e.stopPropagation();
            }}
            style={{
              marginTop: proceedOTP
                ? "-380px"
                : verifySuccess
                ? "-760px"
                : "0px",
            }}
          >
            <div className="modal-content-auth content-auth">
              <div>
                <div className="d-flex">
                  <div className="content">
                    {/* <div className="close-icon-container">
                      <div
                        className="close-icon"
                        onClick={() => {
                          dispatch(clearAuthCode());
                          dispatch(clearOtpCode());
                          dispatch(clearAuthMessage());
                        }}
                      >
                        <IoClose />
                      </div>
                    </div> */}
                    <div className="d-flex align-items-center justify-content-center font-size-2-h font-weight-1 auth-heading">
                      {auth} with OTP
                      <div style={{ height: 0, width: 0 }}>
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            background: "#fff",
                            border: "1px solid #0000001c",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            bottom: "80px",
                            right: "100px",
                          }}
                        >
                          <img
                            src={logo_loader}
                            style={{ height: "40px", width: "40px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flx align-items-center justify-content-center">
                      <div className="number-input">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendOTP();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="auth-btn d-flex align-items-center justify-content-center gap-2 cursor-pointer"
                        onClick={handleSendOTP}
                      >
                        <div>Request OTP</div>
                        <div>
                          <FaArrowRightLong className="d-flex align-items-center" />
                        </div>
                      </button>
                    </div>
                    <div className="external-link-sub-heading">
                      <div className="external-link-hr default-bg"></div>
                      <div className="">Or {auth} with Mobile no</div>
                      <div className="external-link-hr default-bg"></div>
                    </div>
                    <div className="mobile-no-btn">
                      <button>Mobile</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ToastMessage message={toastMessageValue} status={status} />
          </div>
          <div
            className="modal-overlay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-content-auth content-otp">
              <div>
                <div className="d-flex">
                  <div className="content">
                    {/* <div className="close-icon-container">
                      <div
                        className="close-icon"
                        onClick={() => {
                          dispatch(clearAuthCode());
                          dispatch(clearOtpCode());
                          dispatch(clearAuthMessage());
                        }}
                      >
                        <IoClose />
                      </div>
                    </div> */}
                    <div className="w-fill d-flex align-items-center justify-content-center">
                      <div>
                        <div
                          style={{
                            height: 0,
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              height: "60px",
                              width: "60px",
                              background: "#fff",
                              border: "1px solid #0000001c",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              bottom: "50px",
                            }}
                          >
                            <FaUserShield
                              color="var(--primary-color)"
                              size={30}
                            />
                          </div>
                        </div>
                        <div
                          className="otp-heading text-align-center"
                          style={{ marginTop: "25px" }}
                        >
                          OTP sent to your mail
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                            marginBottom: "20px",
                            fontSize: "14px",
                          }}
                          className="d-flex align-items-center justify-content-center text-align-center "
                        >
                          Please check your email to view the One-Time Password
                          (OTP) code for verification purposes.
                        </div>
                      </div>
                    </div>
                    <div className="h-0">
                      {auth_error && (
                        <div className="request-register-error">
                          *{auth_error}
                        </div>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                      <OTPInput
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
                        {remainingTime > 0
                          ? formatTime(remainingTime)
                          : "00:00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-overlay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-content-auth content-otp-success">
              <div>
                <div className="d-flex">
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
                </div>
              </div>
            </div>
          </div>
        </CmacModal>
      </div>
    );
  }
};

export default SigninHeader;
