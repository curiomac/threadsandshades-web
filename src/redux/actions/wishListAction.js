import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  wishListFail,
  wishListRequest,
  wishListSuccess,
  wishListAddFail,
  wishListAddRequest,
  wishListAddSuccess,
} from "../slices/wishListSlice";
import { getCart } from "./cartAction";

export const getWishList = (payload) => async (dispatch) => {
  try {
    dispatch(wishListRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.wish_list.get}/${payload.user_id}`
    );
    dispatch(wishListSuccess(response?.data?.wishList));
  } catch (error) {
    dispatch(wishListFail(error?.response?.data?.message));
  }
};

export const moveWishList = (payload) => async (dispatch) => {
  const formattedPayload = `${
    payload?.product_id ? `?product_id=${payload?.product_id}` : ""
  }${payload?.user_id ? `&user_id=${payload?.user_id}` : ""}${
    payload?.is_from ? `&is_from=${payload?.is_from}` : ""
  }`;
  try {
    dispatch(wishListAddRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.wish_list.move}${formattedPayload}`
    );
    dispatch(wishListAddSuccess(response?.data?.wishList));
    if (payload?.is_from === "cart") {
      const cartPayload = {
        user_id: payload.user_id,
      };
      dispatch(getCart(cartPayload));
    }
  } catch (error) {
    dispatch(wishListAddFail(error?.response?.data?.message));
  }
};

export const clearWishListError = () => async (dispatch) => {
  dispatch(clearError());
};
