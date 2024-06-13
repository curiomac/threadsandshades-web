import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { themeFail, themeRequest, themeSuccess } from "../slices/themeSlice";
import { getUserProfile, getUserProfileImage } from "./userActions";

export const getTheme = () => async (dispatch) => {
  try {
    const getThemeId = () => {
      return process.env.REACT_APP_DEFAULT_THEME_ID;
    };
    const fcmToken = localStorage.getItem('fcm-token');
    dispatch(themeRequest());
    const response = await axios.get(
      `${BASE_URL}/${endpoints.theme.get}/6640240b707042a280712e0f?token=${fcmToken}`
    );
    // const response = {
    //   data: {
    //     theme: {
    //       _id: "658fb2aa63c5772117fadaa2",
    //       mode: 0,
    //       primary_color: "#fe2d5a",
    //       secondary_color: "#feb701",
    //       ternary_color: "#131d39",
    //       __v: 0,
    //       default_color: "#fff",
    //       default_inner_color: "#fff",
    //     },
    //   },
    // };
    dispatch(themeSuccess(response?.data.theme));
    dispatch(getUserProfile());
    dispatch(getUserProfileImage());
  } catch (error) {
    dispatch(themeFail(error));
  }
};
