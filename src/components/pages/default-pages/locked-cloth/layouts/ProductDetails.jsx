import React from "react";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { RxSlash } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
import image_1 from "../../../../../assets/imgs/sample-photos/image-1.png";
import image_2 from "../../../../../assets/imgs/sample-photos/image-2.png";
import image_3 from "../../../../../assets/imgs/sample-photos/image-3.png";
import image_4 from "../../../../../assets/imgs/sample-photos/image-4.png";
import image_5 from "../../../../../assets/imgs/sample-photos/image-5.png";
import image_6 from "../../../../../assets/imgs/sample-photos/image-6.png";

const rating = 4.5;

const ProductDetails = () => {
  const productId = getQueryParam("product_id");
  const sample_products = [
    {
      id: 1,
      image: image_1,
      title: "Kids' North Hooded Water Repellent 600 Fill Power Down Jacket",
      description: "",
      price: "600",
      availableColors: ["#ce2238", "#a0a0a1"],
    },
    {
      id: 2,
      image: image_2,
      title: "Kids' Tech Fleece Full Zip Hoodie",
      description: "",
      price: "700",
      offerPrice: "350",
      discount: "50",
      availableColors: ["#222021", "#fff"],
    },
    {
      id: 3,
      image: image_3,
      title: "Kids' North Hooded Water Repellent 600 Fill Power Down Jacket",
      description: "",
      price: "599",
      availableColors: ["#2d9a7a", "#222021", "#1693e0", "#fc5500"],
    },
    {
      id: 4,
      image: image_4,
      title: "Kids' Tech Fleece Full Zip Hoodie",
      description: "",
      price: "999",
      offerPrice: "790",
      discount: "20",
      availableColors: ["#7493c6", "#2d4876", "#68748c"],
    },
    {
      id: 5,
      image: image_5,
      title: "Kids' North Hooded Water Repellent 600 Fill Power Down Jacket",
      description: "",
      price: "658",
      availableColors: ["#373754", "#274b9b"],
    },
    {
      id: 6,
      image: image_6,
      title: "Kids' Tech Fleece Full Zip Hoodie",
      description: "",
      price: "250",
      availableColors: ["#28252d", "#fff"],
    },
  ];
  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <FaStar key={index} className="filled d-flex align-items-center" />
  ));
  const remainingStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, index) => <FaRegStar key={index} />
  );
  const getLockedProduct = () => {
    return sample_products?.find(
      (product) => product.id.toString() === productId
    );
  };
  return (
    <div className="product-details">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2 bread-crumbs">
          <div className="border-bottom">Threads and Shades</div>
          <div>
            <RxSlash className="d-flex align-items-center" />
          </div>
          <div className="border-bottom">{getLockedProduct()?.title}</div>
        </div>
        <div className="product-details-content">
          <div className="show-case-container">
            <div className="avail-images-container">
              <div className="avail-image">
                <img
                  src={getLockedProduct().image}
                  alt={getLockedProduct().title}
                />
              </div>
            </div>
            <div className="target-image-container">
              <div className="target-image">
                <img
                  src={getLockedProduct().image}
                  alt={getLockedProduct().title}
                />
              </div>
            </div>
          </div>
          <div className="product-info-container">
            <div className="product-title">{getLockedProduct().title}</div>
            <div className="rating-container">
              <div className="rating">
                {filledStars}
                {remainingStars}
                <span className="rating-value">{`(${rating})`}</span>
              </div>
            </div>
            <div className="d-flex align-items-center font-weight-1">
              <div className="d-flex align-items-center gap-2">
                {getLockedProduct()?.offerPrice && (
                  <span className="price">
                    ₹ {getLockedProduct().offerPrice}
                  </span>
                )}
                <span
                  className={`${
                    getLockedProduct()?.offerPrice && "offered"
                  } price`}
                >
                  ₹ {getLockedProduct().price}
                </span>{" "}
                {getLockedProduct()?.offerPrice && (
                  <span className="discount price">
                    ({getLockedProduct().discount}% offer)
                  </span>
                )}
              </div>
            </div>
            <div className="tax-inclusion">Inclusive of all taxes</div>
            <div className="custom-hr"></div>
            <div className="color-container">
              <div className="title">Color</div>
              <div className="avail-colors-container">
                {getLockedProduct().availableColors.map((color) => {
                  return (
                    <div
                      className={`color ${
                        getLockedProduct().availableColors[0] === color &&
                        "active"
                      }`}
                      style={{
                        border:
                          getLockedProduct().availableColors[0] ===
                            color && `1px solid ${color}`,
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
                <button className="add-to-cart-btn">
                    Add to cart
                </button>
                <button className="buy-now-btn">
                    Buy now
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
