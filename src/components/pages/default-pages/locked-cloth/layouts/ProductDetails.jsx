import React, { useEffect } from "react";
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
  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <FaStar key={index} className="filled d-flex align-items-center" />
  ));
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
          <div className="border-bottom product">{product?.title}</div>
        </div>
        <div className="product-details-content">
          <div className="show-case-container">
            <div className="avail-images-container">
              <div className="avail-image">
                <img src={product?.images?.length >=0 && product?.images[0]?.image} alt={product?.title} />
              </div>
            </div>
            <div className="target-image-container">
              <div className="target-image">
                <img src={product?.images?.length >=0 && product?.images[0]?.image} alt={product?.title} />
              </div>
            </div>
          </div>
          <div className="product-info-container">
            <div className="product-title">{product?.title}</div>
            <div className="rating-container">
              <div className="rating">
                {filledStars}
                {remainingStars}
                <span className="rating-value">{`(${rating})`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center font-weight-1">
              <div className="d-flex align-items-center gap-2">
                {product?.offerPrice && (
                  <span className="price">₹ {product?.offerPrice}</span>
                )}
                <span className={`${product?.offerPrice && "offered"} price`}>
                  ₹ {product?.price}
                </span>{" "}
                {product?.offerPrice && (
                  <span className="discount price">
                    ({product?.discount}% offer)
                  </span>
                )}
              </div>
            </div>
            <div className="tax-inclusion">Inclusive of all taxes</div>
            <div className="custom-hr"></div>
            <div className="color-container">
              <div className="title">Color</div>
              <div className="avail-colors-container">
                {product?.availableColors?.map((color) => {
                  return (
                    <div
                      className={`color ${
                        product?.availableColors[0] === color && "active"
                      }`}
                      style={{
                        border:
                          product?.availableColors[0] === color &&
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
