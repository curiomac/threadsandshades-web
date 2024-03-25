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
import { getCart, getTemporaryCart } from "../../../../redux/actions/cartAction";
import CartDrawer from "./CartDrawer";
import { getWishList } from "../../../../redux/actions/wishListAction";
import DialogModalWishList from "../../../plugins/dialog-modal-wishlist/DialogModalWishList";
import { getQueryParam } from "../../../../helpers/search-query-params/getQueryParams";
import { getProducts } from "../../../../redux/actions/productsAction";

const NavBar = () => {
  const { theme } = useSelector((state) => state.themeState);
  const { pathname } = useLocation();
  const { cartCount } = useSelector((state) => state.cartState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { wishListCount } = useSelector((state) => state.wishListState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTab, setSearchTab] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [inputText, setInputText] = useState("");
  const [defaultSearchinput, setDefaultSearchInput] = useState("");
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
  const handleGetTemporaryCartItems = () => {
    const cartLocalStorageItem = JSON.parse(localStorage.getItem("cart-items")) || [];
    const payload = {
      cart_details: cartLocalStorageItem
    }
    dispatch(getTemporaryCart(payload))
  }
  useEffect(() => {
    const wishListPayload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(getWishList(wishListPayload));
    if(isAuthenticated) {
      const cartPayload = {
        user_id: user?._id,
      };
      dispatch(getCart(cartPayload));
    } else {
      handleGetTemporaryCartItems()
    }
  }, []);
  useEffect(() => {
    if (searching) {
      setTimeout(() => {
        setSearching(false);
        navigate(
          `${COLLECTIONS_PAGE}?type=men${
            inputText ? `&input=${inputText}&searching=${false}` : ""
          }`
        );
      }, 1000);
    }
  }, [inputText]);
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
              <Logo height={50} onClick={() => navigate(HOME_PAGE)}/>
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
              <div className={`search-bar-container res-992px-d-none`}>
                <div
                  className={`search-bar ${
                    searchTab ? "search-bar-visible" : ""
                  }`}
                >
                  <input
                    value={defaultSearchinput}
                    placeholder="Search for products 🛒"
                    onChange={(e) => {
                      setDefaultSearchInput(e.target.value);
                      const search_input = e.target.value.split(" ").join("+");
                      setSearching(true);
                      setInputText(search_input);
                      if (e.target.value === "") {
                        dispatch(getProducts([], [], []));
                      }
                      navigate(
                        `${COLLECTIONS_PAGE}?type=men${
                          search_input
                            ? `&input=${search_input}&searching=${true}`
                            : ""
                        }`
                      );
                    }}
                  />
                </div>
              </div>
              <div className="links-decoration-unset">
                <div className="links icon">
                  <RiSearch2Line onClick={() => setSearchTab(!searchTab)} />
                </div>
              </div>
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
                    setIsModalOpen(true);
                    if(pathname === COLLECTIONS_PAGE) {
                      navigate(`${pathname}?type=men&wishlist=true`);
                    } else {
                      navigate(`${pathname}?wishlist=true`);
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
                to={CART_ITEMS_PAGE}
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
      <div className="res-992px-d-unset">
        <div
          className={`search-bar-box ${
            searchTab ? "search-triggered-box" : ""
          }`}
        >
          <div
            className={`search-input-container ${
              searchTab ? "search-triggered" : ""
            }`}
          >
            <div className="search-icon">
              <RiSearch2Line />
            </div>
            <input
              value={defaultSearchinput}
              placeholder="Search for products 🛒"
              onChange={(e) => {
                const search_input = e.target.value.split(" ").join("+");
                setDefaultSearchInput(e.target.value);
                setSearching(true);
                setInputText(search_input);
                if (e.target.value === "") {
                  dispatch(getProducts([], [], []));
                }
                navigate(
                  `${COLLECTIONS_PAGE}?type=men${
                    search_input
                      ? `&input=${search_input}&searching=${true}`
                      : ""
                  }`
                );
              }}
            />
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
