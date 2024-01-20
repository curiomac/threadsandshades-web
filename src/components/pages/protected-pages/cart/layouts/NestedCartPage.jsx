import React from "react";
import { Outlet } from "react-router-dom";
import CheckoutBox from "./CheckoutBox";

const NestedCartPage = () => {
  return (
    <div className="nested-cart-page">
      <div className="d-flex content">
        <div className="outlet">
          <Outlet />
        </div>
        <div>
          <CheckoutBox />
        </div>
      </div>
    </div>
  );
};

export default NestedCartPage;
