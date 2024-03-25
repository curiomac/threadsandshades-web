import React, { useEffect, useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { IoIosArrowForward, IoIosWallet } from "react-icons/io";
import { MdCurrencyRupee, MdShoppingCartCheckout } from "react-icons/md";
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

const TestCheckoutBox = ({ triggerPlaceOrder }) => {
  const navigate = useNavigate();
  const [couponValue, setCouponValue] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [couponTriggered, setCouponTriggered] = useState(false);
  const [checkoutDetailsValue, setCheckoutDetailsValue] = useState({});
  const trigger = getQueryParam("proceed");
  const location = useLocation();
  const { proceed } = useSelector((state) => state.resCartState);
  const { isAuthenticated } = useSelector((state) => state.authState);
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
        <div className="shipping-info">
          <div className="d-flex align-items-center justify-content-space-between">
            <div className="key">Product Total (2)</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <MdCurrencyRupee />
              </div>
              <div>{checkoutDetailsValue?.total_mrp}.00</div>
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
            <div className="key">Shipping Cost</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <MdCurrencyRupee />
              </div>
              <div>{checkoutDetailsValue?.discounted_delivery_charge}.00</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Total without GST</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <MdCurrencyRupee />
              </div>
              <div>
                {checkoutDetailsValue?.cart_total -
                  (18 / 100) * checkoutDetailsValue?.cart_total}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Including GST 18%</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <MdCurrencyRupee />
              </div>
              <div>{checkoutDetailsValue?.cart_total}.00</div>
            </div>
          </div>
          <div className="sec-custom-hr" />
        </div>
        <div className="order-total">
          <div className="d-flex align-items-center justify-content-space-between mt-1">
            <div className="key">Order Total</div>
            <div className="value d-flex align-items-center">
              <div className="d-flex align-items-center">
                <MdCurrencyRupee />
              </div>
              <div>{checkoutDetailsValue?.total_mrp}.00</div>
            </div>
          </div>
        </div>
        <div className="delivery-notes">
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center plus-ic">
              <FaPlus />
            </div>
            <div>Click here to add delivery notes</div>
          </div>
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
              <div className="font-10 font-eight-1" style={{ color: "red" }}>
                *{checkoutDetailsError}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
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
            <div>
              <PhonePeIc height={40} width={60} />
            </div>
            <div>
              <PayPalIc height={40} width={60} />
            </div>
          </div>
        </div>
        <div className="support-banner-container">
          <div className="heading">Efficient shipping made easy</div>
          <SupportBanner />
        </div>
      </div>
    </div>
  );
};

export default TestCheckoutBox;
