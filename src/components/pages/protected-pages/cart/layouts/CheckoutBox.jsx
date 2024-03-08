import React, { useEffect, useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { IoIosArrowForward, IoIosWallet } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import { getCheckoutDetails } from "../../../../../redux/actions/checkoutDetailsAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { clearError } from "../../../../../redux/slices/checkoutDetailsSlice";
import CustomTooltip from "../../../../plugins/custom-tooltip/CustomTooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BILLING_ADDRESS_PAGE } from "../../../../../helpers/route-paths/paths";
const CheckoutBox = () => {
  const navigate = useNavigate()
  const [couponValue, setCouponValue] = useState("");
  const [textCopied, setTextCopied] = useState(false);
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
  const handleCopyToClipboard = (text) => {
    const textToCopy = text;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTextCopied(true);
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };
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
  return (
    <div
      className={`checkout-box ${proceed === true || proceed === "true"
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
                        checkoutDetailsLoading &&
                        !couponTriggered ? (
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
                    <CustomTooltip
                      tip={textCopied ? "Code copied" : "Copy code"}
                      width={"100px"}
                    >
                      <div
                        className="coupon-code cursor-pointer"
                        onClick={() => handleCopyToClipboard("SHADES500")}
                      >
                        SHADES500
                      </div>
                    </CustomTooltip>
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
              <div className="d-flex align-items-center gap-2">
                <div>Shipping</div>
                {checkoutDetails?.discounted_delivery_charge === 0 && (
                  <CustomTooltip
                    tip={"Shipping is free for orders over ₹500!"}
                    width={"160px"}
                  >
                    <div className="primary-color font-size-2-h d-flex align-items-center justify-content-center">
                      <AiOutlineQuestionCircle />
                    </div>
                  </CustomTooltip>
                )}
              </div>
              <div className="d-flex align-items-center gap-1">
                {checkoutDetails?.discounted_delivery_charge === 0 && (
                  <div style={{ color: "#00d100" }}>(Free)</div>
                )}
                <div
                  style={{
                    textDecoration:
                      checkoutDetails?.discounted_delivery_charge === 0
                        ? "line-through"
                        : "",
                  }}
                >
                  ₹{checkoutDetails?.shipping_charge}
                </div>
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
            <button className="checkout-button d-flex align-items-center gap-2 justify-content-center" onClick={() => navigate(BILLING_ADDRESS_PAGE)}>
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
