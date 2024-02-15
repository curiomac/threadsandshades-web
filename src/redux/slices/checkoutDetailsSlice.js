import { createSlice } from "@reduxjs/toolkit";

const checkoutDetailsSlice = createSlice({
  name: "checkoutDetails",
  initialState: {
    loading: false,
    checkoutDetails: {},
  },
  reducers: {
    checkoutDetailsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    checkoutDetailsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        checkoutDetails: action.payload.checkout_details,
      };
    },
    checkoutDetailsFail(state, action) {
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

const { actions, reducer } = checkoutDetailsSlice;

export const {
  checkoutDetailsRequest,
  checkoutDetailsFail,
  checkoutDetailsSuccess,
  clearError,
} = actions;

export default reducer;
