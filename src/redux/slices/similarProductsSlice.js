import { createSlice } from "@reduxjs/toolkit";


const similarProductsSlice = createSlice({
    name: 'similarProducts',
    initialState:{
        loading: false,
        similar_products: []
    },
    reducers:{
        similarProductsRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        similarProductsSuccess(state, action){
            return{
                ...state,
                loading: false,
                similar_products: action.payload.products || [],
            }
        },
        similarProductsFail(state, action){
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

const {actions, reducer} = similarProductsSlice;

export const {similarProductsRequest,similarProductsFail,similarProductsSuccess, clearError} = actions

export default reducer;