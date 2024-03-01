import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = (filter_sizes, filter_colors) => async (dispatch) => {
  try {
    dispatch(productsRequest());
    let link = `${BASE_URL}/${endpoints.products.get}`;
    if(filter_sizes.length > 0 || filter_colors.length > 0) {
      link += `?filter_applied=true`;
    }
    if (filter_sizes.length > 0) {
      link += `&available_sizes=${filter_sizes}`;
    }
    if (filter_colors.length > 0) {
      link += `&target_color=${filter_colors}`;
    }
    const response = await axios.get(link);
    dispatch(productsSuccess(response?.data));
  } catch (error) {
    dispatch(productsFail(error?.response?.data?.message));
  }
};

export const clearProductsError = () => async (dispatch) => {
  dispatch(clearError());
};
