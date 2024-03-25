import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { LOCKED_CLOTH_PAGE } from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  getTemporaryCart,
} from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import { moveWishList } from "../../../../../redux/actions/wishListAction";
import { getLocalStorageItem } from "../../../../../helpers/local-storage-item/getLocalStorageItem";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { getProducts } from "../../../../../redux/actions/productsAction";
import sorry_gif from "../../../../../assets/imgs/store-room/sorry-gif.gif";

const CollectionsList = () => {
  const navigate = useNavigate();
  const search_input = getQueryParam("input");
  const searching = getQueryParam("searching");
  const { products } = useSelector((state) => state.productsState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cartState
  );
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const [selectedProductId, setSelectedProductId] = useState("");
  const [initialSearchInput, setInitialSearchInput] = useState("");
  const [addingCart, setAddingCart] = useState(false);
  const [localStorageCartItems, setLocalStorageCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-items")) || [];
  });
  const [localStorageWishListItems, setLocalStorageWishListItems] = useState(
    () => {
      return JSON.parse(localStorage.getItem("wish-list-items")) || [];
    }
  );
  const dispatch = useDispatch();
  console.log("user: ", user);
  const handleAddToCart = (product) => {
    setAddingCart(true);
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
      const product_found = localStorageCartItems.find(
        (data) => data?.product_id === product._id
      );
      if (!product_found || localStorageCartItems?.length === 0) {
        localStorage.setItem(
          "cart-items",
          JSON.stringify([...local_cart_items, localStoragePayload])
        );
        setLocalStorageCartItems([
          ...localStorageCartItems,
          localStoragePayload,
        ]);
        const payload = {
          cart_details: [...localStorageCartItems, localStoragePayload],
        };
        dispatch(getTemporaryCart(payload));
      }
    }
  };
  const handleMoveToWishList = (product) => {
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      is_from: "default",
    };
    if (isAuthenticated) {
      dispatch(moveWishList(payload));
    } else {
      const local_wish_list_items =
        JSON.parse(localStorage.getItem("wish-list-items")) || [];
      const localStoragePayload = {
        product_id: product._id,
      };
      const product_found = localStorageWishListItems.find(
        (data) => data?.product_id === product._id
      );
      if (!product_found || localStorageWishListItems?.length === 0) {
        localStorage.setItem(
          "wish-list-items",
          JSON.stringify([...local_wish_list_items, localStoragePayload])
        );
        setLocalStorageWishListItems([
          ...localStorageWishListItems,
          localStoragePayload,
        ]);
        const payload = {
          wish_list_details: [
            ...localStorageWishListItems,
            localStoragePayload,
          ],
        };
        dispatch(getTemporaryCart(payload));
      }
    }
  };
  useEffect(() => {
    if (searching === "true") {
      setInitialSearchInput(search_input);
    }
    if (searching === "false" && initialSearchInput === search_input) {
      dispatch(getProducts(search_input.split(" "), [], []));
    }
  }, [search_input, searching]);
  useEffect(() => {
    if (addingCart) {
      setTimeout(() => {
        setAddingCart(false);
      }, 3000);
    }
  }, [addingCart]);
  if (products.length > 0) {
    return (
      <div className="collection-list">
        <div>
          <div className="container-fluid">
            <div className="font-size-3 text-align-center mt-3 mb-3">
              MEN'S COLLECTION
            </div>
            <div className="products-grid">
              {products?.map((product) => {
                console.log("product: ", product);
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
                    <img src={product?.product_images[0]} alt="image_1" />
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
                      <div className="d-flex align-items-center font-weight-1">
                        {/* <div>
                      <BsCurrencyRupee className="d-flex align-items-center"/>
                    </div> */}
                        <div className="d-flex align-items-center gap-2 mt-1 mb-1 res-849px-d-none">
                          {product?.is_discounted_product && (
                            <span className="price">
                              ₹ {product.sale_price - product.discount_price}
                            </span>
                          )}
                          <span
                            className={`${
                              product?.is_discounted_product && "offered"
                            } price`}
                          >
                            ₹ {product?.sale_price}
                          </span>{" "}
                          {product?.is_discounted_product && (
                            <span className="discount price">
                              ({product.discount_percentage}% offer)
                            </span>
                          )}
                        </div>
                        <div className="mt-1 mb-1 res-849px-d-unset">
                          {product?.is_discounted_product && (
                            <div className="price">
                              ₹ {product.sale_price - product.discount_price}
                            </div>
                          )}
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className={`${
                                product?.is_discounted_product && "offered"
                              } font-12`}
                            >
                              ₹ {product?.sale_price}
                            </span>{" "}
                            {product?.is_discounted_product && (
                              <span className="discount price">
                                ({product.discount_percentage}% offer)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="avail-colors-container">
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="products-empty-container">
        <div>
          <img src={sorry_gif} alt="error" />
          <div className="quotes">No Products Found</div>
        </div>
      </div>
    );
  }
};

export default CollectionsList;
