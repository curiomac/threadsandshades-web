import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import productsReducer from "../slices/productsSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import checkoutDetailsReducer from "../slices/checkoutDetailsSlice";
import wishListReducer from "../slices/wishListSlice";
import resCartReducer from "../slices/resCartSlice";
import addressReducer from "../slices/addressSlice";
import orderReducer from "../slices/orderSlice";

const reducer = combineReducers({
    authState: authReducer,
    userState: userReducer,
    themeState: themeReducer,
    productsState: productsReducer,
    productState: productReducer,
    cartState: cartReducer,
    checkoutDetailsState: checkoutDetailsReducer,
    wishListState: wishListReducer,
    checkoutDetailsState: checkoutDetailsReducer,
    resCartState: resCartReducer,
    addressState: addressReducer,
    orderState: orderReducer,
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})


export default store;