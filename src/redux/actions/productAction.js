import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  productFail,
  productRequest,
  productSuccess,
} from "../slices/productSlice";

export const getProduct = (payload) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.product.get}/${payload.product_id}`
    );
    dispatch(productSuccess(response?.data));
  } catch (error) {
    dispatch(productFail(error?.response?.data?.message));
  }
};

export const clearProductError = () => async (dispatch) => {
  dispatch(clearError());
};
