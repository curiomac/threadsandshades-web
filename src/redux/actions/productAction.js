import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  productFail,
  productRequest,
  productSuccess,
} from "../slices/productSlice";
import { similarProductsFail, similarProductsRequest, similarProductsSuccess } from "../slices/similarProductsSlice";



export const getSimilarProductsRequest = (payload) => async (dispatch) => {
  try {
    dispatch(similarProductsRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.similar_products.get}?product_id=${payload}`
    );
    dispatch(similarProductsSuccess(response?.data));
  } catch (error) {
    dispatch(similarProductsFail(error?.response?.data?.message));
  }
};
export const getProduct = (payload) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.product.get}/${payload.product_id}`
    );
    dispatch(getSimilarProductsRequest(payload.product_id))
    dispatch(productSuccess(response?.data));
  } catch (error) {
    dispatch(productFail(error?.response?.data?.message));
  }
};

export const clearProductError = () => async (dispatch) => {
  dispatch(clearError());
};
