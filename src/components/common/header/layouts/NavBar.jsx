import React, { useEffect, useState } from "react";
import Logo from "../../../plugins/logo/Logo";
import { FaFacebookF, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoLogoXbox, IoPersonOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import Loader from "react-js-loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HOME_PAGE,
  CONTACT_PAGE,
  COLLECTIONS_PAGE,
  LOCKED_CLOTH_PAGE,
  CART_ITEMS_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
} from "../../../../helpers/route-paths/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  getTemporaryCart,
  removeCart,
} from "../../../../redux/actions/cartAction";
import {
  getTemporaryWishList,
  moveWishList,
} from "../../../../redux/actions/wishListAction";
import { getProducts } from "../../../../redux/actions/productsAction";
import { BsCart, BsTwitterX } from "react-icons/bs";
import SideDragger from "../../../plugins/cmac-plugins/side-dragger/SideDragger";
import { IoCloseOutline } from "react-icons/io5";
import { GrInstagram } from "react-icons/gr";
import men_res_nav_img from "../../../../assets/imgs/store-room/men-res-nav-img.jpg";
import women_res_nav_img from "../../../../assets/imgs/store-room/women-res-nav-img.jpg";
import kids_res_nav_img from "../../../../assets/imgs/store-room/kids-res-nav-img.jpg";
import discount_res_nav_img from "../../../../assets/imgs/store-room/discount-res-nav-img.jpg";
import { IoIosArrowForward } from "react-icons/io";
import HambugerMenu from "../../../plugins/cmac-plugins/hamburger-menu/HambugerMenu";
import { getCurrencyFormat } from "../../../../helpers/currency-formatter/getCurrencyFormat";
import { PiCurrencyInrBold } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import AddCartBtn from "../../../utils/AddCartBtn";
import SpinnerLoader from "../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { TiShoppingCart } from "react-icons/ti";

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
  const [wishListDragOpen, setWishListDragOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [inputText, setInputText] = useState("");
  const [defaultSearchinput, setDefaultSearchInput] = useState("");
  const [draggerOpen, setDraggerOpen] = useState(false);
  const [categoryDraggerOpen, setCategoryDraggerOpen] = useState(false);
  const [cartDraggerOpen, setCartDraggerOpen] = useState(false);
  const [catergoryValue, setCategory] = useState("");
  const [cartItemsValue, setCartItemsValue] = useState([]);
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const [selectedWishListProductId, setSelectedWishListProductId] =
    useState("");
  const [localStorageItems, setLocalStorageItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const handleAddToCart = (product, callFrom) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
      is_from: callFrom,
    };

    if (isAuthenticated) {
      dispatch(addCart(payload));
      return;
    }

    const local_cart_items =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    const local_wish_list_items =
      JSON.parse(localStorage.getItem("wish-list-items")) || [];
    const product_found = local_cart_items.find(
      (data) => data?.product_id === product._id
    );

    const localStoragePayload = {
      product_id: product._id,
      selected_product_details: {
        selected_color: product.target_color,
        selected_color_code: product.target_color_code,
        selected_size: product.available_sizes[0],
        selected_quantity: product_found
          ? product_found.selected_product_details.selected_quantity + 1
          : 1,
      },
    };

    const updatedCartItems = product_found
      ? [
          localStoragePayload,
          ...local_cart_items.filter(
            (data) => data?.product_id !== product._id
          ),
        ]
      : [localStoragePayload, ...local_cart_items];

    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
    dispatch(getTemporaryCart({ cart_details: updatedCartItems }));
    if (callFrom === "wishlist") {
      const update_wishlist_products = local_wish_list_items.filter(
        (data) => data?.product_id !== product._id
      );
      localStorage.setItem(
        "wish-list-items",
        JSON.stringify([...update_wishlist_products])
      );
      const payload = {
        wish_list_details: [...update_wishlist_products],
      };
      dispatch(getTemporaryWishList(payload));
    }
  };
  const handleReMoveFromWishList = (product) => {
    console.log("product-data: ", product);
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      is_from: "default",
    };
    dispatch(moveWishList(payload));
  };
  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    } else {
      return false;
    }
  };
  const handleGetTemporaryCartItems = () => {
    const cartLocalStorageItem =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    const payload = {
      cart_details: cartLocalStorageItem,
    };
    dispatch(getTemporaryCart(payload));
  };
  const handleGetTemporaryWishListItems = () => {
    const wishlistLocalStorageItem =
      JSON.parse(localStorage.getItem("wish-list-items")) || [];
    console.log("wishlistLocalStorageItem");
    const payload = {
      wish_list_details: wishlistLocalStorageItem,
    };
    dispatch(getTemporaryWishList(payload));
  };
  const documentDimensions = () => {
    return window.innerWidth;
  };

  window.addEventListener("resize", documentDimensions);

  const handleMoveToWishList = (cartItem) => {
    const payload = {
      product_id: cartItem?.product?._id,
      user_id: user?._id,
      is_from: "cart",
    };
    dispatch(moveWishList(payload));
  };
  const handleRemoveCart = (cartItem) => {
    if (isAuthenticated) {
      const payload = {
        product_id: cartItem?.product?._id,
        user_id: user?._id,
      };
      dispatch(removeCart(payload));
    } else {
      let local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      const updatedCartItems = local_cart_items.filter(
        (data) => data?.product_id !== cartItem?.product?._id
      );
      localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
      dispatch(getTemporaryCart({ cart_details: updatedCartItems }));
    }
  };
  const handleQty = (product, action) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
      ...(action === "reduce" && { qty: "negative" }),
      is_from: "default",
    };

    if (isAuthenticated) {
      dispatch(addCart(payload));
    } else {
      let local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      const product_found = local_cart_items.find(
        (data) => data?.product_id === product._id
      );

      if (product_found) {
        const { selected_quantity } = product_found.selected_product_details;
        const updated_quantity =
          action === "add" ? selected_quantity + 1 : selected_quantity - 1;

        if (updated_quantity > 0) {
          const updatedProduct = {
            ...product_found,
            selected_product_details: {
              ...product_found.selected_product_details,
              selected_quantity: updated_quantity,
            },
          };
          const updatedCartItems = local_cart_items.map((item) =>
            item?.product_id === product._id ? updatedProduct : item
          );
          localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
          dispatch(getTemporaryCart({ cart_details: updatedCartItems }));
        } else {
          handleRemoveCart({ product });
        }
      }
    }
  };
  useEffect(() => {
    setCartItemsValue(cartItems);
  }, [cartItems]);
  useEffect(() => {
    dispatch(getProducts([], [], []));
  }, [dispatch]);
  useEffect(() => {
    if (!isAuthenticated) {
      handleGetTemporaryCartItems();
      handleGetTemporaryWishListItems();
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
            <div
              onClick={() => setDraggerOpen(true)}
              style={{ marginLeft: "-20px" }}
            >
              <HambugerMenu
                checked={draggerOpen}
                scaleWidth={"50px"}
                scaleGapHeight={"10px"}
              />
            </div>
          </div>
          <div className="nav-links">
            <div className="nav-bar-logo">
              <Logo height={50} onClick={() => navigate(HOME_PAGE)} />
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
                    placeholder="Search for Products 🛒"
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
                  setWishListDragOpen(true);
                  if (pathname === COLLECTIONS_PAGE) {
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
                    {wishListCount > 0 && (
                      <div className="shopping-cart-count d-flex align-items-center justify-content-center">
                        {wishListCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="links-decoration-unset"
                onClick={() => {
                  if (documentDimensions() < 849) {
                    navigate(CART_ITEMS_PAGE);
                    // setCartDraggerOpen(true);
                  } else {
                    navigate(CART_ITEMS_PAGE);
                    setCartDraggerOpen(false);
                  }
                }}
              >
                <div className="links icon">
                  <BsCart />
                  <div className="shopping-cart-count-container">
                    <div className="shopping-cart-count d-flex align-items-center justify-content-center">
                      {cartCount}
                    </div>
                  </div>
                </div>
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
              placeholder="Search for Products 🛒"
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
      {/* <DialogModalWishList
        isOpen={wishListDragOpen}
        onClose={closeModal}
        isAuth={"auth"}
      /> */}
      <SideDragger
        open={draggerOpen}
        onClose={() => setDraggerOpen(false)}
        dragPosition={"left"}
        className={"p-2 res-nav-dragger"}
      >
        <div className="res-navbar">
          <div className="nav-links">
            <div
              className="link-container"
              onClick={() => {
                setCategoryDraggerOpen(true);
                setCategory("Men");
              }}
            >
              <div className="portion-1">
                <div className="img-container">
                  <img src={men_res_nav_img} alt="men-res-nav-img" />
                </div>
                <div className="target">Men</div>
              </div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className="link-container"
              onClick={() => {
                setCategoryDraggerOpen(true);
                setCategory("Women");
              }}
            >
              <div className="portion-1">
                <div className="img-container">
                  <img src={women_res_nav_img} alt="men-res-nav-img" />
                </div>
                <div className="target">Women</div>
              </div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className="link-container"
              onClick={() => {
                setCategoryDraggerOpen(true);
                setCategory("Kids");
              }}
            >
              <div className="portion-1">
                <div className="img-container">
                  <img src={kids_res_nav_img} alt="men-res-nav-img" />
                </div>
                <div className="target">Kids</div>
              </div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className="link-container"
              onClick={() => {
                setCategoryDraggerOpen(true);
                setCategory("Discount Sale");
              }}
            >
              <div className="portion-1">
                <div className="img-container">
                  <img src={discount_res_nav_img} alt="men-res-nav-img" />
                </div>
                <div className="target">Discount Sale</div>
              </div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div className="quick-links">
              <div className="link">Shop</div>
              <div className="link">Customer Support</div>
              <div className="link">Subscribe News Letter</div>
              <div className="link">Our Updates</div>
            </div>
          </div>
          <div className="nav-footer">
            <div className="text-align-center">
              <div className="font-12 font-weight-1">Follow us on</div>
              <div className="external-links">
                <Link
                  className="link ic-twitter"
                  to="https://www.twitter.com"
                  target="_blank"
                >
                  <BsTwitterX />
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
                  to="https://www.instagram.com/threadsandshades_"
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
            <div className="font-12 text-align-center mt-3">
              © 2024 Threads & Shades. All rights reserved
            </div>
          </div>
        </div>
      </SideDragger>
      <SideDragger
        open={categoryDraggerOpen}
        dragPosition={"left"}
        className={"p-3 category-dragger"}
        onClose={() => setCategoryDraggerOpen(false)}
      >
        <div className="category-listing">
          <div className="category-list">
            <div className="heading d-flex align-items-center gap-5 font-20">
              <div
                className="d-flex align-items-center"
                style={{ transform: "rotate(180deg)", marginLeft: "-5px" }}
                onClick={() => setCategoryDraggerOpen(false)}
              >
                <IoIosArrowForward size={20} />
              </div>
              <div className="font-weight-1">{catergoryValue}</div>
            </div>
            <div
              className="d-flex align-items-center justify-content-space-between mt-3"
              onClick={() => {
                setDraggerOpen(false);
                setCategoryDraggerOpen(false);
                navigate(`${COLLECTIONS_PAGE}?type=men`);
              }}
            >
              <div className="portion-1">Trending</div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-space-between mt-2"
              onClick={() => {
                setDraggerOpen(false);
                setCategoryDraggerOpen(false);
                navigate(`${COLLECTIONS_PAGE}?type=men`);
              }}
            >
              <div className="portion-1">New Arraivals</div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-space-between mt-2"
              onClick={() => {
                setDraggerOpen(false);
                setCategoryDraggerOpen(false);
                navigate(`${COLLECTIONS_PAGE}?type=men`);
              }}
            >
              <div className="portion-1">Trending</div>
              <div className="portion-2">
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <div className="nav-footer">
            <div className="text-align-center">
              <div className="font-12 font-weight-1">Follow us on</div>
              <div className="external-links">
                <Link
                  className="link ic-twitter"
                  to="https://www.twitter.com"
                  target="_blank"
                >
                  <BsTwitterX />
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
                  to="https://www.instagram.com/threadsandshades_"
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
            <div className="font-12 text-align-center mt-3">
              © 2024 Threads & Shades. All rights reserved
            </div>
          </div>
        </div>
      </SideDragger>
      <SideDragger
        open={wishListDragOpen}
        onClose={() => setWishListDragOpen(false)}
        dragPosition={"right"}
        className={"wish-list-dragger"}
        width={"500px"}
      >
        <div>
          <div className="p-3 pt-2 pb-2 d-flex align-items-center justify-content-space-between">
            <div className="font-18">
              Your Wishlist{" "}
              <span className="font-family-spinnaker">({wishListCount})</span>
            </div>
            <div>
              <IoCloseOutline
                onClick={() => setWishListDragOpen(false)}
                size={30}
              />
            </div>
          </div>
          <div
            className="wishlist-item-scroll"
            style={{
              height: "calc(var(--doc-height) - 50px)",
              overflow: "auto",
            }}
          >
            {wishListItems?.map((wishList) => {
              return (
                <div
                  className="wish-list"
                  onClick={() => setSelectedWishListProductId(wishList._id)}
                >
                  <div>
                    <img
                      className="wish-list-image"
                      src={
                        wishList?.product_images?.length > 0 &&
                        wishList?.product_images[0]
                      }
                      alt={wishList._id}
                    />
                  </div>
                  <div
                    style={{
                      width: "-webkit-fill-available",
                    }}
                  >
                    <div className="title">{wishList?.product_title}</div>
                    <div className="d-flex gap-1 mt-1 mb-1 price-container">
                      {wishList?.is_discounted_product && (
                        <div className="price">
                          <div className="d-flex align-items-center">
                            <PiCurrencyInrBold />
                          </div>
                          <div>
                            {getCurrencyFormat(
                              wishList.sale_price - wishList.discount_price
                            )}
                          </div>
                        </div>
                      )}
                      <div
                        className={`${
                          wishList?.is_discounted_product && "offered"
                        } price`}
                      >
                        <div className="d-flex align-items-center">
                          <PiCurrencyInrBold />
                        </div>
                        <div>{getCurrencyFormat(wishList.sale_price)}</div>
                      </div>{" "}
                      {wishList?.is_discounted_product && (
                        <div className="discount-value">
                          {wishList?.discount_percentage}% offer
                        </div>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-1 features">
                      <div className="font-14 font-weight-1">
                        {wishList?.selected_product_details?.selected_size}
                      </div>
                      <div className="custom-vr"></div>
                      <div
                        className="target-color"
                        style={{
                          backgroundColor:
                            wishList?.selected_product_details
                              ?.selected_color_code,
                        }}
                      ></div>
                    </div>
                    <div className="actions-container">
                      {/* <div>
                        <AddCartBtn
                          backgroundColor={"#fe2d5a"}
                          loading={
                            cartLoading &&
                            selectedWishListProductId === wishList._id
                              ? true
                              : false
                          }
                          onClick={() => {
                            if (cartLoading) {
                              return;
                            } else {
                              handleAddToCart(wishList, "wishlist");
                            }
                          }}
                        />
                      </div> */}
                      {/* <button
                        className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 cursor-pointer ${
                          true && "disabled"
                        }`}
                        onClick={() => {
                          if (cartLoading) {
                            return;
                          } else {
                            handleAddToCart(wishList, "wishlist");
                          }
                        }}
                      >
                        {true ? (
                          <div>
                            <Loader
                              type="spinner-cub"
                              bgColor={"#000"}
                              color={"#000"}
                              size={25}
                            />
                          </div>
                        ) : (
                          <div>
                            <TiShoppingCart
                              size={22}
                              className="d-flex align-items-center"
                            />
                          </div>
                        )}
                        <div>
                          {true
                            ? "Please Wait..."
                            : "Add To Cart"}
                        </div>
                      </button> */}
                      <button
                        className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 cursor-pointer ${
                          cartLoading &&
                          selectedWishListProductId === wishList._id &&
                          "disabled"
                        }`}
                        onClick={() => {
                          if (cartLoading) {
                            return;
                          } else {
                            handleAddToCart(wishList, "wishlist");
                          }
                        }}
                      >
                        {cartLoading &&
                        selectedWishListProductId === wishList._id ? (
                          <div>
                            <Loader
                              type="spinner-cub"
                              bgColor={"#000"}
                              color={"#000"}
                              size={25}
                            />
                          </div>
                        ) : (
                          <div>
                            <TiShoppingCart
                              size={22}
                              className="d-flex align-items-center"
                            />
                          </div>
                        )}
                        <div>
                          {cartLoading &&
                          selectedWishListProductId === wishList._id
                            ? "Please Wait..."
                            : "Add To Cart"}
                        </div>
                      </button>
                      <div className="trash-ic cursor-pointer">
                        <CiTrash
                          size={28}
                          onClick={() => handleReMoveFromWishList(wishList)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SideDragger>
      <SideDragger
        open={cartDraggerOpen}
        onClose={() => setCartDraggerOpen(false)}
        dragPosition={"right"}
        className={"cart-dragger"}
        width={"500px"}
      >
        <div>
          <div className="p-3 pt-2 pb-2 d-flex align-items-center justify-content-space-between">
            <div className="font-18">
              Your Cart
              <span className="font-family-spinnaker">({cartCount})</span>
            </div>
            <div>
              <IoCloseOutline
                onClick={() => setCartDraggerOpen(false)}
                size={30}
              />
            </div>
          </div>
          <div className="products-container">
            <div className="products">
              {cartItemsValue?.map((cartItem, index) => {
                console.log("cartItem: ", cartItem);
                return (
                  <div
                    className={`order-item ${
                      index < cartItemsValue?.length - 1 ? "end" : ""
                    }`}
                  >
                    <div className="d-flex align-items-center gap-4">
                      <div
                        className="product-img cursor-pointer"
                        onClick={() =>
                          navigate(
                            `${LOCKED_CLOTH_PAGE}?type=men&product_id=${cartItem?.product?._id}`
                          )
                        }
                      >
                        <img
                          src={
                            cartItem?.product?.product_images?.length > 0 &&
                            cartItem?.product?.product_images[0]
                          }
                          alt="image_1"
                        />
                      </div>
                      <div className="product-info cursor-pointer">
                        <div
                          className="product-title"
                          onClick={() =>
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${cartItem?.product?._id}`
                            )
                          }
                        >
                          {cartItem?.product?.product_title}
                        </div>
                        <div className="selected-product-features">
                          <div className="d-flex align-items-center justify-content-space-between selected-product-features-res">
                            <div className="d-flex align-items-center gap-3 mt-1 features">
                              <div className="font-14 font-weight-1">
                                {
                                  cartItem?.selected_product_details
                                    ?.selected_size
                                }
                              </div>
                              <div className="custom-vr"></div>
                              <div
                                className="target-color"
                                style={{
                                  backgroundColor:
                                    cartItem?.selected_product_details
                                      ?.selected_color_code,
                                }}
                              ></div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-1 price">
                              {/* res-vis */}
                              <div className="product-price-details price-details-res-unset d-flex align-items-center gap-3">
                                <div className="qty-container gap-3">
                                  <div
                                    className="event-ic cursor-pointer"
                                    onClick={() => {
                                      handleQty(cartItem?.product, "reduce");
                                    }}
                                  >
                                    <FaMinus />
                                  </div>
                                  <div className="qty">
                                    {
                                      cartItem?.selected_product_details
                                        ?.selected_quantity
                                    }
                                  </div>
                                  <div
                                    className="event-ic cursor-pointer"
                                    onClick={() => {
                                      handleQty(cartItem?.product, "add");
                                    }}
                                  >
                                    <FaPlus />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <PiCurrencyInrBold />
                                  <div>
                                    {getCurrencyFormat(
                                      cartItem?.selected_product_details
                                        ?.selected_quantity *
                                        cartItem?.product?.fixed_price
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart-events gap-3">
                          <div
                            onClick={() => {
                              handleRemoveCart(cartItem);
                            }}
                          >
                            Remove
                          </div>
                          <div className="custom-vr" />
                          <div
                            onClick={() => {
                              handleMoveToWishList(cartItem);
                            }}
                          >
                            Move to Wishlist
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-price-details price-details-res-none">
                      <div className="qty-container gap-3">
                        <div
                          className="event-ic cursor-pointer"
                          onClick={() => {
                            if (!cartLoading) {
                              handleQty(cartItem?.product, "reduce");
                            }
                          }}
                        >
                          <FaMinus />
                        </div>
                        <div className="qty">
                          {
                            cartItem?.selected_product_details
                              ?.selected_quantity
                          }
                        </div>
                        <div
                          className="event-ic cursor-pointer"
                          onClick={() => {
                            if (!cartLoading) {
                              handleQty(cartItem?.product, "add");
                            }
                          }}
                        >
                          <FaPlus />
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <PiCurrencyInrBold />
                        <div>
                          {getCurrencyFormat(
                            cartItem?.selected_product_details
                              ?.selected_quantity *
                              cartItem?.product?.fixed_price
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SideDragger>
    </>
  );
};

export default NavBar;
