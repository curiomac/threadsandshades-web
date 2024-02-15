import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { themeFail, themeRequest, themeSuccess } from "../slices/themeSlice";

export const getTheme = () => async (dispatch) => {
console.log("process.env.REACT_APP_DEFAULT_THEME_ID", process.env.REACT_APP_DEFAULT_THEME_ID);
    try {
        const getThemeId = () => {
            if (localStorage.getItem('theme-id') !== undefined || localStorage.getItem('theme-id') !== 'undefined') {
                return localStorage.getItem('theme-id');
            } else {
                return process.env.REACT_APP_DEFAULT_THEME_ID;
            }
        }
        dispatch(themeRequest())
        const response = await axios.get(`${BASE_URL}/${endpoints.theme.get}/${getThemeId()}`);
        dispatch(themeSuccess(response?.data.theme));
    } catch (error) {
        dispatch(themeFail(error));
    }
}
