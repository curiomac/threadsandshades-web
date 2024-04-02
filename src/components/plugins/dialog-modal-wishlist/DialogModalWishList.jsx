import React, { useEffect, useState } from "react";
import { FaArrowRightLong, FaRegHeart } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/productsAction";
import { moveWishList } from "../../../redux/actions/wishListAction";
import SpinnerLoader from "../loaders/spinner-loader/SpinnerLoader";
import { addCart, getTemporaryCart } from "../../../redux/actions/cartAction";
import { useLocation, useNavigate } from "react-router-dom";
import { COLLECTIONS_PAGE } from "../../../helpers/route-paths/paths";

const DialogModalWishList = ({ isOpen, onClose }) => {
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedWishListProductId, setSelectedWishListProductId] =
    useState("");
    const [localStorageItems, setLocalStorageItems] = useState(() => {
      return JSON.parse(localStorage.getItem("cart-items")) || [];
    });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts([], [], []));
  }, [dispatch]);
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
    };
    if (isAuthenticated) {
      dispatch(addCart(payload));
    } else {
      const local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      const localStoragePayload = {
        product_id: product._id,
        selected_product_details: {
          selected_color: product.target_color,
          selected_color_code: product.target_color_code,
          selected_size: product.available_sizes[0],
          selected_quantity: 1,
        },
      };
      const product_found = localStorageItems.find(
        (data) => data?.product_id === product._id
      );
      if (!product_found || localStorageItems?.length === 0) {
        localStorage.setItem(
          "cart-items",
          JSON.stringify([...local_cart_items, localStoragePayload])
        );
        setLocalStorageItems([...localStorageItems, localStoragePayload]);
        const payload = {
          cart_details: [...localStorageItems, localStoragePayload],
        };
        dispatch(getTemporaryCart(payload));
      }
    }
  };
  const handleReMoveFromWishList = (product) => {
    console.log("product-data: ", product);
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: "default",
    };
    dispatch(moveWishList(payload));
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-wish-list"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="content container-fluid-padding">
            <div className="close-icon-container">
              <div
                className="close-icon"
                onClick={() => {
                  onClose();
                  if(pathname === COLLECTIONS_PAGE) {
                    navigate(`${pathname}?type=men&wishlist=false`);
                  } else {                    
                  navigate(`${pathname}?wishlist=false`);
                  }
                }}
              >
                <IoClose />
              </div>
            </div>
            <div>
              <div className="wish-list-heading">MY WISHLIST</div>
              {/* <input
                className="search-input"
                placeholder="Search for product"
              /> */}
              <div className="wish-list-container">
                {wishListItems?.map((wishList) => {
                  return (
                    <div
                      className="wish-list"
                      onClick={() => setSelectedWishListProductId(wishList._id)}
                    >
                      <div>
                        <img
                          className="wish-list-image"
                          src={wishList?.product_images[0]}
                          alt={wishList._id}
                        />
                      </div>
                      <div
                        style={{
                          width: "-webkit-fill-available",
                        }}
                      >
                        <div className="title">{wishList?.product_title}</div>
                        <div className="price">
                          {wishList?.is_discounted_product === false && (
                            <div className="discount-price">
                              ₹{wishList?.sale_price}
                            </div>
                          )}
                          {wishList?.is_discounted_product && (
                            <div className="discount-price">
                              ₹{wishList?.sale_price - wishList?.discount_price}
                            </div>
                          )}
                          {wishList?.is_discounted_product && (
                            <div className="original-price">
                              ₹{wishList?.sale_price}
                            </div>
                          )}
                          {wishList?.is_discounted_product && (
                            <div className="discount">
                              ({wishList?.discount_percentage}% Off)
                            </div>
                          )}
                        </div>
                        <div className="product-features">
                          <div className="color-container">
                            <div className="color-heading">Color:</div>
                            <div className="color-code">Black</div>
                          </div>
                          <div className="size-container">
                            <div className="size-heading">Size:</div>
                            <div className="size-code">L</div>
                          </div>
                        </div>
                        <div className="add-to-cart-container-wishlist">
                          <button
                            className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                              (cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product._id === wishList?._id
                              ) ||
                                (cartLoading &&
                                  selectedWishListProductId ===
                                    wishList._id)) &&
                              "disabled"
                            }`}
                            onClick={() => {
                              if (
                                cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?.product._id === wishList?._id
                                ) ||
                                cartLoading
                              ) {
                                return;
                              } else {
                                handleAddToCart(wishList);
                              }
                            }}
                          >
                            {cartLoading &&
                            selectedWishListProductId === wishList._id ? (
                              <div>
                                <SpinnerLoader />
                              </div>
                            ) : (
                              <div>
                                {cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?.product._id === wishList?._id
                                ) ? (
                                  <TiTick className="font-size-3 d-flex align-items-center" />
                                ) : (
                                  <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                                )}
                              </div>
                            )}
                            <div>
                              {cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product._id === wishList?._id
                              )
                                ? "Item added to Cart"
                                : cartLoading &&
                                  selectedWishListProductId === wishList._id
                                ? "Adding to Cart"
                                : "Add To Cart"}
                            </div>
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => {
                              if (
                                wishListLoading &&
                                selectedWishListProductId === wishList._id
                              )
                                return;
                              else {
                                handleReMoveFromWishList(wishList);
                              }
                            }}
                          >
                            {wishListLoading &&
                            selectedWishListProductId === wishList._id ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <SpinnerLoader brand/>
                              </div>
                            ) : (
                              "Remove"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {wishListItems?.length === 0 && (
                  <div className="d-flex align-items-center justify-content-center" style={{height: "40vh"}}>
                    <div className="text-align-center" style={{color: "#00000082"}}>
                      <div><FaHeartBroken className="font-size-5"/></div>
                      <div className="text-transform-uc font-weight-1 mt-2">Wishlist Not Found</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModalWishList;
