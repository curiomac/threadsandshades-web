import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  ratingCreateFail,
  ratingCreateRequest,
  ratingCreateSuccess,
  ratingsFail,
  ratingsRequest,
  ratingsSuccess,
} from "../slices/ratingsSlice";
import { getAuthToken } from "../../helpers/auth-token/getAuthToken";

export const getRatings = (payload) => async (dispatch) => {
  try {
    dispatch(ratingsRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.ratings.get}?product_id=${payload.product_id}`
    );
    dispatch(ratingsSuccess(response?.data));
  } catch (err) {
    dispatch(ratingsFail(err?.response?.data?.message));
  }
};
export const createRating = (payload) => async (dispatch) => {
  try {
    dispatch(ratingCreateRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.rating.create}`, payload,      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    dispatch(ratingCreateSuccess(response?.data));
    const getRatingsPayload = {
      product_id: payload?.product_id
    }
    dispatch(getRatings(getRatingsPayload))
  } catch (err) {
    dispatch(ratingCreateFail(err?.response?.data));
  }
};
