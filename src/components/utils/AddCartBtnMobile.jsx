import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import Loader from "react-js-loader";
import TickIc from "../../assets/icons/TickIc";

const AddCartBtnMobile = ({
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
            backgroundColor: "gray",
            borderRadius: "100%",
            width: "45px"
          }}
        >
          <div className={"item ratings-loader"} style={{position: 'relative', right: '2px', bottom: '1px'}}>
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
    <div className="add-cart-btn-mobile">
      <button
        className={`cart-button ${moveAnim ? "clicked" : ""}`}
        onClick={cartClick}
        style={{
            backgroundColor: "transparent",
            borderRadius: "100%",
            width: "45px",
            border: "1px solid gray"
        }}
      >
        <span className="add-to-cart">
          <FaShoppingCart className="fas fa-shopping-cart" color="#000"/>
        </span>
        <span className="added"><TickIc  /></span>
        <FaShoppingCart className="fas fa-shopping-cart" color="#000"/>
        <FaBox className="fas fa-box" color="#000"/>
      </button>
    </div>
  );
};

export default AddCartBtnMobile;
