import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { clearError, vehiclesFail, vehiclesRequest, vehiclesSuccess } from "../slices/vehiclesSlice";

export const getVehicles = (payload) => async (dispatch) => {

    let isFetchingVehicles = false;

    if (isFetchingVehicles) {
        return;
    }

    try {
        isFetchingVehicles = true;
        dispatch(vehiclesRequest())
        const response = await axios.get(`${BASE_URL}/${endpoints.vehicles.get}?page=${payload.page}`,);
        dispatch(vehiclesSuccess(response?.data));
    } catch (error) {
        dispatch(vehiclesFail(error?.response?.data?.message));
    } finally {
        isFetchingVehicles = false;
    }
}

export const clearVehiclesError = () => async (dispatch) => {
    dispatch(clearError())
}
