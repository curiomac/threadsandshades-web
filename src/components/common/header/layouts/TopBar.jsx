import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../plugins/logo/Logo";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBell, BiHelpCircle, BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
// import { SETTINGS_PAGE } from '../../../../helpers/route-paths/paths';
import { useSelector } from "react-redux";
import { Popover } from "react-tiny-popover";

const TopBar = () => {
  const { theme } = useSelector((state) => state.themeState);
  const { user } = useSelector((state) => state.authState);
  const [logoutPopover, setLogoutPopover] = useState(false);

  return (
    <div
      className={`top-bar ${
        theme?.mode === "0"
          ? "box-shadow-dark"
          : theme?.mode === "1" && "box-shadow-light"
      }`}
    >
      <div className="top-bar-logo">
        <Logo height={45} />
      </div>
      <div className="top-bar-options d-flex align-items-center gap-4">
        <Link
          // to={SETTINGS_PAGE}
          className="nav-icon d-flex align-items-center cursor-pointer"
        >
          <IoSettingsOutline />
        </Link>
        <div className="nav-icon d-flex align-items-center cursor-pointer">
          <BiBell />
        </div>
        <div className="nav-icon d-flex align-items-center cursor-pointer">
          <BiHelpCircle />
        </div>
        <div className="account d-flex align-items-center gap-2">
          <Popover
            isOpen={logoutPopover}
            positions={["top", "bottom", "left", "right"]}
            content={
              <div className="logout-popover d-flex align-items-center justify-content-center gap-2 cursor-pointer">
                <BiLogOut /> Logout
              </div>
            }
            onClickOutside={() => setLogoutPopover(false)}
          >
            <div
              onClick={() => setLogoutPopover(!logoutPopover)}
              className="d-flex align-items-center gap-2"
            >
              <div>
                {user?.avatar ? (
                  <div className="profile-img d-flex align-items-center">
                    <img src={user?.avatar} />
                  </div>
                ) : (
                  <div className="profile-icon d-flex align-items-center p-1">
                    <BsFillPersonFill />
                  </div>
                )}
              </div>
              <div>
                <div className="user-name cursor-pointer res-682px-d-none">
                  {user?.name}
                </div>
                <div className="user-email cursor-pointer res-682px-d-none">
                  {user?.email}
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
