import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ABOUT_PAGE,
  COLLECTIONS_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
} from "../../../helpers/route-paths/paths";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Logo from "../logo/Logo";

const SideDrawer = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseDrawer = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className="toggle-button" onClick={toggleDrawer}>
        {isOpen ? <IoClose /> : <RxHamburgerMenu />}
      </button>
      <div className={`side-drawer ${isOpen ? "open" : ""}`}>
        <div className="links-container-res">
          <div>
            <Logo />
            <Link
              to={HOME_PAGE}
              className="links-decoration-unset"
              onClick={handleCloseDrawer}
            >
              <div className={`links ${pathname === "/" && "active"}`}>
                SHOP
              </div>
            </Link>
            <Link
              to={`${COLLECTIONS_PAGE}?type=men`}
              className="links-decoration-unset"
              onClick={handleCloseDrawer}
            >
              <div className="links">MEN</div>
            </Link>
            <Link to={CONTACT_PAGE} className="links-decoration-unset">
              <div className="links">WOMEN</div>
            </Link>
            <Link to={CONTACT_PAGE} className="links-decoration-unset">
              <div className="links">NEW ARRIVALS</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
