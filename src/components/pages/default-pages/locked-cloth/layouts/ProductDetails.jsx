import React, { useEffect, useState } from "react";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { RxSlash } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../../../redux/actions/productAction";

const rating = 4.5;

const ProductDetails = () => {
  const productId = getQueryParam("product_id");
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productState);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    setIsVisible(true)
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  const remainingStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, index) => <FaRegStar key={index} />
  );
  useEffect(() => {
    const payload = {
      product_id: productId,
    };
    dispatch(getProduct(payload));
  }, [productId, dispatch]);
  return (
    <div className="product-details">
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
                  <div className={`avail-image ${index !== 0 && 'mt-1'}`}>
                    <img
                      src={
                        product_image &&
                        product_image
                      }
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
                      product?.product_images[0]
                    }
                    alt={product?.product_title}
                  />
                </div>
              </div>
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
                        product?.product_images[0]
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
              <div className="title">Color</div>
              <div className="avail-colors-container">
                {product?.available_color_codes?.map((color) => {
                  return (
                    <div
                      className={`color ${
                        product?.available_color_codes[0] === color && "active"
                      }`}
                      style={{
                        border:
                          product?.available_color_codes[0] === color &&
                          `1px solid ${color}`,
                      }}
                    >
                      <div style={{ background: color }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="custom-hr"></div>
            <div className="sizes-container">
              <div className="title">Size</div>
              <div className="sizes-content-container">
                <div className="size active">S</div>
                <div className="size">M</div>
                <div className="size">L</div>
                <div className="size">XL</div>
                <div className="size">XXL</div>
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
              <button className="add-to-cart-btn">Add to cart</button>
              <button className="buy-now-btn">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
