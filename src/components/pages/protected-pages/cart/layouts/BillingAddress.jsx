import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";

const BillingAddress = () => {
  const dispatch = useDispatch()
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger])
  return (
    <div
      className={`cart-items ${proceed === "true" ? "hide-cart-items" : "show-cart-items"
        }`}
    >
      <div className="billing-address-container">
        <div className="billing-address">
          <div className="billing-address-content">
            <div className="billing-address-heading">Billing Address</div>
            <div className="billing-inputs">
              <div className="d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">First Name</div>
                  <input />
                  <div className="input-msg"></div>
                </div>
                <div className="w-fill">
                  <div className="label">Last Name</div>
                  <input />
                  <div className="input-msg"></div>
                </div>
              </div>
              <div>
                <div className="label">Email (Optional)</div>
                <input />
                <div className="input-msg"></div>
              </div>
              <div>
                <div className="label">Address</div>
                <input />
                <div className="input-msg"></div>
              </div>
              <div>
                <div className="label">Alternate Address (Optional)</div>
                <input />
                <div className="input-msg"></div>
              </div>
              <div className="d-flex align-items-center gap-3 w-fill">
                <div className="w-fill">
                  <div className="label">State</div>
                  <input />
                  <div className="input-msg"></div>
                </div>
                <div className="w-fill">
                  <div className="label">Postal Code</div>
                  <input />
                  <div className="input-msg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="payment-content">
            <div className="payment-heading">Payment</div>
            <div className="payment-types">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled/>
                  <div className="payment-type">Credit Card</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled/>
                  <div className="payment-type">Debit Card</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" checked='true'/>
                  <div className="payment-type">UPI</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" disabled/>
                  <div className="payment-type">Pay on Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BillingAddress;
