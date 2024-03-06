import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cartItems: [],
    cartCount: 0
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
    cartUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    cartUpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cart_items,
        cartCount: action.payload.cart_count,
      };
    },
    cartUpdateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    cartRemoveRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    cartRemoveSuccess(state, action) {
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cart_items,
        cartCount: action.payload.cart_count,
      };
    },
    cartRemoveFail(state, action) {
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
  cartUpdateRequest,
  cartUpdateFail,
  cartUpdateSuccess,
  cartRemoveRequest,
  cartRemoveFail,
  cartRemoveSuccess,
  clearError,
} = actions;

export default reducer;
