import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import productsReducer from "../slices/productsSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import wishListReducer from "../slices/wishListSlice";

const reducer = combineReducers({
    authState: authReducer,
    userState: userReducer,
    themeState: themeReducer,
    productsState: productsReducer,
    productState: productReducer,
    cartState: cartReducer,
    wishListState: wishListReducer,
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})


export default store;