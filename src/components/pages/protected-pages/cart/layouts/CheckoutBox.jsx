import React, { useEffect, useState } from "react";
import { BiDollar, BiSolidCoupon } from "react-icons/bi";
import { IoIosArrowForward, IoIosWallet } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";

const CheckoutBox = () => {
  const [couponValue, setCouponValue] = useState("");
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  return (
    <div
      className={`checkout-box ${
        (proceed === true  || proceed === 'true') ? "show-checkout-box" : "hide-checkout-box"
      }`}
    >
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
                  <button className="cursor-pointer font-family-poppins">
                    Apply
                  </button>
                </div>
              </div>
              <div className="custom-hr mt-2 mb-2"></div>
              <div className="offer-container">
                <div className="offer-heading">
                  Flat ₹100 off on orders above ₹999 -
                </div>
                <div className="coupon-code">SHADES100</div>
              </div>
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
            <div>₹1999</div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
            <div>Shades Discount</div>
            <div>- ₹1200</div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
            <div>Shipping</div>
            <div className="d-flex align-items-center gap-1">
              <div>₹49</div>
              <div>Free</div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-space-between mt-2 mb-2">
            <div>Cart Total</div>
            <div>₹799</div>
          </div>
        </div>
        <div className="amount-box">
          <div className="heading d-flex align-items-center justify-content-space-between">
            <div>Total Amount</div>
            <div>₹799</div>
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
    </div>
  );
};

export default CheckoutBox;