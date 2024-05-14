import React, { useEffect } from "react";
import NestedCartPage from "./layouts/NestedCartPage";
import {
  getCart,
  getTemporaryCart,
} from "../../../../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { HOME_PAGE } from "../../../../helpers/route-paths/paths";
import { getQueryParam } from "../../../../helpers/search-query-params/getQueryParams";

const Cart = () => {
  const cart_proceed = getQueryParam("proceed");
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

  const documentDimensions = () => {
    return window.innerWidth;
  };

  window.addEventListener("resize", documentDimensions);

  useEffect(() => {
    if (!cart_proceed && documentDimensions() < 849) {
      window.location.replace(`${HOME_PAGE}?cart-active=true`);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [cart_proceed]);
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
