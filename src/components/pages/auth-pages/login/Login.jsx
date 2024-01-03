import React from "react";
import Logo from "../../../plugins/logo/Logo";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="login">
      <div className="login-dark-bg">
        <div className="d-flex justify-content-center">
          <div className="login-custom-width">
            <div className="d-flex justify-content-center">
              <Logo />
            </div>
            <div className="w-fill">
              <div className="font-size-3 font-weight-1 mt-3 mb-3 text-align-center secondary-color">
Login              </div>
              <form className="form-inputs">
                <div className="email-input mt-2 mb-2">
                  <div>Email Id:</div>
                  <input placeholder="Please enter your email" type="email" />
                </div>
                <div className="password-input mt-2 mb-2">
                  <div>Password:</div>
                  <input
                    placeholder="Please enter your password"
                    type="password"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-flex-end mt-2 mb-2 font-size-1-h">
                  <div className="cursor-pointer">Forgot Password?</div>
                </div>
                <button type="submit" className="mt-2 mb-2">
                  Login
                </button>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <div className="login-custom-hr" />
                  <div className="font-size-1-h secondary-font">
                    Or Login with
                  </div>
                  <div className="login-custom-hr" />
                </div>{" "}
                <div className="d-flex align-items-center justify-content-center gap-2 mt-2 mb-2">
                  <div className="w-2 face-book-btn">
                    <button className="w-fill">
                      <FaFacebookF className="d-flex align-items-center justify-content-center w-fill" />
                    </button>
                  </div>
                  <div className="w-2 google-btn">
                    <button className="w-fill">
                      <FcGoogle className="d-flex align-items-center justify-content-center w-fill" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="font-size-1-h">Don't have an account?</div>
                    <div className="cursor-pointer register-now-btn font-size-1-h">
                      Register Now
                    </div>
                  </div>
                </div>
                <div className="font-size-1-h powered-by-tag text-align-center w-fill secondary-font">
                  Powered by Curiomac
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
