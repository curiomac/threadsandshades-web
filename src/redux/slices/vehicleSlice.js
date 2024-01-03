import { createSlice } from "@reduxjs/toolkit";


const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState:{
        loading: false,
        vehicle: {}
    },
    reducers:{
        vehicleRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        vehicleSuccess(state, action){
            return{
                ...state,
                loading: false,
                vehicle: action.payload.vehicle
            }
        },
        vehicleFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearVehicle(state, action){
            return{
                ...state,
                vehicle: {}
            }
        },
        clearError(state, action){
            return{
                ...state,
                error: null
            }
        }
    }
});

const {actions, reducer} = vehicleSlice;

export const {vehicleRequest,vehicleFail,vehicleSuccess, clearVehicle, clearError} = actions

export default reducer;