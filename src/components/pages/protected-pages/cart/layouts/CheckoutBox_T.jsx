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
import { useLocation, useNavigate } from "react-router-dom";
import {
  BILLING_ADDRESS_PAGE,
  CART_ITEMS_PAGE,
} from "../../../../../helpers/route-paths/paths";
import { BsBoxSeamFill } from "react-icons/bs";
import { postalAddressClear } from "../../../../../redux/slices/addressSlice";
import { FaPlus } from "react-icons/fa6";
import { BsShieldLock } from "react-icons/bs";
import { PhonePeIc } from "../../../../../assets/icons/PhonePeIc";
import { PayPalIc } from "../../../../../assets/icons/PayPalIc";
import SupportBanner from "../../../default-pages/home/layouts/SupportBanner";
import { PiCurrencyInrBold } from "react-icons/pi";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";

const TestCheckoutBox = ({ triggerPlaceOrder }) => {
  const navigate = useNavigate();
  const [couponValue, setCouponValue] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [couponTriggered, setCouponTriggered] = useState(false);
  const [checkoutDetailsValue, setCheckoutDetailsValue] = useState({});
  const [deliveryNotesInput, setDeliveryNotesInput] = useState(false);
  const trigger = getQueryParam("proceed");
  const location = useLocation();
  const { proceed } = useSelector((state) => state.resCartState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
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
      user_id: user?._id,
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    setCouponTriggered(false);
    const payload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(proceedTrigger(trigger));
    dispatch(getCheckoutDetails(payload));
  }, [trigger]);
  useEffect(() => {
    setCheckoutDetailsValue(checkoutDetails);
  }, [checkoutDetails]);
  console.log("checkoutDetailsValue: ", checkoutDetailsValue);
  return (
    <div
      className={`checkout-box ${
        proceed === true || proceed === "true"
          ? "show-checkout-box"
          : "hide-checkout-box"
      }`}
    >
      <div className="checkout-box-container">
        <div className="heading">
          <div>Summary</div>
          <div className="summary-custom-hr" />
        </div>
        {location.pathname === BILLING_ADDRESS_PAGE && (
          <div className="checkout-cart-items">
            {cartItems?.map((cartItem) => {
              console.log("cartItem:", cartItem);
              return (
                <div className="checkout-cart-item">
                  <div className="d-flex gap-3">
                    <div className="img-box">
                      <div className="item-qty-container">
                        <div className="item-qty">
                          {
                            cartItem?.selected_product_details
                              ?.selected_quantity
                          }
                        </div>
                      </div>
                      <img
                        src={
                          cartItem?.product?.product_images?.length > 0 &&
                          cartItem?.product?.product_images[0]
                        }
                        alt={cartItem?.product?._id}
                      />
                    </div>
                    <div className="item-info">
                      <div className="item-title">
                        {cartItem?.product?.product_title}
                      </div>
                      <div className="item-features">
                        <div className="item-size">
                          {cartItem?.selected_product_details?.selected_size}
                        </div>
                        <div className="custom-vr" />
                        <div
                          className="item-target-color"
                          style={{
                            background:
                              cartItem?.selected_product_details
                                ?.selected_color_code,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center price">
                    <div className="d-flex align-items-center">
                      <PiCurrencyInrBold />
                    </div>
                    <div>
                      {getCurrencyFormat(cartItem?.product?.fixed_price)}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="sec-custom-hr" />
          </div>
        )}
        <div className="shipping-info">
          <div className="d-flex align-items-center justify-content-space-between">
            <div className="key">Product Total (2)</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <PiCurrencyInrBold />
              </div>
              <div>{getCurrencyFormat(checkoutDetailsValue?.total_mrp)}</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Shipping To</div>
            <div className="value">India</div>
          </div>
          <div className="sec-custom-hr" />
        </div>
        <div className="price-info">
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Delivery Charges</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <PiCurrencyInrBold />
              </div>
              <div>
                {getCurrencyFormat(
                  checkoutDetailsValue?.discounted_delivery_charge
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">GST 18%</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <PiCurrencyInrBold />
              </div>
              <div>
                {getCurrencyFormat(
                  (18 / 100) * checkoutDetailsValue?.cart_total
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">
              Coupon Applied(
              {getCurrencyFormat(checkoutDetailsValue?.coupon_discount)})
            </div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                - <PiCurrencyInrBold />
              </div>
              <div>
                {getCurrencyFormat(checkoutDetailsValue?.coupon_discount)}
              </div>
            </div>
          </div>
          {/* <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Total</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <PiCurrencyInrBold />
              </div>
              <div>{checkoutDetailsValue?.cart_total +
                  (18 / 100) * checkoutDetailsValue?.cart_total}.00</div>
            </div>
          </div> */}
          <div className="sec-custom-hr" />
        </div>
        <div className="order-total">
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Order Total</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <PiCurrencyInrBold />
              </div>
              {/* <div>{checkoutDetailsValue?.total_mrp}.00</div> */}
              <div>
                {getCurrencyFormat(
                  checkoutDetailsValue?.cart_total +
                    (18 / 100) * checkoutDetailsValue?.cart_total
                )}
              </div>
            </div>
          </div>
        </div>
        {location.pathname === CART_ITEMS_PAGE && (
          <div>
            <div className="delivery-notes">
              {deliveryNotesInput ? (
                <div>
                  <textarea />
                </div>
              ) : (
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setDeliveryNotesInput(true)}
                >
                  <div className="d-flex align-items-center plus-ic">
                    <FaPlus />
                  </div>
                  <div>Click here to add delivery notes</div>
                </div>
              )}
            </div>
            <div className="apply-coupon">
              <div className="d-flex align-items-center gap-1">
                <div className="d-flex align-items-center">
                  <BiSolidCoupon className="coupon-ic" />
                </div>
                <div>Apply Coupon</div>
              </div>
              <div className="d-flex align-items-center justify-content-space-between gap-2 mt-1">
                <div className="input-container w-fill">
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="cursor-pointer font-family-poppins"
                    onClick={() => {
                      if (couponValue) {
                        handleApplyCoupon();
                      }
                    }}
                    disabled={
                      !couponValue ||
                      (checkoutDetailsLoading && couponTriggered)
                        ? true
                        : false
                    }
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
            </div>
          </div>
        )}
        <div className="checkout-button">
          <button
            className="d-flex align-items-center gap-2 justify-content-center cursor-pointer"
            onClick={() => {
              navigate(BILLING_ADDRESS_PAGE);
              if (location.pathname === CART_ITEMS_PAGE) {
                dispatch(postalAddressClear());
              }
              if (location.pathname === BILLING_ADDRESS_PAGE) {
                triggerPlaceOrder(true);
              }
            }}
          >
            <div>
              {location.pathname === BILLING_ADDRESS_PAGE ? (
                <BsBoxSeamFill className="font-size-3 d-flex align-items-center" />
              ) : (
                <MdShoppingCartCheckout className="font-size-3 d-flex align-items-center" />
              )}
            </div>
            <div>
              {location.pathname === BILLING_ADDRESS_PAGE
                ? "PLACE ORDER"
                : "CHECKOUT"}
            </div>
          </button>
          <div className="payment-secure">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center">
                <BsShieldLock className="lock-ic" />
              </div>
              <div>Payment are processed securely</div>
            </div>
          </div>
          <div className="sec-end-custom-hr" />
        </div>
        <div className="pay-using">
          <div>Pay Using</div>
          <div className="d-flex align-items-center gap-4">
            <div className="method">
              <PhonePeIc height={40} width={60} />
            </div>
            <div className="method">
              <PayPalIc height={40} width={60} />
            </div>
          </div>
        </div>
        <div className="support-banner-container">
          <div className="bg">
            <div className="heading">Efficient shipping made easy</div>
            <SupportBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCheckoutBox;
