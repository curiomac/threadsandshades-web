import React from "react";
import Logo from "../../../plugins/logo/Logo";
// import { FaDiscord, FaYoutube } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
  COLLECTIONS_PAGE,
} from "../../../../helpers/route-paths/paths";
import { useSelector } from "react-redux";
import SideDrawer from "../../../plugins/side-drawer/SideDrawer";

const NavBar = () => {
  const { theme } = useSelector((state) => state.themeState);
  const { pathname } = useLocation();
  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div
        className={`nav-bar ${
          theme?.mode === 1
            ? "box-shadow-dark"
            : theme?.mode === 0 && "box-shadow-light"
        }`}
      >
        <div className="nav-bar-links container-fluid">
          <div className="res-nav-btn">
            <SideDrawer />
          </div>
          <div className="nav-links">
            <div className="nav-bar-logo">
              <Logo height={50} />
            </div>
            <div className="default-links res-849px-d-none">
              <div className="links-container">
                <Link to={HOME_PAGE} className="links-decoration-unset">
                  <div
                    className={`links ${isCurrentPath(HOME_PAGE) && "active"}`}
                  >
                    SHOP
                  </div>
                </Link>
                <Link
                  to={`${COLLECTIONS_PAGE}?type=men`}
                  className="links-decoration-unset"
                >
                  <div className={`links ${isCurrentPath(COLLECTIONS_PAGE) && "active"}`}>MEN</div>
                </Link>
                <Link
                  to={`${COLLECTIONS_PAGE}?type=women`}
                  className="links-decoration-unset"
                >
                  <div className="links">WOMEN</div>
                </Link>
                <Link to={CONTACT_PAGE} className="links-decoration-unset">
                  <div className="links">NEW ARRIVALS</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="more-links">
            <div className="links-container">
              <Link to={HOME_PAGE} className="links-decoration-unset">
                <div className="links icon">
                  <RiSearch2Line />
                </div>
              </Link>
              {/* <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <FaDiscord />
              </div>
            </Link>
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <FaYoutube />
              </div>
            </Link> */}
              <Link to={HOME_PAGE} className="links-decoration-unset">
                <div className="links icon">
                  <IoPersonOutline />
                </div>
              </Link>
              <Link to={HOME_PAGE} className="links-decoration-unset">
                <div className="links icon">
                  <FaRegHeart />
                </div>
              </Link>
              <Link to={HOME_PAGE} className="links-decoration-unset">
                <div className="links icon">
                  <HiOutlineShoppingBag />
                  <div className="shopping-cart-count-container">
                    <div className="shopping-cart-count d-flex align-items-center justify-content-center">
                      3
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
