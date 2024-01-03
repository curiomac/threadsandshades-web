import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import vehiclesReducer from "../slices/vehiclesSlice";
import vehicleReducer from "../slices/vehicleSlice";

const reducer = combineReducers({
    authState: authReducer,
    userState: userReducer,
    themeState: themeReducer,
    vehiclesState: vehiclesReducer,
    vehicleState: vehicleReducer,
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})


export default store;