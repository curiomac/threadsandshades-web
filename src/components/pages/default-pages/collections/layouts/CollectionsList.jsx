import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaShoppingBasket } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import {
  CART_ITEMS_PAGE,
  LOCKED_CLOTH_PAGE,
} from "../../../../../helpers/route-paths/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import {
  addCart,
  getTemporaryCart,
} from "../../../../../redux/actions/cartAction";
import SpinnerLoader from "../../../../plugins/loaders/spinner-loader/SpinnerLoader";
import {
  getTemporaryWishList,
  moveWishList,
} from "../../../../../redux/actions/wishListAction";
import { GoDotFill } from "react-icons/go";
import { getQueryParam } from "../../../../../helpers/search-query-params/getQueryParams";
import { getProducts } from "../../../../../redux/actions/productsAction";
import sorry_gif from "../../../../../assets/imgs/store-room/sorry-gif.gif";
import { IoIosStar } from "react-icons/io";
import { PiCurrencyInrBold } from "react-icons/pi";
import { getCurrencyFormat } from "../../../../../helpers/currency-formatter/getCurrencyFormat";
import { clearProduct } from "../../../../../redux/slices/productSlice";
import Loader from "react-js-loader";
import JumpToaster from "../../../../plugins/cmac-plugins/jump-toaster/JumpToaster";
import { clearCartMessage } from "../../../../../redux/slices/cartSlice";
import AddCartBtn from "../../../../utils/AddCartBtn";
import AddCartBtnMobile from "../../../../utils/AddCartBtnMobile";
import { useImageLoaded } from "../../../../utils/useImageLoaded";

const CollectionsList = () => {
  const navigate = useNavigate();
  const search_input = getQueryParam("input");
  const searching = getQueryParam("searching");
  const { products, loading } = useSelector((state) => state.productsState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { loading: cartLoading } = useSelector((state) => state.cartState);
  const { wishListItems, loading: wishListLoading } = useSelector(
    (state) => state.wishListState
  );
  const [ref, loaded, onLoad] = useImageLoaded();
  const [selectedProductId, setSelectedProductId] = useState("");
  const [initialSearchInput, setInitialSearchInput] = useState("");
  const [addingCart, setAddingCart] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    setAddingCart(true);
    const payload = {
      product_id: product._id,
      user_id: user?._id,
      selected_color: product.target_color,
      selected_color_code: product.target_color_code,
      selected_size: product.available_sizes[0],
      selected_quantity: 1,
      is_from: "default",
    };

    if (isAuthenticated) {
      dispatch(addCart(payload));
      return;
    }

    const local_cart_items =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    const product_found = local_cart_items.find(
      (data) => data?.product_id === product._id
    );

    const localStoragePayload = {
      product_id: product._id,
      selected_product_details: {
        selected_color: product.target_color,
        selected_color_code: product.target_color_code,
        selected_size: product.available_sizes[0],
        selected_quantity: product_found
          ? product_found.selected_product_details.selected_quantity + 1
          : 1,
      },
    };

    const updatedCartItems = product_found
      ? [
          localStoragePayload,
          ...local_cart_items.filter(
            (data) => data?.product_id !== product._id
          ),
        ]
      : [localStoragePayload, ...local_cart_items];

    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
    dispatch(
      getTemporaryCart({
        cart_details: updatedCartItems,
        isSingle: true,
        targetProduct: product,
      })
    );
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
      const product_found = local_wish_list_items.find(
        (data) => data?.product_id === product._id
      );
      if (!product_found) {
        localStorage.setItem(
          "wish-list-items",
          JSON.stringify([...local_wish_list_items, localStoragePayload])
        );
        const payload = {
          wish_list_details: [...local_wish_list_items, localStoragePayload],
          isSingle: true,
          targetProduct: product,
        };
        dispatch(getTemporaryWishList(payload));
      } else {
        const update_wishlist_products = local_wish_list_items.filter(
          (data) => data?.product_id !== product._id
        );
        localStorage.setItem(
          "wish-list-items",
          JSON.stringify([...update_wishlist_products])
        );
        const payload = {
          wish_list_details: [...update_wishlist_products],
        };
        dispatch(getTemporaryWishList(payload));
      }
    }
  };
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
  if (loading) {
    return (
      <div
        className={`loader-container-he ${
          !isAuthenticated ? "isNotAuth" : ""
        } `}
      >
        <Loader type="spinner-cub" bgColor={"gray"} color={"green"} size={60} />
      </div>
    );
  } else if (products.length > 0) {
    return (
      <div className="collection-list">
        <div>
          <div className="">
            <div className="font-size-3 text-align-center mt-3 mb-3">
              MEN'S COLLECTION
            </div>
            <div className="products-grid">
              {products?.map((product, index) => {
                // if (index <= 3) {
                if (true) {
                  return (
                    <div
                      className="product"
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
                        <div style={{height: '0'}}>
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
