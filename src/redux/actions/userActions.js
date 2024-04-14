import {
  clearError,
  loginFail,
  loginRequest,
  loginSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileImageRequest,
  updateProfileImageSuccess,
  updateProfileImageFail,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearSuccess,
  otpRequest,
  otpSuccess,
  otpFail,
  userProfileRequest,
  userProfileSuccess,
  userProfileFail,
  userProfileImageRequest,
  userProfileImageSuccess,
  userProfileImageFail,
} from "../slices/authSlice";
import axios from "axios";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  userFail,
  userRequest,
  usersFail,
  usersRequest,
  usersSuccess,
  userSuccess,
} from "../slices/userSlice";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { getCart } from "./cartAction";
import { getWishList } from "./wishListAction";

const getToken = () => {
  return localStorage.getItem("token") || "";
};

export const sendOtp = (payload) => async (dispatch) => {
  try {
    dispatch(otpRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.otp.post}`,
      payload
    );
    dispatch(otpSuccess(response?.data));
  } catch (error) {
    dispatch(otpFail(error?.response?.data?.message));
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.user.login}`,
      payload,
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(response?.data));
    const items_payload = {
      user_id: response?.data?.user?._id,
    };
    dispatch(getWishList(items_payload));
    dispatch(getCart(items_payload));
    const parse_res = JSON.parse(response?.request?.response) || {};
    localStorage.setItem("token", parse_res?.token);
  } catch (error) {
    dispatch(loginFail(error?.response?.data?.message));
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(
      `${BASE_URL}/${endpoints.user.register}`,
      payload
    );
    dispatch(registerSuccess(response?.data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(userProfileRequest());
    const response = await axios.get(`${BASE_URL}/${endpoints.profile.get}`, {
      withCredentials: true,
      headers: {
        Authorization: `${getToken()}`,
      },
    });
    dispatch(userProfileSuccess(response?.data));
    const items_payload = {
      user_id: response?.data?.user?._id,
    };
    dispatch(getWishList(items_payload));
    dispatch(getCart(items_payload));
  } catch (error) {
    dispatch(userProfileFail(error.response.data.message));
  }
};
export const getUserProfileImage = (user_id) => async (dispatch) => {
  try {
    dispatch(userProfileImageRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.profile.get_image}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    );
    dispatch(userProfileImageSuccess(response?.data));
  } catch (error) {
    dispatch(userProfileImageFail(error.response.data.message));
  }
};
export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};
export const updateProfile = (user_id, payload) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const response = await axios.put(
      `${BASE_URL}/${endpoints.profile.update}/${user_id}`,
      payload
    );
    dispatch(updateProfileSuccess(response?.data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};
export const updateProfileImage = (user_id, payload) => async (dispatch) => {
  try {
    dispatch(updateProfileImageRequest());
    const response = await axios.put(
      `${BASE_URL}/${endpoints.profile.update_image}/${user_id}`,
      payload
    );
    dispatch(updateProfileImageSuccess(response?.data));
  } catch (error) {
    dispatch(updateProfileImageFail(error.response.data.message));
  }
};
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios.put("/api/v1/password/change", formData, config);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/password/forgot",
      formData,
      config
    );
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      formData,
      config
    );
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

export const clearAuthError = () => (dispatch) => {
  dispatch(clearError());
};
export const clearAuthSuccess = () => (dispatch) => {
  dispatch(clearSuccess());
};

export const getUsers = async (dispatch) => {
  try {
    dispatch(usersRequest());

    const { data } = await axios.get(`/api/v1/admin/users`);
    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());

    await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
export const updateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios.put(`/api/v1/admin/user/${id}`, formData, config);
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};
