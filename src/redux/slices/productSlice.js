import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState:{
        loading: false,
        product: {}
    },
    reducers:{
        productRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        productSuccess(state, action){
            return{
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearProduct(state, action){
            return{
                ...state,
                product: {}
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

const {actions, reducer} = productSlice;

export const {productRequest,productFail,productSuccess, clearProduct, clearError} = actions

export default reducer;