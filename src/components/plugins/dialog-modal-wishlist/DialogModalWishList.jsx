import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";

const DialogModalWishList = ({ isOpen, onClose }) => {
  const { wishListItems } = useSelector((state) => state.wishListState);
  if (!isOpen) {
    return null;
  }
  console.log(wishListItems);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-wish-list"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="content container-fluid-padding">
            <div className="close-icon-container">
              <div className="close-icon" onClick={onClose}>
                <IoClose />
              </div>
            </div>
            <div>
              <div className="wish-list-heading">MY WISHLIST</div>
              <input
                className="search-input"
                placeholder="Search for product"
              />
              <div className="wish-list-container">
                {wishListItems?.map((wishList) => {
                  return (
                    <div className="wish-list">
                      <div>
                        <img
                          className="wish-list-image"
                          src={wishList?.images[0].image}
                          alt={wishList._id}
                        />
                      </div>
                      <div>
                        <div className="title">{wishList?.title}</div>
                        <div className="price">₹{wishList?.price}</div>
                        <div className="product-features">
                          <div className="color-container">
                            <div className="color-heading">Color:</div>
                            <div className="color-code">Black</div>
                          </div>
                          <div className="size-container">
                            <div className="size-heading">Size:</div>
                            <div className="size-code">L</div>
                          </div>
                        </div>
                        <div className="add-to-cart-container">
                          <button className="add-to-cart-btn d-flex align-items-center justify-content-center gap-3">
                            <div>
                              <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                            </div>
                            <div>Add To Cart</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModalWishList;
