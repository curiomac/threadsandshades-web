import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  clearError,
  checkoutDetailsFail,
  checkoutDetailsRequest,
  checkoutDetailsSuccess,
} from "../slices/checkoutDetailsSlice";

export const getCheckoutDetails = (payload) => async (dispatch) => {
  const extended_payload = `${payload.coupon_code ? `?coupon_code=${payload.coupon_code}` : ``}`
  try {
    dispatch(checkoutDetailsRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.checkout_details.get}/${payload.user_id}${extended_payload}`
    );
    dispatch(checkoutDetailsSuccess(response?.data));
  } catch (error) {
    console.log("error: ", error?.response?.data?.message);
    dispatch(checkoutDetailsFail(error?.response?.data?.message));
  }
};