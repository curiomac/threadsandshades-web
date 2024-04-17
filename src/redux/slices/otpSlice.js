import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    expire_on: null,
    code: false,
    message: null,
    status: null,
  },
  reducers: {
    otpSendRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    otpSendSuccess(state, action) {
      return {
        ...state,
        loading: false,
        expires_on: action.payload.expires_on,
        code: true,
        message: action.payload.message,
        status: "success",
      };
    },
    otpSendFail(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload,
        status: 'error',
        code: false,
      };
    },
    clearOtp(state, action) {
      return {
        ...state,
        loading: false,
        expire_on: null,
        code: false,
        message: null,
        status: null,
      };
    },
    clearOtpCode(state, action) {
      return {
        ...state,
        loading: false,
        code: false,
      };
    },
    clearOtpMessage(state, action) {
      return {
        ...state,
        loading: false,
        message: null,
      };
    },
    clearOtpStatus(state, action) {
      return {
        ...state,
        loading: false,
        status: null,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  otpSendRequest,
  otpSendSuccess,
  otpSendFail,
  clearOtp,
  clearOtpCode,
  clearOtpMessage,
  clearOtpStatus,
} = actions;

export default reducer;
