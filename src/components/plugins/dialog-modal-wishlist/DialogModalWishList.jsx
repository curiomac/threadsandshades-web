import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/productsAction";
import { moveWishList } from "../../../redux/actions/wishListAction";
import SpinnerLoader from "../loaders/spinner-loader/SpinnerLoader";
import { addCart } from "../../../redux/actions/cartAction";
import { useLocation, useNavigate } from "react-router-dom";

const DialogModalWishList = ({ isOpen, onClose }) => {
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const {pathname} = useLocation();
  const navigate = useNavigate()
  const [selectedWishListProductId, setSelectedWishListProductId] =
    useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1
    };
    dispatch(addCart(payload));
  };
  const handleReMoveFromWishList = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: "default",
    };
    dispatch(moveWishList(payload));
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-wish-list"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="content container-fluid-padding">
            <div className="close-icon-container">
              <div className="close-icon" onClick={() => {
                onClose()
                navigate(`${pathname}?wishlist=false`)
                }}>
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
                    <div
                      className="wish-list"
                      onClick={() => setSelectedWishListProductId(wishList._id)}
                    >
                      <div>
                        <img
                          className="wish-list-image"
                          src={wishList?.product_images[0]}
                          alt={wishList._id}
                        />
                      </div>
                      <div>
                        <div className="title">{wishList?.product_title}</div>
                        <div className="price">₹{wishList?.sale_price}</div>
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
                        <div className="add-to-cart-container-wishlist">
                          <button
                            className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                              (cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?._id === wishList?._id
                              ) ||
                                (cartLoading &&
                                  selectedWishListProductId ===
                                    wishList._id)) &&
                              "disabled"
                            }`}
                            onClick={() => {
                              if (
                                cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?._id === wishList?._id
                                ) ||
                                cartLoading
                              ) {
                                return;
                              } else {
                                handleAddToCart(wishList);
                              }
                            }}
                          >
                            {cartLoading &&
                            selectedWishListProductId === wishList._id ? (
                              <div>
                                <SpinnerLoader />
                              </div>
                            ) : (
                              <div>
                                {cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?._id === wishList?._id
                                ) ? (
                                  <TiTick className="font-size-3 d-flex align-items-center" />
                                ) : (
                                  <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                                )}
                              </div>
                            )}
                            <div>
                              {cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?._id === wishList?._id
                              )
                                ? "Item added to Cart"
                                : cartLoading &&
                                  selectedWishListProductId === wishList._id
                                ? "Adding to Cart"
                                : "Add To Cart"}
                            </div>
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => {
                              if (
                                wishListLoading &&
                                selectedWishListProductId === wishList._id
                              )
                                return;
                              else {
                                handleReMoveFromWishList(wishList);
                              }
                            }}
                          >
                            {wishListLoading &&
                            selectedWishListProductId === wishList._id ? (
                              <SpinnerLoader />
                            ) : (
                              "Remove"
                            )}
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
