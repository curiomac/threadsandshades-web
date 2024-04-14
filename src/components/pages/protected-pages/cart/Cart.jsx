import React, { useEffect } from "react";
import NestedCartPage from "./layouts/NestedCartPage";
import {
  getCart,
  getTemporaryCart,
} from "../../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const handleGetTemporaryCartItems = () => {
    const cartLocalStorageItem =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    const payload = {
      cart_details: cartLocalStorageItem,
    };
    dispatch(getTemporaryCart(payload));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      handleGetTemporaryCartItems();
    }
  }, [dispatch]);
  return (
    <div className="cart">
      <div className="container-fluid">
        <NestedCartPage />
      </div>
    </div>
  );
};

export default Cart;
