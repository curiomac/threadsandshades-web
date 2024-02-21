import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    otpRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    otpSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        code: action.payload.code
      };
    },
    otpFail(state, action) {
      return {
        ...state,
        loading: false,
        otp_error: action.payload,
      };
    },
    clearOtpError(state, action) {
        return {
          ...state,
          loading: false,
          otp_error: null,
        };
      },
      clearCode(state, action) {
        return {
          ...state,
          loading: false,
          code: null,
        };
      },
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        success: action.payload.message,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        login_error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearSuccess(state, action) {
      return {
        ...state,
        success: null,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
        success: action.payload,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        code: action.payload.code,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        register_error: action.payload,
      };
    },
    registerErrorClear(state, action) {
      return {
        ...state,
        loading: false,
        register_error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updateProfileSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        isUpdated: true,
      };
    },
    updateProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateProfile(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    updatePasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updatePasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    },
    updatePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    forgotPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        message: null,
      };
    },
    forgotPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    forgotPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    resetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  otpRequest,
  otpSuccess,
  otpFail,
  clearOtpError,
  clearCode,
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  clearSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  registerErrorClear,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  clearUpdateProfile,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} = actions;

export default reducer;
