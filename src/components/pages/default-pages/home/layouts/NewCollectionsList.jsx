import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";
import { PiCurrencyInrBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import {
  addCart,
  getTemporaryCart,
} from "../../../../../redux/actions/cartAction";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiPercentBold } from "react-icons/pi";
import AddCartBtnMobile from "../../../../utils/AddCartBtnMobile";
import AddCartBtn from "../../../../utils/AddCartBtn";

import Loader from "react-js-loader";
import { useImageLoaded } from "../../../../utils/useImageLoaded";
import { clearProduct } from "../../../../../redux/slices/productSlice";
const NewCollectionsList = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productsState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  
  const [ref, loaded, onLoad] = useImageLoaded();
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const [selectedProductId, setSelectedProductId] = useState("");
  const [addingCart, setAddingCart] = useState(false);
  const [localStorageItems, setLocalStorageItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const dispatch = useDispatch();
  const handleSetRecentProductsLocal = (product) => {
    const localItems = JSON.parse(localStorage.getItem("lookups")) || [];
    if (localItems.length >= 1000) {
      if (localItems?.some((item) => item?._id === product?._id)) {
        const updateItems = localItems?.filter(
          (item) => item?._id !== product?._id
        );
        const indexRemoved = updateItems?.filter((item, index) => index !== 10);
        localStorage.setItem(
          "lookups",
          JSON.stringify([product, ...indexRemoved])
        );
      } else {
        const updateItems = localItems?.filter((item, index) => index !== 10);
        localStorage.setItem(
          "lookups",
          JSON.stringify([product, ...updateItems])
        );
      }
    } else if (localItems?.some((item) => item?._id === product?._id)) {
      const updateItems = localItems?.filter(
        (item) => item?._id !== product?._id
      );
      localStorage.setItem(
        "lookups",
        JSON.stringify([product, ...updateItems])
      );
    } else {
      localStorage.setItem("lookups", JSON.stringify([product, ...localItems]));
    }
  };
  useEffect(() => {
    dispatch(getProducts([], [], []));
  }, [dispatch]);
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
      is_from: "default"
    };
    if (isAuthenticated) {
      dispatch(addCart(payload));
    } else {
      const local_cart_items =
        JSON.parse(localStorage.getItem("cart-items")) || [];
      const localStoragePayload = {
        product_id: product._id,
        selected_product_details: {
          selected_color: product.target_color,
          selected_color_code: product.target_color_code,
          selected_size: product.available_sizes[0],
          selected_quantity: 1,
        },
      };
      const product_found = localStorageItems.find(
        (data) => data?.product_id === product._id
      );
      if (!product_found || localStorageItems?.length === 0) {
        localStorage.setItem(
          "cart-items",
          JSON.stringify([...local_cart_items, localStoragePayload])
        );
        setLocalStorageItems([...localStorageItems, localStoragePayload]);
        const payload = {
          cart_details: [...localStorageItems, localStoragePayload],
        };
        dispatch(getTemporaryCart(payload));
      }
    }
  };
  const handleMoveToWishList = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      is_from: "default",
    };
    dispatch(moveWishList(payload));
  };
  useEffect(() => {
    if (addingCart) {
      setTimeout(() => {
        setAddingCart(false);
      }, 3000);
    }
  }, [addingCart]);
  return (
    <div className="new-collections-list">
      <div className="container-fluid">
        <div className="collections-container">
          <div className="d-flex align-items-center justify-content-space-between">
            <div className="heading text-transform-uc font-weight-1">See what's new</div>
            <div className="link text-transform-uc text-decoration-underline font-14">Shop all</div>
          </div>
          <div className="list-grid">
            <div className="products products-grid">
              {products?.map((product, index) => {
                if (index === 0 || index === 1) {
                  return (
                    <div
                      className="producta"
                      onClick={() => {
                        setSelectedProductId(product._id);
                        dispatch(clearProduct());
                        navigate(
                          `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                        );
                        handleSetRecentProductsLocal(product);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {!loaded && (
                        <div style={{ height: "0" }}>
                          <div className="product-img-container d-flex align-items-center justify-content-center">
                            <Loader
                              type="spinner-cub"
                              bgColor={"#000"}
                              color={"#000"}
                              size={25}
                            />
                          </div>
                        </div>
                      )}
                      <div className="product-img-container">
                        <img
                          src={product?.product_images[0]}
                          alt="image_1"
                          ref={ref}
                          onLoad={onLoad}
                        />
                      </div>
                      <div className="container-fluid-padding base-container p-none">
                        {product?.is_discounted_product && (
                          <div className="discount-container">
                            <div className="discount">
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                              <div className="value">
                                {product?.discount_percentage}% Offer
                              </div>
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="add-to-fav-icon-container">
                          <div
                            className="add-to-fav-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              if (wishListLoading) {
                                return;
                              } else {
                                handleMoveToWishList(product);
                              }
                            }}
                          >
                            {wishListItems?.some(
                              (wishListProduct) =>
                                wishListProduct?._id === product?._id
                            ) ? (
                              <FaHeart className="primary-color" />
                            ) : (
                              <FaRegHeart
                                className={
                                  wishListLoading &&
                                  selectedProductId === product._id &&
                                  "primary-color"
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div className="add-to-cart-container">
                          {/* <button
                            className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                              ((cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) &&
                                addingCart) ||
                                (cartLoading &&
                                  selectedProductId === product._id &&
                                  addingCart)) &&
                              "disabled"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          >
                            {cartLoading &&
                            selectedProductId === product._id ? (
                              <div>
                                <SpinnerLoader />
                              </div>
                            ) : (
                              <div>
                                {cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?.product?._id === product?._id
                                ) && addingCart ? (
                                  <TiTick className="font-size-3 d-flex align-items-center" />
                                ) : (
                                  <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                                )}
                              </div>
                            )}
                            <div>
                              {cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) && addingCart
                                ? "Added to Cart"
                                : cartLoading &&
                                  selectedProductId === product._id
                                ? "Adding to Cart"
                                : "Add To Cart"}
                            </div>
                          </button> */}
                          <AddCartBtn
                            borderRadius={"0px"}
                            width="230px"
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                        <div
                          className="product-title"
                          onClick={() =>
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                            )
                          }
                        >
                          {product.product_title}
                        </div>
                        <div className="product-ratings d-flex align-items-center gap-2 mt-1">
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center gap-1">
                              <div className="d-flex align-items-center">
                                <IoIosStar
                                  color="#feaa02"
                                  className="d-flex align-items-center"
                                />
                              </div>
                              <div className="font-12 font-weight-1 rate">
                                {product?.ratings}
                              </div>
                            </div>
                          )}
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center dot-ic">
                              <GoDotFill size={10} />
                            </div>
                          )}
                          {}
                          <div className="font-12 sold">
                            {product.verified_purchase_users?.length} Items Sold
                          </div>
                        </div>
                        <div className="d-flex align-items-center font-weight-1 justify-content-space-between">
                          <div className="d-flex gap-1 mt-1 mb-1 price-container">
                            {product?.is_discounted_product && (
                              <div className="price">
                                <div className="d-flex align-items-center">
                                  <PiCurrencyInrBold />
                                </div>
                                <div>
                                  {getCurrencyFormat(product.fixed_price)}
                                </div>
                              </div>
                            )}
                            <div
                              className={`${
                                product?.is_discounted_product && "offered"
                              } price`}
                            >
                              <div className="d-flex align-items-center">
                                <PiCurrencyInrBold />
                              </div>
                              <div>{getCurrencyFormat(product.sale_price)}</div>
                            </div>
                            {/* {product?.is_discounted_product && (
                            <span className="discount price">
                              ({product.discount_percentage}% offer)
                            </span>
                          )} */}
                          </div>
                          <AddCartBtnMobile
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="avail-colors-container">
                      {product?.group?.map((product_group) => {
                        return (
                          <div
                            className="avail-color"
                            style={{
                              backgroundColor: product_group?.target_color_code,
                            }}
                          ></div>
                        );
                      })}
                    </div> */}
                    </div>
                  );
                }
              })}
            </div>
            <div className="products">
              <div className="poster-spreader">
                <div className="heading font-family-jersey-20">
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="ic-arrow-container">
                    <IoIosArrowBack />
                  </div>
                  <div className="ic-arrow-container">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
              {products?.map((product, index) => {
                if (index === 2) {
                  return (
                    <div
                      className="producta"
                      onClick={() => {
                        setSelectedProductId(product._id);
                        dispatch(clearProduct());
                        navigate(
                          `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                        );
                        handleSetRecentProductsLocal(product);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {!loaded && (
                        <div style={{ height: "0" }}>
                          <div className="product-img-container d-flex align-items-center justify-content-center">
                            <Loader
                              type="spinner-cub"
                              bgColor={"#000"}
                              color={"#000"}
                              size={25}
                            />
                          </div>
                        </div>
                      )}
                      <div className="product-img-container">
                        <img
                          src={product?.product_images[0]}
                          alt="image_1"
                          ref={ref}
                          onLoad={onLoad}
                        />
                      </div>
                      <div className="container-fluid-padding base-container p-none">
                        {product?.is_discounted_product && (
                          <div className="discount-container">
                            <div className="discount">
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                              <div className="value">
                                {product?.discount_percentage}% Offer
                              </div>
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="add-to-fav-icon-container">
                          <div
                            className="add-to-fav-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              if (wishListLoading) {
                                return;
                              } else {
                                handleMoveToWishList(product);
                              }
                            }}
                          >
                            {wishListItems?.some(
                              (wishListProduct) =>
                                wishListProduct?._id === product?._id
                            ) ? (
                              <FaHeart className="primary-color" />
                            ) : (
                              <FaRegHeart
                                className={
                                  wishListLoading &&
                                  selectedProductId === product._id &&
                                  "primary-color"
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div className="add-to-cart-container">
                          {/* <button
                            className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                              ((cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) &&
                                addingCart) ||
                                (cartLoading &&
                                  selectedProductId === product._id &&
                                  addingCart)) &&
                              "disabled"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          >
                            {cartLoading &&
                            selectedProductId === product._id ? (
                              <div>
                                <SpinnerLoader />
                              </div>
                            ) : (
                              <div>
                                {cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?.product?._id === product?._id
                                ) && addingCart ? (
                                  <TiTick className="font-size-3 d-flex align-items-center" />
                                ) : (
                                  <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                                )}
                              </div>
                            )}
                            <div>
                              {cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) && addingCart
                                ? "Added to Cart"
                                : cartLoading &&
                                  selectedProductId === product._id
                                ? "Adding to Cart"
                                : "Add To Cart"}
                            </div>
                          </button> */}
                          <AddCartBtn
                            borderRadius={"0px"}
                            width="230px"
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                        <div
                          className="product-title"
                          onClick={() =>
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                            )
                          }
                        >
                          {product.product_title}
                        </div>
                        <div className="product-ratings d-flex align-items-center gap-2 mt-1">
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center gap-1">
                              <div className="d-flex align-items-center">
                                <IoIosStar
                                  color="#feaa02"
                                  className="d-flex align-items-center"
                                />
                              </div>
                              <div className="font-12 font-weight-1 rate">
                                {product?.ratings}
                              </div>
                            </div>
                          )}
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center dot-ic">
                              <GoDotFill size={10} />
                            </div>
                          )}
                          {}
                          <div className="font-12 sold">
                            {product.verified_purchase_users?.length} Items Sold
                          </div>
                        </div>
                        <div className="d-flex align-items-center font-weight-1 justify-content-space-between">
                          <div className="d-flex gap-1 mt-1 mb-1 price-container">
                            {product?.is_discounted_product && (
                              <div className="price">
                                <div className="d-flex align-items-center">
                                  <PiCurrencyInrBold />
                                </div>
                                <div>
                                  {getCurrencyFormat(product.fixed_price)}
                                </div>
                              </div>
                            )}
                            <div
                              className={`${
                                product?.is_discounted_product && "offered"
                              } price`}
                            >
                              <div className="d-flex align-items-center">
                                <PiCurrencyInrBold />
                              </div>
                              <div>{getCurrencyFormat(product.sale_price)}</div>
                            </div>
                            {/* {product?.is_discounted_product && (
                            <span className="discount price">
                              ({product.discount_percentage}% offer)
                            </span>
                          )} */}
                          </div>
                          <AddCartBtnMobile
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="avail-colors-container">
                      {product?.group?.map((product_group) => {
                        return (
                          <div
                            className="avail-color"
                            style={{
                              backgroundColor: product_group?.target_color_code,
                            }}
                          ></div>
                        );
                      })}
                    </div> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="list-grid">
            <div className="products">
              <div className="poster-navigator">
                <div className="background-follow">
                  <div className="null-content"></div>
                </div>
                <div className="background-retard">
                  <div className="content">
                    <div className="ic-percent">
                      <PiPercentBold />
                    </div>
                    <div className="heading">
                      Discover your new favorite from our best collections
                    </div>
                    <div className="btn-container">
                      <button>
                        <div>Shop Collection</div>
                        <div className="arrow-ic">
                          <FaArrowRightLong />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="products products-grid">
              {products?.map((product, index) => {
                if (index === 3 || index === 4) {
                  return (
                    <div
                      className="producta"
                      onClick={() => {
                        setSelectedProductId(product._id);
                        dispatch(clearProduct());
                        navigate(
                          `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                        );
                        handleSetRecentProductsLocal(product);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {!loaded && (
                        <div style={{ height: "0" }}>
                          <div className="product-img-container d-flex align-items-center justify-content-center">
                            <Loader
                              type="spinner-cub"
                              bgColor={"#000"}
                              color={"#000"}
                              size={25}
                            />
                          </div>
                        </div>
                      )}
                      <div className="product-img-container">
                        <img
                          src={product?.product_images[0]}
                          alt="image_1"
                          ref={ref}
                          onLoad={onLoad}
                        />
                      </div>
                      <div className="container-fluid-padding base-container p-none">
                        {product?.is_discounted_product && (
                          <div className="discount-container">
                            <div className="discount">
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                              <div className="value">
                                {product?.discount_percentage}% Offer
                              </div>
                              <div
                                style={{
                                  height: "5px",
                                  width: "5px",
                                  background: "#fff",
                                  border: "1px solid gray",
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="add-to-fav-icon-container">
                          <div
                            className="add-to-fav-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              if (wishListLoading) {
                                return;
                              } else {
                                handleMoveToWishList(product);
                              }
                            }}
                          >
                            {wishListItems?.some(
                              (wishListProduct) =>
                                wishListProduct?._id === product?._id
                            ) ? (
                              <FaHeart className="primary-color" />
                            ) : (
                              <FaRegHeart
                                className={
                                  wishListLoading &&
                                  selectedProductId === product._id &&
                                  "primary-color"
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div className="add-to-cart-container">
                          {/* <button
                            className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                              ((cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) &&
                                addingCart) ||
                                (cartLoading &&
                                  selectedProductId === product._id &&
                                  addingCart)) &&
                              "disabled"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          >
                            {cartLoading &&
                            selectedProductId === product._id ? (
                              <div>
                                <SpinnerLoader />
                              </div>
                            ) : (
                              <div>
                                {cartItems?.some(
                                  (cartProduct) =>
                                    cartProduct?.product?._id === product?._id
                                ) && addingCart ? (
                                  <TiTick className="font-size-3 d-flex align-items-center" />
                                ) : (
                                  <TiShoppingCart className="font-size-3 d-flex align-items-center" />
                                )}
                              </div>
                            )}
                            <div>
                              {cartItems?.some(
                                (cartProduct) =>
                                  cartProduct?.product?._id === product?._id
                              ) && addingCart
                                ? "Added to Cart"
                                : cartLoading &&
                                  selectedProductId === product._id
                                ? "Adding to Cart"
                                : "Add To Cart"}
                            </div>
                          </button> */}
                          <AddCartBtn
                            borderRadius={"0px"}
                            width="230px"
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                        <div
                          className="product-title"
                          onClick={() =>
                            navigate(
                              `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                            )
                          }
                        >
                          {product.product_title}
                        </div>
                        <div className="product-ratings d-flex align-items-center gap-2 mt-1">
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center gap-1">
                              <div className="d-flex align-items-center">
                                <IoIosStar
                                  color="#feaa02"
                                  className="d-flex align-items-center"
                                />
                              </div>
                              <div className="font-12 font-weight-1 rate">
                                {product?.ratings}
                              </div>
                            </div>
                          )}
                          {Number(product?.ratings) !== 0 && (
                            <div className="d-flex align-items-center dot-ic">
                              <GoDotFill size={10} />
                            </div>
                          )}
                          {}
                          <div className="font-12 sold">
                            {product.verified_purchase_users?.length} Items Sold
                          </div>
                        </div>
                        <div className="d-flex align-items-center font-weight-1 justify-content-space-between">
                          <div className="d-flex gap-1 mt-1 mb-1 price-container">
                            {product?.is_discounted_product && (
                              <div className="price">
                                <div className="d-flex align-items-center">
                                  <PiCurrencyInrBold />
                                </div>
                                <div>
                                  {getCurrencyFormat(product.fixed_price)}
                                </div>
                              </div>
                            )}
                            <div
                              className={`${
                                product?.is_discounted_product && "offered"
                              } price`}
                            >
                              <div className="d-flex align-items-center">
                                <PiCurrencyInrBold />
                              </div>
                              <div>{getCurrencyFormat(product.sale_price)}</div>
                            </div>
                            {/* {product?.is_discounted_product && (
                            <span className="discount price">
                              ({product.discount_percentage}% offer)
                            </span>
                          )} */}
                          </div>
                          <AddCartBtnMobile
                            loading={
                              cartLoading && selectedProductId === product._id
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProductId(product._id);
                              handleAddToCart(product);
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="avail-colors-container">
                      {product?.group?.map((product_group) => {
                        return (
                          <div
                            className="avail-color"
                            style={{
                              backgroundColor: product_group?.target_color_code,
                            }}
                          ></div>
                        );
                      })}
                    </div> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollectionsList;
