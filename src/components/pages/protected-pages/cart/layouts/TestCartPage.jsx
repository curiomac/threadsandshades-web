import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useLocation, useNavigate } from "react-router-dom";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import {
  addCart,
  getTemporaryCart,
  removeCart,
} from "../../../../../redux/actions/cartAction";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { RxCross2 } from "react-icons/rx";
import { MdCurrencyRupee, MdVerified } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const TestCartPage = () => {
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
  const [cartItemsValue, setCartItemsValue] = useState([]);
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
        cart_details: product_found,
      };
      dispatch(getTemporaryCart(payload));
    }
  };
  const handleAddQty = (product) => {
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
    }
  };
  const handleReduceQty = (product) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
      qty: "negative",
    };
    if (isAuthenticated) {
      dispatch(addCart(payload));
    }
  };
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  useEffect(() => {
    setCartItemsValue(cartItems);
  }, [cartItems]);
  return (
    <div
      className={`cart-items ${
        proceed === "true" ? "hide-cart-items" : "show-cart-items"
      }`}
    >
      <div className="cart-items-container">
        {cartItems?.length > 0 ? (
          <div>
            <div className="title">Review Order</div>
            <div className="warn-sign-in">
              Please sign in to your account to continue checkout
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
                                        handleReduceQty(cartItem?.product);
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
                                        handleAddQty(cartItem?.product);
                                      }}
                                    >
                                      <FaPlus />
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <MdCurrencyRupee />
                                    <div>
                                      {cartItem?.selected_product_details
                                        ?.selected_quantity *
                                        cartItem?.product?.fixed_price}
                                      .00
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
                                // handleMoveToWishList(cartItem)
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
                              if (!cartItemsLoading) {
                                handleReduceQty(cartItem?.product);
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
                              if (!cartItemsLoading) {
                                handleAddQty(cartItem?.product);
                              }
                            }}
                          >
                            <FaPlus />
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <MdCurrencyRupee />
                          <div>
                            {cartItem?.selected_product_details
                              ?.selected_quantity *
                              cartItem?.product?.fixed_price}
                            .00
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="alredy-client gap-2">
              <div className="target">Alredy a client?</div>
              <div className="event">Sign in</div>
            </div>
          </div>
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
      {cartItems?.length > 0 && (
        <div className="res-proceed-checkout">
          <div className="sub-total d-flex align-items-center justify-content-space-between">
            <div className="heading">Subtotal</div>
            <div className="d-flex align-items-center price">
              <MdCurrencyRupee />
              <div>{checkoutDetails?.cart_total}.00</div>
            </div>
          </div>
          <div className="free-delivery">
            <div>
              <MdVerified className="font-size-2 d-flex align-items-center justify-content-center" />
            </div>
            <div>Your order is eligible for free delivery</div>
          </div>
          <button
            className="proceed-checkout-btn"
            onClick={() => {
              navigate(`${pathname}?proceed=true`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default TestCartPage;
