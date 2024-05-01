import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useLocation, useNavigate } from "react-router-dom";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { getTemporaryWishList, moveWishList } from "../../../../../redux/actions/wishListAction";
import {
  addCart,
  getTemporaryCart,
  removeCart,
} from "../../../../../redux/actions/cartAction";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { RxCross2 } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiCurrencyInrBold } from "react-icons/pi";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";

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
  const [localStorageCartItems, setLocalStorageCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const handleMoveToWishList = (cartItem) => {
    const payload = {
      product_id: cartItem?.product?._id,
      user_id: user?._id,
      is_from: "cart",
    };
    if (isAuthenticated) {
      dispatch(moveWishList(payload));
    } else {
      /* Local Items */
      const local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      const local_wish_list_items =
        JSON.parse(localStorage.getItem("wish-list-items")) || [];

      /* Moving Wishlist to Wishlist Dragger */
      const localStoragePayload = {
        product_id: cartItem?.product?._id,
      };
      const product_found = local_wish_list_items.find(
        (data) => data?.product_id === cartItem?.product?._id
      );
      if (!product_found) {
        localStorage.setItem(
          "wish-list-items",
          JSON.stringify([...local_wish_list_items, localStoragePayload])
        );
        const payload = {
          wish_list_details: [...local_wish_list_items, localStoragePayload],
        };
        dispatch(getTemporaryWishList(payload));
      }

      /* Removing Product from cart */
      const updatedCartItems = local_cart_items.filter(
        (data) => data?.product_id !== cartItem?.product?._id
      );
      localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
      dispatch(getTemporaryCart({ cart_details: updatedCartItems }));
    }
  };
  const handleRemoveCart = (cartItem) => {
    console.log("[logger] cartItem: ", cartItem);
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
          console.log("[logger] updated_quantity: [85]", updated_quantity);
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
          console.log("[logger] updated_quantity: [99]", updated_quantity);
          handleRemoveCart({ product });
        }
      }
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
                              if (!cartItemsLoading) {
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
                              if (!cartItemsLoading) {
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
            <div className="alredy-client gap-2">
              <div className="target">Returning Customer?</div>
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
              <PiCurrencyInrBold />
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
