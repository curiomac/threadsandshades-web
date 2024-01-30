import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { addCart } from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { moveWishList } from "../../../../../redux/actions/wishListAction";

const CollectionsList = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productsState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const [selectedProductId, setSelectedProductId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
    };
    dispatch(addCart(payload));
  };
  const handleMoveToWishList = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: "default",
    };
    dispatch(moveWishList(payload));
  };
  return (
    <div className="collection-list">
      <div>
        <div className="container-fluid">
          <div className="font-size-3 text-align-center mt-3 mb-3">
            MEN'S COLLECTION
          </div>
          <div className="products-grid">
            {products?.map((product) => {
              return (
                <div
                  className="product"
                  onClick={() => {
                    setSelectedProductId(product._id);
                    navigate(
                      `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                    );
                  }}
                >
                  <img src={product?.images[0]?.image} alt="image_1" />
                  <div className="container-fluid-padding base-container">
                    <div className="add-to-fav-icon-container">
                      <div
                        className="add-to-fav-icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (wishListLoading) {
                            return;
                          } else {
                            handleMoveToWishList(product);
                          }
                        }}
                      >
                        {wishListItems?.some(
                          (cartProduct) => cartProduct?._id === product?._id
                        ) ? (
                          <FaHeart className="primary-color" />
                        ) : (
                          <FaRegHeart
                            className={wishListLoading && "primary-color"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="add-to-cart-container">
                      <button
                        className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                          (cartItems?.some(
                            (cartProduct) => cartProduct?._id === product?._id
                          ) ||
                            (cartLoading &&
                              selectedProductId === product._id)) &&
                          "disabled"
                        }`}
                        onClick={() => {
                          if (
                            cartItems?.some(
                              (cartProduct) => cartProduct?._id === product?._id
                            ) ||
                            cartLoading
                          ) {
                            return;
                          } else {
                            handleAddToCart(product);
                          }
                        }}
                      >
                        {cartLoading && selectedProductId === product._id ? (
                          <div>
                            <SpinnerLoader />
                          </div>
                        ) : (
                          <div>
                            {cartItems?.some(
                              (cartProduct) => cartProduct?._id === product?._id
                            ) ? (
                              <TiTick className="font-size-3 d-flex align-items-center" />
                            ) : (
                              <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                            )}
                          </div>
                        )}
                        <div>
                          {cartItems?.some(
                            (cartProduct) => cartProduct?._id === product?._id
                          )
                            ? "Item added to Cart"
                            : cartLoading && selectedProductId === product._id
                            ? "Adding to Cart"
                            : "Add To Cart"}
                        </div>
                      </button>
                    </div>
                    <div
                      className="product-title"
                      onClick={() =>
                        navigate(
                          `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                        )
                      }
                    >
                      {product.title}
                    </div>
                    <div className="d-flex align-items-center font-weight-1">
                      {/* <div>
                      <BsCurrencyRupee className="d-flex align-items-center"/>
                    </div> */}
                      <div className="d-flex align-items-center gap-2 mt-1 mb-1">
                        {product?.offerPrice && (
                          <span className="price">₹ {product.offerPrice}</span>
                        )}
                        <span
                          className={`${
                            product?.offerPrice && "offered"
                          } price`}
                        >
                          ₹ {product.price}
                        </span>{" "}
                        {product?.offerPrice && (
                          <span className="discount price">
                            ({product.discount}% offer)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="avail-colors-container">
                    {product?.availableColors?.map((color) => {
                      return (
                        <div
                          className="avail-color"
                          style={{
                            backgroundColor: color,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;
