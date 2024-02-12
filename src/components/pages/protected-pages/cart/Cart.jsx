import React, { useEffect } from "react";
import NestedCartPage from "./layouts/NestedCartPage";

const Cart = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="cart">
      <div className="container-fluid">
        <NestedCartPage />
      </div>
    </div>
  );
};

export default Cart;
