import React, { useEffect } from "react";
import ProductDetails from "./layouts/ProductDetails";
import TopSellingBanner from "../home/layouts/TopSellingBanner";
import { useDispatch, useSelector } from "react-redux";
import LiquidLoader from "../../../plugins/loaders/liquid-loader/LiquidLoader";
import { getQueryParam } from "../../../../helpers/search-query-params/getQueryParams";
import { getProduct } from "../../../../redux/actions/productAction";
import { getRatings } from "../../../../redux/actions/ratingsAction";
import { clearProduct } from "../../../../redux/slices/productSlice";
import Loader from "react-js-loader";

const LockedCloth = () => {
  const dispatch = useDispatch();
  const productId = getQueryParam("product_id");
  const { loading, product } = useSelector((state) => state.productState);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    dispatch(clearProduct());
  }, []);
  useEffect(() => {
    const payload = {
      product_id: productId,
    };
    dispatch(getProduct(payload));
    dispatch(getRatings(payload));
  }, [productId, dispatch]);
  console.log("product: ::", product);
  return (
    <div className="locked-cloth">
      <div className="shrink-width">
        {loading ? (
          <div
            className={`loader-container-he ${
              !isAuthenticated ? "isNotAuth" : ""
            } `}
          >
            {/* <LiquidLoader /> */}
            <Loader
              type="spinner-cub"
              bgColor={"gray"}
              color={"green"}
              size={60}
            />
          </div>
        ) : (
          <>
            <ProductDetails productId={productId}/>
            {/* <TopSellingBanner /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default LockedCloth;
