import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { themeFail, themeRequest, themeSuccess } from "../slices/themeSlice";

export const getTheme = () => async (dispatch) => {
  console.log(
    "process.env.REACT_APP_DEFAULT_THEME_ID",
    process.env.REACT_APP_DEFAULT_THEME_ID
  );
  try {
    const getThemeId = () => {
      if (
        localStorage.getItem("theme-id") !== undefined ||
        localStorage.getItem("theme-id") !== "undefined"
      ) {
        return localStorage.getItem("theme-id");
      } else {
        return process.env.REACT_APP_DEFAULT_THEME_ID;
      }
    };
    dispatch(themeRequest());
    // const response = await axios.get(`${BASE_URL}/${endpoints.theme.get}/${getThemeId()}`);
    const response = {
      data: {
        theme: {
          _id: "658fb2aa63c5772117fadaa2",
          mode: 0,
          primary_color: "#fe2d5a",
          secondary_color: "#feb701",
          ternary_color: "#131d39",
          __v: 0,
          default_color: "#fff",
          default_inner_color: "#fff",
        },
      },
    };
    dispatch(themeSuccess(response?.data.theme));
  } catch (error) {
    dispatch(themeFail(error));
  }
};
