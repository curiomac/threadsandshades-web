import React, { useEffect, useState } from "react";
import Logo from "../../../plugins/logo/Logo";
// import { FaDiscord, FaYoutube } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose, IoPersonOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  HOME_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
  COLLECTIONS_PAGE,
  LOCKED_CLOTH_PAGE,
  CART_ITEMS_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
} from "../../../../helpers/route-paths/paths";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "../../../plugins/side-drawer/SideDrawer";
import { getCart } from "../../../../redux/actions/cartAction";
import CartDrawer from "./CartDrawer";
import { getWishList } from "../../../../redux/actions/wishListAction";
import DialogModalWishList from "../../../plugins/dialog-modal-wishlist/DialogModalWishList";

const NavBar = () => {
  const { theme } = useSelector((state) => state.themeState);
  const { pathname } = useLocation();
  const { cartCount } = useSelector((state) => state.cartState);
  const { isAuthenticated } = useSelector((state) => state.authState);
  const { wishListCount } = useSelector((state) => state.wishListState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const cartPayload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    const wishListPayload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(getCart(cartPayload));
    dispatch(getWishList(wishListPayload));
  }, []);
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
                  <div
                    className={`links ${
                      (isCurrentPath(COLLECTIONS_PAGE) ||
                        isCurrentPath(LOCKED_CLOTH_PAGE)) &&
                      "active"
                    }`}
                  >
                    MEN
                  </div>
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
              {isAuthenticated && (
                <Link
                  to={USER_ACCOUNT_DETAILS_PAGE}
                  className="links-decoration-unset"
                >
                  <div className="links icon">
                    <IoPersonOutline />
                  </div>
                </Link>
              )}
              <div
                onClick={() => {
                  if (isAuthenticated) {
                    setIsModalOpen(true);
                    navigate(`${pathname}?wishlist=true`);
                  } else {
                    setIsModalOpen(false);
                    navigate(`${pathname}?isAuth=false`);
                  }
                }}
                className="links-decoration-unset"
              >
                <div className="links icon">
                  <FaRegHeart />
                  <div className="shopping-cart-count-container">
                    <div className="shopping-cart-count d-flex align-items-center justify-content-center">
                      {wishListCount}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                className="links-decoration-unset"
                to={
                  isAuthenticated ? CART_ITEMS_PAGE : `${pathname}?isAuth=false`
                }
              >
                <div className="links icon">
                  <HiOutlineShoppingBag />
                  <div className="shopping-cart-count-container">
                    <div className="shopping-cart-count d-flex align-items-center justify-content-center">
                      {cartCount}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="cart-drawer">
          <div className={`side-drawer ${isCartOpen ? "open" : ""}`}>
            <div className="links-container-res">
              <div className="mt-5">
                <div className="filter-close-ic">
                  <IoClose onClick={() => setIsCartOpen(false)} />
                </div>
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogModalWishList
        isOpen={isModalOpen}
        onClose={closeModal}
        isAuth={"auth"}
      />
    </>
  );
};

export default NavBar;
