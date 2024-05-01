import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    status: null,
    code: false,
    message: null,
    user: {},
  },
  reducers: {
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
        message: action.payload.message,
        code: true,
        status: "success",
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload,
        status: "error",
        code: false,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
        code: true,
        status: "success",
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload,
        status: "error",
        code: false,
      };
    },
    clearAuth(state, action) {
      return {
        ...state,
        loading: false,
        code: false,
        status: null,
        user: {},
        message: null,
      };
    },
    clearAuthCode(state, action) {
      return {
        ...state,
        loading: false,
        code: false,
      };
    },
    clearAuthStatus(state, action) {
      return {
        ...state,
        loading: false,
        status: null,
      };
    },
    clearAuthMessage(state, action) {
      return {
        ...state,
        loading: false,
        message: null,
      };
    },
    userProfileRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
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
        isAuthenticated: false,
        loading: false,
      };
    },
    userProfileImageRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
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
        isAuthenticated: false,
        loading: false,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        user_image: {}
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
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  clearAuth,
  clearAuthCode,
  clearAuthStatus,
  clearAuthMessage,
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
