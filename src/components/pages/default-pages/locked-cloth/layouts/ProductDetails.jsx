import React, { useEffect, useState } from "react";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { RxSlash } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../../../redux/actions/productAction";
import {
  CART_ITEMS_PAGE,
  COLLECTIONS_PAGE,
  LOCKED_CLOTH_PAGE,
} from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { getProducts } from "../../../../../redux/actions/productsAction";
import {
  addCart,
  getTemporaryCart,
} from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import BackdropLoader from "../../../../plugins/loaders/backdrop-loader/BackdropLoader";
import { clearProduct } from "../../../../../redux/slices/productSlice";
import { IoIosClose } from "react-icons/io";
import CustomModal from "../../../../plugins/custom-modal/CustomModal";
import { GrClose } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { PiCurrencyInrBold } from "react-icons/pi";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";
import { GoDotFill } from "react-icons/go";
import ProductInfo from "./ProductInfo";
import ProductRatings from "./ProductRatings";
import {
  createRating,
  getRatings,
} from "../../../../../redux/actions/ratingsAction";
import ToastMessage from "../../../../plugins/toast-msg/ToastMessage";
import { clearRatingsError } from "../../../../../redux/slices/ratingsSlice";
import Loader from "react-js-loader";
import ProductDeliveryBanner from "./ProductDeliveryBanner";
import SliderProducts from "./SliderProducts";
import ProductReviews from "./ProductReviews";
import DomRender from "../../../../plugins/cmac-plugins/dom-render/DomRender";
const ProductDetails = ({ productId }) => {
  const productType = getQueryParam("type");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    product,
    products_group,
    loading: productLoading,
  } = useSelector((state) => state.productState);
  const { products } = useSelector((state) => state.productsState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const {
    ratings,
    status,
    message,
    loading: ratingLoading,
  } = useSelector((state) => state.ratingsState);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [productData, setProductData] = useState({});
  const [productGroupData, setProductGroupData] = useState({});
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [targetProductSize, setTargetProductSize] = useState("");
  const [targetProductQuantity, setTargetProductQuantity] = useState("");
  const [ratingsModalOpen, setRatingsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const [toastMessageValue, setToastMessageValue] = useState(null);
  /* Ratings Variables */

  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [productReview, setProductReview] = useState("");
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false);
  const [productRecommend, setProductRecommend] = useState(null);

  const [localStorageRecentProducts, setLocalStorageRecentProducts] = useState(
    []
  );

  const getRatingsStat = () => {
    if (rating === 1) {
      return (
        <div className="d-flex align-items-center gap-1">
          <div className="font-size-2-h">😠</div>
          <div>Bad</div>
        </div>
      );
    } else if (rating === 2) {
      return (
        <div className="d-flex align-items-center gap-1">
          <div className="font-size-2-h">🤨</div>
          <div>Not Bad</div>
        </div>
      );
    } else if (rating === 3) {
      return (
        <div className="d-flex align-items-center gap-1">
          <div className="font-size-2-h">😐</div>
          <div>Okay</div>
        </div>
      );
    } else if (rating === 4) {
      return (
        <div className="d-flex align-items-center gap-1">
          <div className="font-size-2-h">🙂</div>
          <div>Good</div>
        </div>
      );
    } else if (rating === 5) {
      return (
        <div className="d-flex align-items-center gap-1">
          <div className="font-size-2-h">😁</div>
          <div>Excellent</div>
        </div>
      );
    }
  };

  const [localStorageItems, setLocalStorageItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const [targetProductCustomQuantity, setTargetProductCustomQuantity] =
    useState(1);

  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <IoIosStar key={index} className="d-flex align-items-center" />
  ));

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  const handleProductImage = (index) => {
    setProductIndex(index);
  };
  const remainingStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, index) => <IoIosStarOutline key={index} />
  );
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product?._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: targetProductSize,
      selected_quantity:
        targetProductQuantity === "Custom"
          ? targetProductCustomQuantity
          : targetProductQuantity,
      is_from: "default",
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
  const handleSubmitReview = () => {
    const payload = {
      user_id: user._id,
      product_id: product._id,
      rating_value: rating,
      review_title: reviewTitle,
      product_review: productReview,
      product_recommend: productRecommend ? "YES" : "NO",
    };
    setToastMsg(true);
    console.log("payload,ds", payload);
    if (!toastMsg) {
      dispatch(createRating(payload));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("lookups")) || [];
    setLocalStorageRecentProducts(localProducts);
  }, [products, product]);
  useEffect(() => {
    dispatch(getProducts([], [], []));
  }, [dispatch]);
  useEffect(() => {
    if (product && products_group) {
      setProductData(product);
      setProductGroupData(products_group);
      if (product?.available_sizes?.length > 0) {
        setTargetProductSize(product?.available_sizes[0]);
      }
      setTargetProductQuantity(1);
    }
    console.log(
      "Datat: ",
      product?.verified_purchase_users?.some(
        (verified_user) => verified_user.user_id === user._id
      )
    );
    if (
      isAuthenticated &&
      product?.verified_purchase_users?.some(
        (verified_user) => verified_user.user_id === user._id
      )
    ) {
      setRatingsModalOpen(true);
    }
  }, [product, products_group]);
  useEffect(() => {
    switch (status) {
      case "success": {
        setToastMessageValue(message);
        setToastMsg(true);
        setTimeout(() => {
          dispatch(clearRatingsError());
          setToastMsg(false);
          if (message) {
            setRatingsModalOpen(false);
          }
        }, 5000);
        break;
      }
      case "error": {
        setToastMessageValue(message);
        setToastMsg(true);
        setTimeout(() => {
          dispatch(clearRatingsError());
          setToastMsg(false);
        }, 5000);
        break;
      }
      default: {
        setToastMessageValue(null);
        setToastMsg(false);
        dispatch(clearRatingsError());
        break;
      }
    }
  }, [status]);
  console.log("product-value: ", product);
  console.log("product-value: ", toastMessageValue);
  return (
    <div className="product-details">
      {Object.keys(productData).length !== 0 && (
        <div className="container-fluid">
          {/* <div className="d-flex align-items-center gap-2 bread-crumbs">
            <div
              className="border-bottom brand"
              onClick={() =>
                navigate(`${COLLECTIONS_PAGE}?type=${productType}`)
              }
            >
              Shop
            </div>
            <div>
              <RxSlash className="d-flex align-items-center" />
            </div>
            <div className="border-bottom product-title">
              {product?.product_title}
            </div>
          </div> */}
          <div className="product-details-content">
            <div className="show-case-container">
              <div className="avail-images-container">
                {product?.product_images?.map((product_image, index) => {
                  return (
                    <div
                      className={`avail-image ${index !== 0 && "mt-1"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductImage(index);
                      }}
                      onMouseOver={() => {
                        handleProductImage(index);
                      }}
                      onMouseLeave={() => {
                        handleProductImage(index);
                      }}
                    >
                      <img
                        src={product_image && product_image}
                        alt={product_image}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="target-image-container">
                <div className="target-image">
                  <div
                    className="magnifier-container"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`magnifier-box ${isVisible ? "visible" : ""}`}
                      style={{
                        position: "absolute",
                        left: `${cursorPosition.x - 100}px`,
                        top: `${cursorPosition.y - 100}px`,
                        pointerEvents: "none",
                      }}
                    ></div>
                    <img
                      src={
                        product?.product_images?.length >= 0 &&
                        product?.product_images[productIndex]
                      }
                      alt={product?.product_title}
                    />
                  </div>
                </div>
              </div>
              <div className="avail-images-container-res">
                {product?.product_images?.map((product_image, index) => {
                  return (
                    <div
                      className={`avail-image`}
                      onClick={() => handleProductImage(index)}
                    >
                      <img
                        src={product_image && product_image}
                        alt={product_image}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-info-container">
              {isVisible && (
                <div className="magnifier-view-container">
                  <div className="magnifier-view">
                    <div
                      className="view"
                      style={{
                        backgroundImage: `url(${
                          product?.product_images?.length >= 0 &&
                          product?.product_images[productIndex]
                        })`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundRepeat: "no-repeat",
                        transform: "scale(2)",
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="product-title">{product?.product_title}</div>
              <div
                className="product-ratings d-flex align-items-center gap-2 mt-1 cursor-pointer"
                onClick={() => {
                  if (isAuthenticated) {
                    setRatingsModalOpen(true);
                  }
                }}
              >
                <div className="d-flex align-items-center gap-1">
                  {Number(ratings?.total_ratings) !== 0 && (
                    <div className="d-flex align-items-center gap-1">
                      <div className="d-flex align-items-center">
                        <IoIosStar
                          color="#feaa02"
                          className="d-flex align-items-center"
                        />
                      </div>
                      <div className="font-12 font-weight-1 rate">
                        {ratings?.total_ratings}
                      </div>
                    </div>
                  )}
                  {console.log("ratings?.total_ratings: ", ratings)}
                  {Number(ratings?.total_ratings) !== 0 && (
                    <div className="font-12 reviews">
                      ({ratings?.ratings_count} Reviews)
                    </div>
                  )}
                </div>

                {Number(ratings?.total_ratings) !== 0 && (
                  <div className="d-flex align-items-center dot-ic">
                    <GoDotFill size={10} />
                  </div>
                )}
                <div className="font-12 sold">125 Items Sold</div>
              </div>
              <div className="d-flex align-items-center font-weight-1">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className={`${
                        product?.discount_price && "offered"
                      } price`}
                    >
                      <div className="d-flex align-items-center">
                        <PiCurrencyInrBold />
                      </div>
                      <div className="value">
                        {getCurrencyFormat(product?.sale_price)}
                      </div>
                    </div>
                    {product?.discount_percentage && (
                      <div className="tag-ic">
                        <GoDotFill />
                      </div>
                    )}
                    {product?.discount_percentage && (
                      <div className="discount price">
                        {product?.discount_percentage}% offer
                      </div>
                    )}
                  </div>
                  {product?.discount_price && (
                    <div className="price">
                      <div className="d-flex align-items-center">
                        <PiCurrencyInrBold />
                      </div>
                      <div className="value">
                        {getCurrencyFormat(
                          product?.sale_price - product?.discount_price
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="tax-inclusion">Inclusive of all taxes</div>
              <div className="custom-hr"></div>
              <div className="color-container">
                <div className="title d-flex align-items-center gap-1">
                  <div>Color:</div>
                  <div className="font-12 d-flex align-items-center">
                    {product?.target_color}
                  </div>
                </div>
                <div className="avail-colors-container">
                  {productGroupData?.group?.map((product_group) => {
                    console.log("product: ", product);
                    return (
                      <div
                        className={`color cursor-pointer ${
                          product?.target_color_code ===
                            product_group?.target_color_code && "active"
                        }`}
                        style={{
                          border:
                            product?.target_color_code ===
                              product_group?.target_color_code &&
                            `1px solid gray`,
                        }}
                        onClick={() => {
                          navigate(
                            `${LOCKED_CLOTH_PAGE}?type=men&product_id=${product_group?._id}`
                          );
                          const payload = {
                            product_id: product_group?._id,
                          };
                          dispatch(getProduct(payload));
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <div
                          style={{
                            background: product_group?.target_color_code,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="custom-hr"></div>
              <div className="sizes-container">
                <div className="title">Size</div>
                <div className="sizes-content-container">
                  {product?.available_sizes?.map((size) => {
                    return (
                      <div
                        className={`size cursor-pointer ${
                          targetProductSize === size && "active"
                        }`}
                        onClick={() => setTargetProductSize(size)}
                      >
                        {size}
                      </div>
                    );
                  })}
                  {product?.out_of_stock_sizes?.map((size) => {
                    return <div className={`size out-of-stock`}>{size}</div>;
                  })}
                </div>
              </div>
              <div className="custom-hr"></div>
              <div className="product-actions">
                <div
                  className="qty-container"
                  style={{
                    gap: targetProductQuantity === "Custom" ? "5px" : "10px",
                  }}
                >
                  <div className="title">Qty</div>
                  {targetProductQuantity === "Custom" && (
                    <div className="ic-close">
                      <IoIosClose
                        className="icon"
                        onClick={() => {
                          setTargetProductQuantity("");
                          setTargetProductCustomQuantity(1);
                        }}
                      />
                    </div>
                  )}
                  {targetProductQuantity === "Custom" ? (
                    <input
                      className="product-quantity-input"
                      value={targetProductCustomQuantity}
                      onChange={(e) =>
                        setTargetProductCustomQuantity(e.target.value)
                      }
                      type="number"
                    />
                  ) : (
                    <select
                      className="select-input"
                      value={targetProductQuantity}
                      onChange={(e) => {
                        setTargetProductQuantity(e.target.value);
                        if (e.target.value === "Custom") {
                          setTargetProductCustomQuantity(1);
                        }
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>Custom</option>
                    </select>
                  )}
                </div>
                <button
                  className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                    (cartItems?.some(
                      (cartProduct) =>
                        cartProduct?.product?._id === product?._id
                    ) ||
                      (cartLoading && selectedProductId === product._id)) &&
                    "disabled"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductId(product._id);
                    if (
                      cartItems?.some(
                        (cartProduct) =>
                          cartProduct?.product?._id === product?._id
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
                        (cartProduct) =>
                          cartProduct?.product?._id === product?._id
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
                        cartProduct?.product?._id === product?._id
                    )
                      ? "Added to Cart"
                      : cartLoading && selectedProductId === product._id
                      ? "Adding to Cart"
                      : "Add To Cart"}
                  </div>
                </button>
                <button
                  className="buy-now-btn"
                  onClick={() => {
                    navigate(
                      `${CART_ITEMS_PAGE}?product_id=${productId}&target_qty=1&target_size=L`
                    );
                  }}
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="product-info-ratings">
              <ProductInfo product={product} />
              <ProductDeliveryBanner />
              <SliderProducts
                title={"Recently Viewed"}
                products={localStorageRecentProducts}
              />
              <SliderProducts title={"Top Products"} products={products} />
              {console.log(
                "ratingsratings: ",
                Object.keys(ratings).length === 0
              )}
              {Object.keys(ratings).length !== 0 && (
                <ProductRatings ratings={ratings} />
              )}
              {Object.keys(ratings).length !== 0 && (
                <ProductReviews ratings={ratings} />
              )}
            </div>
          </div>
        </div>
      )}
      {/* Product Info and Ratings */}

      {/* Ratings Modal */}
      <DomRender>
        <CustomModal
          isOpen={
            ratingsModalOpen
            // false
          }
          onClose={() => setRatingsModalOpen(false)}
          size="L"
        >
          <div className="ratings-modal container">
            <div className="close-ic-container">
              <div className="d-flex align-items-center justify-content-flex-end w-fill mt-2">
                <div
                  className="close-ic-content"
                  onClick={() => {
                    setRatingsModalOpen(false);
                    dispatch(clearRatingsError());
                    setToastMsg(false);
                    setRating(0);
                    setReviewTitle("");
                    setProductReview("");
                    setProductRecommend(null);
                    setTermsConditionsAccepted(false);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <GrClose className="close-ic" />
                </div>
              </div>
            </div>
            <div className="mt-1 mb-2">
              <div>
                <div className="font-size-3 font-weight-2 text-transorm-uc">
                  Overall Rating
                </div>
              </div>
              <div className="rating-star-container">
                <div className="rating-star-content">
                  {filledStars.map((star, index) => {
                    return (
                      <div
                        className="rating-star"
                        onClick={() => setRating(index + 1)}
                      >
                        {star}
                      </div>
                    );
                  })}
                  {remainingStars.map((star, index) => {
                    return (
                      <div
                        className="rating-star unfilled"
                        onClick={() => {
                          // if()
                          setRating(filledStars.length + index + 1);
                        }}
                      >
                        {star}
                      </div>
                    );
                  })}
                  <div className="product-review-result open-849px-gt">
                    {getRatingsStat()}
                  </div>
                </div>
                <div className="product-review-result open-849px-lt">
                  {getRatingsStat()}
                </div>
              </div>
              <div className="review-title mt-3">
                <div className="font-weight-1 font-14 review-title-heading">
                  Review title
                </div>
                <input
                  placeholder="Example: Comfort Fit"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>
              <div className="recomend-product-res-container mt-2">
                <div className="font-weight-1">
                  Would you recommend this product to a friend?
                </div>
                <div className="recomend-product-res w-fill">
                  <div className="d-flex align-items-center gap-1">
                    <input
                      type="radio"
                      checked={productRecommend}
                      onClick={() => setProductRecommend(true)}
                    />
                    <div className="res">Yes</div>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <input
                      type="radio"
                      checked={productRecommend === false ? true : false}
                      onClick={() => setProductRecommend(false)}
                    />
                    <div className="res">No</div>
                  </div>
                </div>
              </div>
              <div className="product-review mt-3">
                <div className="font-weight-1 font-14 product-review-heading">
                  Product review
                </div>
                <textarea
                  value={productReview}
                  rows={5}
                  placeholder="Example: The fabric is incredibly soft and breathable, making it a joy to wear all day long. What really sets this dress apart is the attention to detail in the fit."
                  onChange={(e) => setProductReview(e.target.value)}
                />
              </div>
              <div>
                <div className="terms d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    checked={termsConditionsAccepted}
                    onChange={() => setTermsConditionsAccepted(true)}
                  />
                  <div className="res">I accept terms and conditions</div>
                </div>
              </div>
              <div className="terms-sentence">
                You agree to allow us to send you periodic communications
                related to product reviews, promotions, and other relevant
                information. You also consent to our privacy policy, which
                outlines how your personal information will be collected, used,
                and protected.
              </div>
              <div className="submit-btn">
                <button
                  className={`${ratingLoading ? "current-loading" : ""}`}
                  disabled={
                    termsConditionsAccepted && !toastMsg && !ratingLoading
                      ? false
                      : true
                  }
                  onClick={handleSubmitReview}
                >
                  {ratingLoading ? (
                    <div className={"item ratings-loader"}>
                      <Loader
                        type="spinner-cub"
                        bgColor={"#fff"}
                        color={"#fff"}
                        size={35}
                      />
                      <div>Please wait...</div>
                    </div>
                  ) : (
                    "Submit product review"
                  )}{" "}
                </button>
              </div>
            </div>
          </div>
        </CustomModal>
      </DomRender>
      {toastMsg && <ToastMessage message={toastMessageValue} status={status} />}
    </div>
  );
};

export default ProductDetails;
