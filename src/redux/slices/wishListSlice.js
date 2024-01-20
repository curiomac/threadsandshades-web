import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    loading: false,
    wishListItems: [],
    wishListCount: 0
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
      };
    },
    wishListAddFail(state, action) {
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

const { actions, reducer } = wishListSlice;

export const {
  wishListRequest,
  wishListFail,
  wishListSuccess,
  wishListAddRequest,
  wishListAddFail,
  wishListAddSuccess,
  clearError,
} = actions;

export default reducer;
