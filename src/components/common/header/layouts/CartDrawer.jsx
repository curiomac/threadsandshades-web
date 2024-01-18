import React, { useState } from "react";

const CartDrawer = () => {

  return (
    <div className="cart-bar">
      <div className="container-fluid-padding">
        <div className="d-flex align-items-center gap-2 mt-2 mb-2">
          <div className="font-weight-1 cart-title">Cart Items</div>
        </div>
        <div className="custom-hr"></div>
      </div>
    </div>
  );
};

export default CartDrawer;
