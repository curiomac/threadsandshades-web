import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CheckoutBox from "./CheckoutBox";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { proceedTrigger } from "../../../../../redux/slices/resCartSlice";

const NestedCartPage = () => {
  const trigger = getQueryParam("proceed");
  const { proceed } = useSelector((state) => state.resCartState);
  const dispatch = useDispatch();
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
          }`}
        >
          <Outlet />
        </div>
        <div
          className={`${
            proceed === true || proceed === "true" ? "w-fill" : "w-none"
          }`}
        >
          <CheckoutBox />
        </div>
      </div>
    </div>
  );
};

export default NestedCartPage;
