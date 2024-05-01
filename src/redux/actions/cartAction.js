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
  cartUpdateFail,
  cartUpdateRequest,
  cartUpdateSuccess,
  cartRemoveFail,
  cartRemoveRequest,
  cartRemoveSuccess,
} from "../slices/cartSlice";
import {
  getCheckoutDetails,
  getTemporaryCheckoutDetails,
} from "./checkoutDetailsAction";
import { getAuthToken } from "../../helpers/auth-token/getAuthToken";
import { getWishList } from "./wishListAction";

export const getCart = (payload) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.cart.get}/${payload.user_id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    const checkout_details_payload = {
      user_id: payload?.user_id,
    };
    dispatch(getCheckoutDetails(checkout_details_payload));
    dispatch(cartSuccess(response?.data?.cart));
  } catch (error) {
    dispatch(cartFail(error?.response?.data?.message));
  }
};
export const getTemporaryCart = (payload, action) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.temp_get}`,
      payload
    );
    dispatch(getTemporaryCheckoutDetails(payload));
    dispatch(cartSuccess(response?.data?.cart));
    const localStorageTarget = response?.data?.cart?.cart_items?.map((item) => {
      return {
        product_id: item?.product?._id,
        selected_product_details: item?.selected_product_details,
      };
    });
    localStorage.setItem("cart-items", JSON.stringify(localStorageTarget));
  } catch (error) {
    dispatch(cartFail(error?.response?.data?.message));
  }
};

export const addCart = (payload) => async (dispatch) => {
  try {
    dispatch(cartAddRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.add}`,
      payload,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    const checkout_details_payload = {
      user_id: payload?.user_id,
    };
    dispatch(getCheckoutDetails(checkout_details_payload));
    dispatch(getWishList(checkout_details_payload))
    console.log("[logger] response?.data: ", response?.data);
    dispatch(cartAddSuccess(response?.data));
  } catch (error) {
    dispatch(cartAddFail(error?.response?.data?.message));
  }
};
export const updateCart = (payload) => async (dispatch) => {
  try {
    dispatch(cartUpdateRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.update}`,
      payload,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    const checkout_details_payload = {
      user_id: payload?.user_id,
    };
    dispatch(getCheckoutDetails(checkout_details_payload));
    dispatch(cartUpdateSuccess(response?.data?.cart));
    localStorage.removeItem("cart-items");
  } catch (error) {
    dispatch(cartUpdateFail(error?.response?.data?.message));
  }
};
export const removeCart = (payload) => async (dispatch) => {
  const formattedPayload = `${
    payload?.product_id ? `?product_id=${payload?.product_id}` : ""
  }${payload?.user_id ? `&user_id=${payload?.user_id}` : ""}`;
  console.log("formattedPayload: ", formattedPayload);
  try {
    dispatch(cartRemoveRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.cart.remove}${formattedPayload}`,{},
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    const checkout_details_payload = {
      user_id: payload?.user_id,
    };
    dispatch(getCheckoutDetails(checkout_details_payload));
    dispatch(cartRemoveSuccess(response?.data?.cart));
  } catch (error) {
    dispatch(cartRemoveFail(error?.response?.data?.message));
  }
};

export const clearCartError = () => async (dispatch) => {
  dispatch(clearError());
};
