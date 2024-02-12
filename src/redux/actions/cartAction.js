import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  cartFail,
  cartRequest,
  cartSuccess,
  cartAddFail,
  cartAddRequest,
  cartAddSuccess,
  cartRemoveFail,
  cartRemoveRequest,
  cartRemoveSuccess,
} from "../slices/cartSlice";

export const getCart = (payload) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.cart.get}/${payload.user_id}`
    );
    dispatch(cartSuccess(response?.data?.cart));
  } catch (error) {
    dispatch(cartFail(error?.response?.data?.message));
  }
};

export const addCart = (payload) => async (dispatch) => {
  try {
    dispatch(cartAddRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.add}`, payload
    );
    dispatch(cartAddSuccess(response?.data?.cart));
  } catch (error) {
    dispatch(cartAddFail(error?.response?.data?.message));
  }
};
export const removeCart = (payload) => async (dispatch) => {
  const formattedPayload = `${
    payload?.product_id ? `?product_id=${payload?.product_id}` : ""
  }${payload?.user_id ? `&user_id=${payload?.user_id}` : ""}`;
  console.log('formattedPayload: ', formattedPayload);
  try {
    dispatch(cartRemoveRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.remove}${formattedPayload}`
    );
    dispatch(cartRemoveSuccess(response?.data?.cart));
  } catch (error) {
    dispatch(cartRemoveFail(error?.response?.data?.message));
  }
};

export const clearCartError = () => async (dispatch) => {
  dispatch(clearError());
};
