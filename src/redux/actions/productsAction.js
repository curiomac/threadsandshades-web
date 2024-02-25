import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { clearError, productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";

export const getProducts = (payload) => async (dispatch) => {

    try {
        dispatch(productsRequest())
        const response = await axios.get(`${BASE_URL}/${endpoints.products.get}`);
        console.log("Workingggg", response);
        dispatch(productsSuccess(response?.data));
    } catch (error) {
        dispatch(productsFail(error?.response?.data?.message));
    } 
}

export const clearProductsError = () => async (dispatch) => {
    dispatch(clearError())
}
