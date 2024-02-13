import React, { useEffect, useState } from "react";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { RxSlash } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../../../redux/actions/productAction";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { TiShoppingCart, TiTick } from "react-icons/ti";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { addCart } from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import BackdropLoader from "../../../../plugins/loaders/backdrop-loader/BackdropLoader";

const rating = 4.5;

const ProductDetails = () => {
  const productId = getQueryParam("product_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    product,
    products_group,
    loading: productLoading,
  } = useSelector((state) => state.productState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState("");

  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <FaStar key={index} className="filled d-flex align-items-center" />
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
    console.log("index: ", index);
  };
  const remainingStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, index) => <FaRegStar key={index} />
  );
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
    };
    dispatch(addCart(payload));
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    const payload = {
      product_id: productId,
    };
    dispatch(getProduct(payload));
  }, [productId, dispatch]);
  return (
    <div className="product-details">
      {productLoading ? <BackdropLoader /> : ""}
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2 bread-crumbs">
          <div className="border-bottom brand">Threads and Shades</div>
          <div>
            <RxSlash className="d-flex align-items-center" />
          </div>
          <div className="border-bottom product">{product?.product_title}</div>
        </div>
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
            <div className="rating-container">
              <div className="rating">
                {filledStars}
                {remainingStars}
                <span className="rating-value">{`(${rating})`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center font-weight-1">
              <div className="d-flex align-items-center gap-2">
                {product?.discount_price && (
                  <span className="price">
                    ₹ {product?.sale_price - product?.discount_price}
                  </span>
                )}
                <span
                  className={`${product?.discount_price && "offered"} price`}
                >
                  ₹ {product?.sale_price}
                </span>{" "}
                {product?.discount_percentage && (
                  <span className="discount price">
                    ({product?.discount_percentage}% offer)
                  </span>
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
                {products_group?.group?.map((product_group) => {
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
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <div
                        style={{ background: product_group?.target_color_code }}
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
                      className={`size ${
                        product?.available_sizes[0] === size && "active"
                      }`}
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
              <div className="qty-container">
                <div className="title">Qty</div>
                <select className="select-input">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <button
                className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                  (cartItems?.some(
                    (cartProduct) => cartProduct?.product?._id === product?._id
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
                {console.log(cartLoading)}
                {console.log(selectedProductId, "<<<<<<<<<<<<<<")}
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
                    (cartProduct) => cartProduct?.product?._id === product?._id
                  )
                    ? "Item added to Cart"
                    : cartLoading && selectedProductId === product._id
                    ? "Adding to Cart"
                    : "Add To Cart"}
                </div>
              </button>
              <button className="buy-now-btn">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
