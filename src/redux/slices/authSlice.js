import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    otp_loading: true,
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    otpRequest(state, action) {
      return {
        ...state,
        otp_loading: true,
      };
    },
    otpSuccess(state, action) {
      return {
        otp_loading: false,
        isAuthenticated: false,
        expires_on: action.payload.expires_on,
        code: action.payload.code,
      };
    },
    otpFail(state, action) {
      return {
        ...state,
        otp_loading: false,
        otp_error: action.payload,
      };
    },
    clearOtpError(state, action) {
      return {
        ...state,
        otp_loading: false,
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
        code: action.payload.code,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        auth_error: action.payload,
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
        auth_error: action.payload,
      };
    },
    clearAuthErrorClear(state, action) {
      return {
        ...state,
        loading: false,
        auth_error: action.payload,
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
    userProfileRequest(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
      };
    },
    userProfileSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    userProfileFail(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    },
    userProfileImageRequest(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
      };
    },
    userProfileImageSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user_image: action.payload.avatar,
      };
    },
    userProfileImageFail(state, action) {
      return {
        ...state,
        isAuthenticated: true,
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
    updateProfileImageRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updateProfileImageSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user_image: action.payload.avatar,
        isUpdated: true,
      };
    },
    updateProfileImageFail(state, action) {
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
  clearAuthErrorClear,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  userProfileRequest,
  userProfileSuccess,
  userProfileFail,
  userProfileImageRequest,
  userProfileImageSuccess,
  userProfileImageFail,
  logoutSuccess,
  logoutFail,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileImageFail,
  updateProfileImageRequest,
  updateProfileImageSuccess,
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
