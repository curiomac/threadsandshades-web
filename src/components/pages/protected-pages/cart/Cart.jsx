import React, { useEffect } from "react";
import NestedCartPage from "./layouts/NestedCartPage";
import { getCart } from "../../../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const payload = {
      user_id: "65a7eef1a7e2b0eda9f545e8",
    }
    dispatch(getCart(payload));
    console.log('Working: as expected');
  }, [dispatch])
  return (
    <div className="cart">
      <div className="container-fluid">
        <NestedCartPage />
      </div>
    </div>
  );
};

export default Cart;
