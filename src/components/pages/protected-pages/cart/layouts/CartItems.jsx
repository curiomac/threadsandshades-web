import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import {
  getTemporaryCart,
  removeCart,
} from "../../../../../redux/actions/cartAction";
import SpinnerLoaderBrand from "../../../../plugins/loaders/spinner-loader-brand/SpinnerLoaderBrand";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";

const CartItems = () => {
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cartState
  );
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const { checkoutDetails } = useSelector(
    (state) => state.checkoutDetailsState
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const trigger = getQueryParam("proceed");
  const wishlist_params = getQueryParam("wishlist");
  const { proceed } = useSelector((state) => state.resCartState);
  const dispatch = useDispatch();
  const [cartItemsSelectedId, setCartItemSelectedId] = useState("");
  const handleMoveToWishList = (cartItem) => {
    const payload = {
      product_id: cartItem?.product?._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
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
      const local_cart_items =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    const product_found = local_cart_items.filter(
      (data) => data?.product_id !== cartItem?.product?._id
    );
    const payload = {
      cart_details: product_found
    }
    dispatch(getTemporaryCart(payload));
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
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  return (
    <div
      className={`cart-items ${
        proceed === "true" ? "hide-cart-items" : "show-cart-items"
      }`}
    >
      <div>
        {cartItems?.length > 0 && (
          <div className="res-proceed-checkout">
            <div className="sub-total d-flex align-items-center justify-content-space-between">
              <div className="heading">Subtotal</div>
              <div className="price">₹{checkoutDetails?.cart_total}</div>
            </div>
            <div className="free-delivery">
              <div>
                <MdVerified className="font-size-2 d-flex align-items-center justify-content-center" />
              </div>
              <div>Your order is eligible for free delivery</div>
            </div>
            <button
              className="proceed-checkout-btn"
              onClick={() => navigate(`${pathname}?proceed=true`)}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
        <div className="cart-items-container">
          {cartItems?.length > 0 ? (
            cartItems?.map((cartItem) => {
              return (
                <div
                  className="cart-item-content"
                  onClick={() => setCartItemSelectedId(cartItem?.product?._id)}
                >
                  {(cartItemsLoading || wishListLoading) &&
                    cartItemsSelectedId === cartItem?.product?._id &&
                    (wishlist_params === false ||
                      wishlist_params === "false") && (
                      <div className="loader-container">
                        <div className="spinner-brand">
                          <SpinnerLoaderBrand />
                        </div>
                      </div>
                    )}
                  <div
                    className={`${
                      (cartItemsLoading || wishListLoading) &&
                      cartItemsSelectedId === cartItem.product?._id &&
                      (wishlist_params === false || wishlist_params === "false")
                        ? "cart-loader"
                        : "cart-default"
                    }`}
                  >
                    <div className="cart-item">
                      <div className="cart-item-img">
                        <img
                          src={cartItem?.product?.product_images[0]}
                          alt={cartItem?.product?._id}
                          onClick={() => {
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${cartItem?.product?._id}`
                            );
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "-webkit-fill-available",
                        }}
                      >
                        <div
                          className="title"
                          onClick={() => {
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${cartItem?.product?._id}`
                            );
                          }}
                        >
                          {cartItem?.product?.product_title}
                        </div>
                        <div className="price">
                          {cartItem?.product?.is_discounted_product ===
                            false && (
                            <div className="discount-price">
                              ₹{cartItem?.product?.sale_price}
                            </div>
                          )}
                          {cartItem?.product?.is_discounted_product && (
                            <div className="discount-price">
                              ₹
                              {cartItem?.product?.sale_price -
                                cartItem?.product?.discount_price}
                            </div>
                          )}
                          {cartItem?.product?.is_discounted_product && (
                            <div className="original-price">
                              ₹{cartItem?.product?.sale_price}
                            </div>
                          )}
                          {cartItem?.product?.is_discounted_product && (
                            <div className="discount">
                              ({cartItem?.product?.discount_percentage}% Off)
                            </div>
                          )}
                        </div>
                        <div className="custom-hr mt-2 mb-2"></div>
                        <div className="product-features">
                          <div className="appearance-container">
                            <div className="color-container">
                              <div className="color-heading">Color:</div>
                              <div className="color-value">
                                {
                                  cartItem?.selected_product_details
                                    ?.selected_color
                                }
                              </div>
                            </div>
                            <div className="size-container">
                              <div className="size-heading">Size:</div>
                              <div className="size-value">
                                {
                                  cartItem?.selected_product_details
                                    ?.selected_size
                                }
                              </div>
                            </div>
                          </div>
                          <div className="quantity-container">
                            <div className="quantity-heading">Quantity:</div>
                            <div className="quantity-value">
                              {
                                cartItem?.selected_product_details
                                  ?.selected_quantity
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="custom-hr mt-2 mb-2"></div>
                    <div className="d-flex cart-actions">
                      <div
                        className="remove"
                        onClick={() => handleRemoveCart(cartItem)}
                      >
                        Remove
                      </div>
                      <div
                        className="wishlist"
                        onClick={() => handleMoveToWishList(cartItem)}
                      >
                        Move to Wishlist
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart-container">
              <div className="empty-cart-content">
                <div className="icon d-flex align-items-center justify-content-center">
                  <HiOutlineShoppingBag />
                </div>
                <div className="quotes">Your cart is empty</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
