import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    loading: false,
    address: {},
  },
  reducers: {
    addressRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addressSuccess(state, action) {
      return {
        ...state,
        loading: false,
        address: action.payload.checkout_details,
      };
    },
    addressFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    postalAddressRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    postalAddressSuccess(state, action) {
      return {
        ...state,
        loading: false,
        postalAddress: action.payload.postal_address,
      };
    },
    postalAddressFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    postalAddressClear(state, action) {
        return {
          ...state,
          loading: false,
          postalAddress: null,
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

const { actions, reducer } = addressSlice;

export const { addressRequest, addressFail, addressSuccess, postalAddressRequest, postalAddressFail, postalAddressSuccess,postalAddressClear, clearError } =
  actions;

export default reducer;
