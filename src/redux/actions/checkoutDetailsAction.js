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
  try {
    dispatch(checkoutDetailsRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.checkout_details.get}/${payload.user_id}`
    );
    console.log("response: ", response?.data);
    dispatch(checkoutDetailsSuccess(response?.data));
  } catch (error) {
    dispatch(checkoutDetailsFail(error?.response?.data?.message));
  }
};