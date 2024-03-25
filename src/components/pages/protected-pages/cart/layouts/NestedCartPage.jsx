import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CheckoutBox from "./CheckoutBox";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";
import TestCheckoutBox from "./TestCheckoutBox";

const NestedCartPage = () => {
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  const { cartItems, loading: cartItemsLoading } = useSelector(
    (state) => state.cartState
  );
  const dispatch = useDispatch();
  const [triggerPlaceOrderBoolean, setTriggerPlaceOrder] = useState(false);
  const triggerPlaceOrder = (propBoolean) => {
    setTriggerPlaceOrder(propBoolean);
  };
  useEffect(() => {
    if (triggerPlaceOrder) {
      setTimeout(() => {
        setTriggerPlaceOrder(false);
      }, 100);
    }
  }, [triggerPlaceOrderBoolean]);
  useEffect(() => {
    dispatch(proceedTrigger(trigger));
  }, [trigger]);
  return (
    <div className="nested-cart-page">
      <div className="d-flex content">
        <div
          className={`outlet ${
            proceed === true || proceed === "true"
              ? "hide-outlet"
              : "show-outlet"
          } ${cartItems?.length === 0 && "max-w-full min-w-full"}`}
        >
          <Outlet context={[triggerPlaceOrderBoolean]} />
        </div>
        <div
          className={`${
            cartItems?.length === 0
              ? "d-none"
              : proceed === true || proceed === "true"
              ? "w-fill"
              : "w-none"
          }`}
        >
          {/* <CheckoutBox triggerPlaceOrder={triggerPlaceOrder} /> */}
          <TestCheckoutBox triggerPlaceOrder={triggerPlaceOrder} />
        </div>
      </div>
    </div>
  );
};

export default NestedCartPage;
