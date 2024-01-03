import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { clearError, vehicleFail, vehicleRequest, vehicleSuccess } from "../slices/vehicleSlice";

export const getVehicle = (payload) => async (dispatch) => {

    let isFetchingVehicle = false;

    if (isFetchingVehicle) {
        return;
    }

    try {
        isFetchingVehicle = true;
        dispatch(vehicleRequest())
        const response = await axios.get(`${BASE_URL}/${endpoints.vehicle.get}/${payload.vehicle_id}`,);
        dispatch(vehicleSuccess(response?.data));
    } catch (error) {
        dispatch(vehicleFail(error?.response?.data?.message));
    } finally {
        isFetchingVehicle = false;
    }
}

export const clearVehicleError = () => async (dispatch) => {
    dispatch(clearError())
}
