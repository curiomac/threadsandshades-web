import React, { useEffect } from "react";
import image_1 from "../../../../../assets/imgs/sample-photos/image-1.png";
import image_2 from "../../../../../assets/imgs/sample-photos/image-2.png";
import image_3 from "../../../../../assets/imgs/sample-photos/image-3.png";
import image_4 from "../../../../../assets/imgs/sample-photos/image-4.png";
import image_5 from "../../../../../assets/imgs/sample-photos/image-5.png";
import image_6 from "../../../../../assets/imgs/sample-photos/image-6.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/actions/productsAction";
import { addCart } from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";

const CollectionsList = () => {
  const navigate = useNavigate();
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
  const { products } = useSelector((state) => state.productsState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const handleAddToCart = (product) => {
    const payload = {
      product_id: product._id,
      user_id: "65a7eef1a7e2b0eda9f545e8",
      quantity: 2,
    };
    dispatch(addCart(payload));
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
                  // onClick={() => navigate(`${LOCKED_CLOTH_PAGE}?type=men&product_id=${product?.id}`)}
                >
                  <img src={product?.images[0]?.image} alt="image_1" />
                  <div className="container-fluid-padding base-container">
                    <div className="add-to-fav-icon-container">
                      <div className="add-to-fav-icon">
                        <FaRegHeart />
                      </div>
                    </div>
                    <div className="add-to-cart-container">
                      <button
                        className={`add-to-cart-btn d-flex align-items-center justify-content-center gap-3 ${
                          (cartItems?.some(
                            (cartProduct) => cartProduct?._id === product?._id
                          ) ||
                            cartLoading) &&
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
                        {cartLoading ? (
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
                            : cartLoading
                            ? "Adding to Cart"
                            : "Add To Cart"}
                        </div>
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
