import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import {
  ratingsFail,
  ratingsRequest,
  ratingsSuccess,
} from "../slices/ratingsSlice";

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
