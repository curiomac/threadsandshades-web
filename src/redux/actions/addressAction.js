import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { postalAddressFail, postalAddressRequest, postalAddressSuccess } from "../slices/addressSlice";

export const getPostalAddress = (payload) => async (dispatch) => {
  try {
    dispatch(postalAddressRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.address.getPostalAddress}/${payload.postal_code}`
    );
    dispatch(postalAddressSuccess(response?.data));
  } catch (error) {
    dispatch(postalAddressFail(error?.response?.data?.message));
  }
};