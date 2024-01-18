import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cartItems: [],
  },
  reducers: {
    cartRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    cartSuccess(state, action) {
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cart_items,
        cartCount: action.payload.cart_count,
      };
    },
    cartFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    cartAddRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    cartAddSuccess(state, action) {
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cart_items,
        cartCount: action.payload.cart_count,
      };
    },
    cartAddFail(state, action) {
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
  },
});

const { actions, reducer } = cartSlice;

export const {
  cartRequest,
  cartFail,
  cartSuccess,
  cartAddRequest,
  cartAddFail,
  cartAddSuccess,
  clearError,
} = actions;

export default reducer;
