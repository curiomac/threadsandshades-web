import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import otpReducer from "../slices/otpSlice";
import themeReducer from "../slices/themeSlice";
import ratingsReducer from "../slices/ratingsSlice";
import productsReducer from "../slices/productsSlice";
import similarProductsReducer from "../slices/similarProductsSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import checkoutDetailsReducer from "../slices/checkoutDetailsSlice";
import wishListReducer from "../slices/wishListSlice";
import resCartReducer from "../slices/resCartSlice";
import addressReducer from "../slices/addressSlice";
import orderReducer from "../slices/orderSlice";
import printInvoiceReducer from "../slices/printInvoiceSlice";

const reducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  otpState: otpReducer,
  themeState: themeReducer,
  ratingsState: ratingsReducer,
  productsState: productsReducer,
  similarProductsState: similarProductsReducer,
  productState: productReducer,
  cartState: cartReducer,
  checkoutDetailsState: checkoutDetailsReducer,
  wishListState: wishListReducer,
  checkoutDetailsState: checkoutDetailsReducer,
  resCartState: resCartReducer,
  addressState: addressReducer,
  orderState: orderReducer,
  printInvoiceState: printInvoiceReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
