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
  ORDER_STATUS_PAGE,
  CART_ITEMS_PAGE,
  BILLING_ADDRESS_PAGE,
} from "../../../helpers/route-paths/paths";

const Footer = () => {
  const location = useLocation();

  const defaultPages = [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, ORDER_STATUS_PAGE, CART_ITEMS_PAGE, BILLING_ADDRESS_PAGE];

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
              <div className="footer-logo-mobile">
              <Logo height={100} />
              </div>
              <div className="details">
              Step into the realm of luxury fashion, where every garment is a fusion of style and innovation. Our curated collection ensures you're always at the forefront of trends, embracing sophistication and exclusivity. Elevate your wardrobe with our premium offerings, designed to captivate and inspire. Experience the epitome of sartorial excellence as you indulge in our meticulously crafted pieces.
              </div>
            </div>
            <div className="quick-links">
              <div className="heading">SHOP</div>
              <div className="links-container">
                {/* <div className="links">
                  <span>SHOP</span>
                </div> */}
                <div className="links">
                  <span>Men</span>
                </div>
                <div className="links">
                  <span>Women</span>
                </div>
                <div className="links">
                  <span>New Arrivals</span>
                </div>
              </div>
            </div>
            <div className="support">
              <div className="heading">SUPPORT</div>
              <div className="links-container">
                <div className="links">
                  <span>Privacy Policy</span>
                </div>
                <div className="links">
                  <span>Help & Support</span>
                </div>
                <div className="links">
                  <span>Terms & Conditions</span>
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
                {/* <Link
                  className="link ic-twitter"
                  to="https://www.twitter.com"
                  target="_blank"
                >
                  <BsTwitter />
                </Link> */}
                <Link
                  className="link ic-facebook"
                  to="https://www.facebook.com"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  className="link ic-instagram"
                  to="https://www.instagram.com/threadsandshades_"
                  target="_blank"
                >
                  <GrInstagram />
                </Link>
                {/* <Link
                  className="link ic-xbox"
                  to="https://www.xbox.com"
                  target="_blank"
                >
                  <IoLogoXbox />
                </Link> */}
              </div>
            </div>
          </div>
          <div className="copy-rights">
          <div className="border-bottom"></div>
            © 2024 Threads & Shades, All rights reserved.
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
