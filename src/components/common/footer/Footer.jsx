import React from "react";
import Logo from "../../plugins/logo/Logo";
import { AiOutlineSend } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { IoLogoXbox } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
} from "../../../helpers/route-paths/paths";

const Footer = () => {
  const location = useLocation();

  const defaultPages = [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE];

  const isDefaultPage = () => {
    if (defaultPages.find((page) => page === location.pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {isDefaultPage() && (
        <div className="footer">
          <div className="footer-container res-849px-d-block">
            <div className="brand">
              <Logo height={80} />
              <div className="details">
                Immerse yourself in a world of top-tier entertainment and stay
                at the forefront of the gaming industry.
              </div>
            </div>
            <div className="quick-links">
              <div className="heading">QUICK LINKS</div>
              <div className="links-container">
                <div className="links">
                  <span>SHOP</span>
                </div>
                <div className="links">
                  <span>MEN</span>
                </div>
                <div className="links">
                  <span>WOMEN</span>
                </div>
                <div className="links">
                  <span>NEW ARRIVALS</span>
                </div>
              </div>
            </div>
            <div className="support">
              <div className="heading">SUPPORTS</div>
              <div className="links-container">
                <div className="links">
                  <span>Setting & Privacy</span>
                </div>
                <div className="links">
                  <span>Help & Support</span>
                </div>
                <div className="links">
                  <span>Live Streaming</span>
                </div>
                <div className="links">
                  <span>Our Updates</span>
                </div>
              </div>
            </div>
            <div className="mail">
              <div className="heading">STAY IN LOOP</div>
              <div className="details">
                Subscribe to our website to receive the latest updates and news
                directly to your inbox.
              </div>
              <div className="mail-input">
                <input />
                <button>
                  <AiOutlineSend />
                </button>
              </div>
              <div className="external-links">
                <Link
                  className="link ic-twitter"
                  to="https://www.twitter.com"
                  target="_blank"
                >
                  <BsTwitter />
                </Link>
                <Link
                  className="link ic-facebook"
                  to="https://www.facebook.com"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  className="link ic-instagram"
                  to="https://www.instagram.com"
                  target="_blank"
                >
                  <GrInstagram />
                </Link>
                <Link
                  className="link ic-xbox"
                  to="https://www.xbox.com"
                  target="_blank"
                >
                  <IoLogoXbox />
                </Link>
              </div>
            </div>
          </div>
          <div className="copy-rights">© 2024 Threads and Shades. All rights reserved</div>
        </div>
      )}
    </>
  );
};

export default Footer;
