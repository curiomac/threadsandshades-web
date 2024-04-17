import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbagFill } from "react-icons/bs";
import { getProducts } from "../../../../../redux/actions/productsAction";
import {
  addCart,
  getTemporaryCart,
} from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiCurrencyInrBold } from "react-icons/pi";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaShoppingBasket } from "react-icons/fa";

const TopSellingBanner = () => {
  /* Slider settings */
  let sliderSettings = {
    /* General settings */
    dots: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    centerPadding: "60px",
    /* Autoplay settings */
    // autoplay: true,
    // infinite: true,
    // pauseOnHover: true,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
    /* Responsive settings */
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productsState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const [selectedProductId, setSelectedProductId] = useState("");
  const [addingCart, setAddingCart] = useState(false);
  const [localStorageItems, setLocalStorageItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const dispatch = useDispatch();
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
    <div className="top-selling-banner">
      <div className="container-fluid">
        <div className="font-size-3 text-align-center mt-3 mb-3">
          TOP SELLING
        </div>
        <div className="products-grid-home d-unset">
          <Slider {...sliderSettings}>
            {products?.map((product, index) => {
              console.log("product: ", product);
              // if (index <= 3) {
              if (true) {
                return (
                  <div
                    className="product"
                    onClick={() => {
                      setSelectedProductId(product._id);
                      navigate(
                        `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?._id}`
                      );
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div className="product-img-container">
                      <img src={product?.product_images[0]} alt="image_1" />
                    </div>
                    <div className="container-fluid-padding base-container">
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
                        <button
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
                          {cartLoading && selectedProductId === product._id ? (
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
                        {product.product_title}
                      </div>
                      <div className="product-ratings d-flex align-items-center gap-2 mt-1">
                        <div className="d-flex align-items-center gap-1">
                          <div className="d-flex align-items-center">
                            <IoIosStar
                              color="#feaa02"
                              className="d-flex align-items-center"
                            />
                          </div>
                          <div className="font-12 font-weight-1 rate">4.5</div>
                        </div>
                        <div className="d-flex align-items-center dot-ic">
                          <GoDotFill size={10} />
                        </div>
                        <div className="font-12 sold">125 Items Sold</div>
                      </div>
                      <div className="d-flex align-items-center font-weight-1 justify-content-space-between">
                        <div className="d-flex gap-1 mt-1 mb-1 price-container">
                          {product?.is_discounted_product && (
                            <div className="price">
                              <div className="d-flex align-items-center">
                                <PiCurrencyInrBold />
                              </div>
                              <div>
                                {getCurrencyFormat(
                                  product.sale_price - product.discount_price
                                )}
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
                          </div>{" "}
                          {/* {product?.is_discounted_product && (
                            <span className="discount price">
                              ({product.discount_percentage}% offer)
                            </span>
                          )} */}
                        </div>
                        <div
                          className="bag-ic"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductId(product._id);
                            handleAddToCart(product);
                          }}
                        >
                          <FaShoppingBasket className="ic" />
                        </div>
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
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopSellingBanner;
