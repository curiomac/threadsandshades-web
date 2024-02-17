import React, { useEffect, useState } from "react";
import { BiDollar, BiSolidCoupon } from "react-icons/bi";
import { IoIosArrowForward, IoIosWallet } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { getCheckoutDetails } from "../../../../../redux/actions/checkoutDetailsAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { clearError } from "../../../../../redux/slices/checkoutDetailsSlice";

const CheckoutBox = () => {
  const [couponValue, setCouponValue] = useState("");
  const [couponTriggered, setCouponTriggered] = useState(false);
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cartState
  );
  const {
    checkoutDetails,
    loading: checkoutDetailsLoading,
    error: checkoutDetailsError,
  } = useSelector((state) => state.checkoutDetailsState);
  const dispatch = useDispatch();
  const handleApplyCoupon = () => {
    dispatch(clearError());
    const payload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
      coupon_code: couponValue,
    };
    setCouponTriggered(true);
    dispatch(getCheckoutDetails(payload));
  };
  const handleRemoveCoupon = () => {
    setCouponTriggered(false);
    dispatch(clearError());
    const payload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(getCheckoutDetails(payload));
  };
  useEffect(() => {
    setCouponTriggered(false);
    const payload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(proceedTrigger(trigger));
    dispatch(getCheckoutDetails(payload));
  }, [trigger]);
  useEffect(() => {});
  return (
    <div
      className={`checkout-box ${
        proceed === true || proceed === "true"
          ? "show-checkout-box"
          : "hide-checkout-box"
      }`}
    >
      {cartItems?.length > 0 ? (
        <div>
          <div className="offer-box">
            <div className="offer-box-info">
              <div className="offer-box-tab">
                <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2 cursor-pointer">
                  <div className="d-flex align-items-center gap-2 coupons-heading">
                    <div className="d-flex align-items-center">
                      <BiSolidCoupon />
                    </div>
                    <div className="primary-font font-14">Apply Coupons</div>
                  </div>
                </div>
                <div className="apply-coupons d-flex align-items-center justify-content-space-between">
                  <div className="input w-fill">
                    <input
                      placeholder="Enter coupon code"
                      value={couponValue}
                      onChange={(e) =>
                        setCouponValue(e.target.value.toLocaleUpperCase())
                      }
                    />
                  </div>
                  <div className="btn">
                    <button
                      className="cursor-pointer font-family-poppins"
                      onClick={() => {
                        if (couponValue) {
                          handleApplyCoupon();
                        }
                      }}
                      disabled={couponValue ? false : true}
                    >
                      {checkoutDetailsLoading && couponTriggered ? (
                        <SpinnerLoader />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                </div>
                {checkoutDetailsError && couponTriggered ? (
                  <div className="h-0">
                    <div
                      className="font-10 font-eight-1"
                      style={{ color: "red" }}
                    >
                      *{checkoutDetailsError}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="custom-hr mt-2 mb-2"></div>
                {checkoutDetails.coupon_applied === true ? (
                  <div className="offer-container">
                    <div className="offer-heading font-weight-1 primary-color">
                      {checkoutDetails.coupon_code}{" "}
                      <span
                        className="font-10"
                        style={{
                          color: "gray",
                        }}
                      >
                        applied!
                      </span>
                    </div>
                    <div
                      className="font-12 remove-btn"
                      onClick={() => handleRemoveCoupon()}
                    >
                      {checkoutDetails.coupon_applied === true &&
                      checkoutDetailsLoading ? (
                        <SpinnerLoader dark />
                      ) : (
                        "REMOVE"
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="offer-container">
                    <div className="offer-heading">
                      Flat ₹500 off on orders above ₹1999 -
                    </div>
                    <div className="coupon-code">SHADES500</div>
                  </div>
                )}
                <div className="custom-hr mt-2 mb-2"></div>
                <div className="readme-quotes d-flex align-items-center gap-1">
                  <div>Readme</div>
                  <div className="d-flex align-items-center">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="price-detail-box">
            <div className="heading font-weight-1">PRICE DETAILS (1 items)</div>
            <div className="custom-hr mt-2 mb-2"></div>
            <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
              <div>Total MRP (Inc. of Taxes)</div>
              <div>₹{checkoutDetails?.total_mrp}</div>
            </div>
            {checkoutDetails?.coupon_applied && (
              <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
                <div>Coupon Applied</div>
                <div>-₹{checkoutDetails?.coupon_discount}</div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
              <div>Shipping</div>
              <div className="d-flex align-items-center gap-1">
                <div>₹{checkoutDetails?.shipping_charge}</div>
                {checkoutDetails?.discounted_delivery_charge === 0 && (
                  <div style={{ color: "#00d100" }}>(Free)</div>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
              <div>Cart Total</div>
              <div>₹{checkoutDetails?.cart_total}</div>
            </div>
          </div>
          <div className="amount-box">
            <div className="heading d-flex align-items-center justify-content-space-between">
              <div>Total Amount</div>
              <div>₹{checkoutDetails?.cart_total}</div>
            </div>
            <div className="custom-hr mt-2 mb-2"></div>
            <button className="checkout-button d-flex align-items-center gap-2 justify-content-center">
              <div>
                <MdShoppingCartCheckout className="font-size-3 d-flex align-items-center" />
              </div>
              <div>CHECKOUT</div>
            </button>
          </div>
        </div>
      ) : (
        <div className="checkout-empty"></div>
      )}
    </div>
  );
};

export default CheckoutBox;
