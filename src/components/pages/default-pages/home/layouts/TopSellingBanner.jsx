import React from "react";
import image_1 from "../../../../../assets/imgs/sample-photos/image-1.png";
import image_2 from "../../../../../assets/imgs/sample-photos/image-2.png";
import image_3 from "../../../../../assets/imgs/sample-photos/image-3.png";
import image_4 from "../../../../../assets/imgs/sample-photos/image-4.png";
import image_5 from "../../../../../assets/imgs/sample-photos/image-5.png";
import image_6 from "../../../../../assets/imgs/sample-photos/image-6.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const TopSellingBanner = () => {
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
  return (
    <div className="top-selling-banner">
      <div className="container-fluid">
        <div className="font-size-3 text-align-center mt-3 mb-3">
          TOP SELLING
        </div>
        <div className="products-grid">
          {sample_products?.map((product) => {
            console.log(product?.availableColors, "<<<<<<<<<<<<<<<");
            return (
              <div className="product">
                <img src={product.image} alt="image_1" />
                <div className="container-fluid-padding base-container">
                  <div className="add-to-fav-icon-container">
                    <div className="add-to-fav-icon">
                      <FaRegHeart />
                    </div>
                  </div>
                  <div className="add-to-cart-container">
                    <button className="add-to-cart-btn d-flex align-items-center justify-content-center gap-3">
                      <div>
                        <TiShoppingCart className="font-size-3 d-flex align-items-center"/>
                      </div>
                      <div>Add To Cart</div>
                    </button>
                  </div>
                  <div className="product-title">{product.title}</div>
                  <div className="d-flex align-items-center font-weight-1">
                    {/* <div>
                      <BsCurrencyRupee className="d-flex align-items-center"/>
                    </div> */}
                    <div className="d-flex align-items-center gap-2 mt-1 mb-1">
                      {product?.offerPrice && (
                        <span className="price">₹ {product.offerPrice}</span>
                      )}
                      <span
                        className={`${product?.offerPrice && "offered"} price`}
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingBanner;
