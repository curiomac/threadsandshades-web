import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { removeCart } from "../../../../../redux/actions/cartAction";
import SpinnerLoaderBrand from "../../../../plugins/loaders/spinner-loader-brand/SpinnerLoaderBrand";

const CartItems = () => {
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cartState
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  const dispatch = useDispatch();
  const [cartItemsSelectedId, setCartItemSelectedId] = useState("");
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  const handleMoveToWishList = (cartItem) => {
    const payload = {
      product_id: cartItem._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: "cart",
    };
    dispatch(moveWishList(payload));
  };
  const handleRemoveCart = (cartItem) => {
    const payload = {
      product_id: cartItem._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(removeCart(payload));
  };
  return (
    <div
      className={`cart-items ${
        proceed === "true" ? "hide-cart-items" : "show-cart-items"
      }`}
    >
      <div>
        {cartItems.length > 0 && (
          <div className="res-proceed-checkout">
            <div className="sub-total d-flex align-items-center justify-content-space-between">
              <div className="heading">Subtotal</div>
              <div className="price">₹3,000</div>
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
          {cartItems.length > 0 ? (
            cartItems?.map((cartItem) => {
              return (
                <div
                  className="cart-item-content"
                  onClick={() => setCartItemSelectedId(cartItem._id)}
                >
                  {cartItemsLoading && cartItemsSelectedId === cartItem._id && (
                    <div className="loader-container">
                      <div className="spinner-brand">
                        <SpinnerLoaderBrand />
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      cartItemsLoading && cartItemsSelectedId === cartItem._id
                        ? "cart-loader"
                        : "cart-default"
                    }`}
                  >
                    <div className="cart-item">
                      <div className="cart-item-img">
                        <img
                          src={cartItem.images[0].image}
                          alt={cartItem._id}
                        />
                      </div>
                      <div>
                        <div className="title">{cartItem.title}</div>
                        <div className="price">
                          <div className="discount-price">
                            ₹{parseInt(cartItem.price) - 100}
                          </div>
                          <div className="original-price">
                            ₹{cartItem.price}
                          </div>
                          <div className="discount">(60% Off)</div>
                        </div>
                        <div className="custom-hr mt-2 mb-2"></div>
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
