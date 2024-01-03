import React from "react";
import Logo from "../../../plugins/logo/Logo";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
} from "../../../../helpers/route-paths/paths";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { theme } = useSelector((state) => state.themeState);

  return (
    <div
      className={`nav-bar ${
        theme?.mode === 1
          ? "box-shadow-dark"
          : theme?.mode === 0 && "box-shadow-light"
      }`}
    >
      <div className="nav-bar-links container">
        <div className="default-links">
          <div className="links-container">
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links ternary-color">HOME</div>
            </Link>
            <Link to={ABOUT_PAGE} className="links-decoration-unset">
              <div className="links">SHOP</div>
            </Link>
            <Link to={CONTACT_PAGE} className="links-decoration-unset">
              <div className="links">BLOG</div>
            </Link>
            <Link to={ABOUT_PAGE} className="links-decoration-unset">
              <div className="links">ABOUT</div>
            </Link>
            <Link to={CONTACT_PAGE} className="links-decoration-unset">
              <div className="links">CONTACT</div>
            </Link>
          </div>
        </div>
        <div className="nav-bar-logo">
          <Logo height={60} />
        </div>
        <div className="more-links">
          <div className="links-container">
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <RiSearch2Line />
              </div>
            </Link>
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <FaDiscord />
              </div>
            </Link>
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <FaYoutube />
              </div>
            </Link>
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <IoPersonOutline />
              </div>
            </Link>
            <Link to={HOME_PAGE} className="links-decoration-unset">
              <div className="links icon">
                <HiOutlineShoppingBag />
                <div className="shopping-cart-count-container">
                  <div className="shopping-cart-count d-flex align-items-center justify-content-center">3</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
