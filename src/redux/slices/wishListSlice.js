import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    loading: false,
    wishListItems: [],
    wishListCount: 0,
    message: null,
    toast: false
  },
  reducers: {
    wishListRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    wishListSuccess(state, action) {
      return {
        ...state,
        loading: false,
        wishListItems: action.payload.wish_list_items,
        wishListCount: action.payload.wish_list_count,
        message: action.payload.message,
        addedProduct: action.payload.added_product,
        toast: action.payload.toast
      };
    },
    wishListFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    wishListAddRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    wishListAddSuccess(state, action) {
      return {
        ...state,
        loading: false,
        wishListItems: action.payload.wish_list_items,
        wishListCount: action.payload.wish_list_count,
        message: action.payload.message,
        addedProduct: action.payload.added_product,
        toast: action.payload.toast
      };
    },
    wishListAddFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    wishListUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    wishListUpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        wishListItems: action.payload.wish_list_items,
        wishListCount: action.payload.wish_list_count,
      };
    },
    wishListUpdateFail(state, action) {
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
        message: null,
        toast: false
      };
    },
  },
});

const { actions, reducer } = wishListSlice;

export const {
  wishListRequest,
  wishListFail,
  wishListSuccess,
  wishListAddRequest,
  wishListAddFail,
  wishListAddSuccess,
  wishListUpdateRequest,
  wishListUpdateFail,
  wishListUpdateSuccess,
  clearError,
} = actions;

export default reducer;
