import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: {},
    orders: [],
  },
  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        order: action.payload.order,
        code: action.payload.code,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    orderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        order: action.payload.order,
        code: action.payload?.code,
      };
    },
    orderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    ordersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ordersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        code: action.payload?.code,
      };
    },
    ordersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearCode(state, action) {
      return {
        ...state,
        error: null,
        code: null,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderFail,
  createOrderSuccess,
  orderRequest,
  orderFail,
  orderSuccess,
  ordersRequest,
  ordersFail,
  ordersSuccess,
  clearError,
  clearCode,
} = actions;

export default reducer;
