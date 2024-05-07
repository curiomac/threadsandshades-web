import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { getCart } from "./cartAction";
import { createOrderFail, createOrderRequest, createOrderSuccess, orderFail, orderRequest, orderSuccess, ordersFail, ordersRequest, ordersSuccess } from "../slices/orderSlice";
import { getAuthToken } from "../../helpers/auth-token/getAuthToken";

export const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.order.create}`,
      payload,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    const cart_payload = {
        user_id: payload?.user_id
    }
    dispatch(getCart(cart_payload))
    dispatch(createOrderSuccess(response?.data));
  } catch (error) {
    dispatch(createOrderFail(error?.response?.data?.message));
  }
};
export const getOrder = (payload) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.order.get}/${payload?.order_id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    dispatch(orderSuccess(response?.data));
  } catch (error) {
    dispatch(orderFail(error?.response?.data?.message));
  }
};
export const getOrders = (payload) => async (dispatch) => {
  try {
    dispatch(ordersRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.orders.get}/${payload?.user_id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getAuthToken()}`,
        },
      }
    );
    dispatch(ordersSuccess(response?.data));
  } catch (error) {
    dispatch(ordersFail(error?.response?.data?.message));
  }
};