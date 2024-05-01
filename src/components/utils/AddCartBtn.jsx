import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import Loader from "react-js-loader";

const AddCartBtn = ({
  width,
  backgroundColor,
  borderRadius,
  loading,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  const [moveAnim, setMoveAnim] = useState(false);

  const cartClick = (e) => {
    setClicked(true);
    onClick && onClick(e);
  };

  useEffect(() => {
    if (loading) {
      setMoveAnim(false);
    } else if (clicked) {
      setMoveAnim(true);
      setTimeout(() => {
        setMoveAnim(false);
        setClicked(false);
      }, 3000);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="add-cart-btn-loading">
        <button
          className="d-flex align-items-center"
          disabled={true}
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#131d39",
            borderRadius: borderRadius ? borderRadius : "50px",
          }}
        >
          <div className={"item ratings-loader"}>
            <Loader
              type="spinner-cub"
              bgColor={"#fff"}
              color={"#fff"}
              size={25}
            />
          </div>
          <div>Please Wait...</div>
        </button>
      </div>
    );
  }

  return (
    <div className="add-cart-btn">
      <button
        className={`cart-button ${moveAnim ? "clicked" : ""}`}
        onClick={cartClick}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "#131d39",
          borderRadius: borderRadius ? borderRadius : "50px",
          width: width ? width : "170px",
        }}
      >
        <span className="add-to-cart">Add to cart</span>
        <span className="added">Item Added</span>
        <FaShoppingCart className="fas fa-shopping-cart" />
        <FaBox className="fas fa-box" />
      </button>
    </div>
  );
};

export default AddCartBtn;
