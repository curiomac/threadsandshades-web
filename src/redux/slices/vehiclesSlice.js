import { createSlice } from "@reduxjs/toolkit";


const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState:{
        loading: false,
        vehicles: []
    },
    reducers:{
        vehiclesRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        vehiclesSuccess(state, action){
            return{
                ...state,
                loading: false,
                vehicles: action.payload.vehicles,
                totalCounts: action.payload.totalCounts,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            }
        },
        vehiclesFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
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

const {actions, reducer} = vehiclesSlice;

export const {vehiclesRequest,vehiclesFail,vehiclesSuccess, clearError} = actions

export default reducer;