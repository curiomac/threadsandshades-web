import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = (search_key, filter_sizes, filter_colors) => async (dispatch) => {
  try {
    dispatch(productsRequest());
    let link = `${BASE_URL}/${endpoints.products.get}`;
    
    const params = new URLSearchParams();
    if (filter_sizes.length > 0 || filter_colors.length > 0 || search_key.length > 0) {
      params.append('filter_applied', 'true');
    }
    if (search_key.length > 0) {
      params.append('keyword', search_key);
    }
    if (filter_sizes.length > 0) {
      params.append('available_sizes', filter_sizes);
    }
    if (filter_colors.length > 0) {
      params.append('target_color_code', filter_colors.join(','));
    }
    
    link += `?${params.toString()}`;
    
    console.log('Constructed URL: ', link);
    
    const response = await axios.get(link);
    dispatch(productsSuccess(response?.data));
  } catch (error) {
    console.error('Error fetching products: ', error);
    dispatch(productsFail(error?.response?.data?.message || 'Error fetching products'));
  }
};

export const clearProductsError = () => async (dispatch) => {
  dispatch(clearError());
};
