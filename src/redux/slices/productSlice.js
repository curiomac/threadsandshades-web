import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState:{
        loading: false,
        product: {},
        products_group: {}
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
                product: action.payload.product,
                products_group: action.payload.products_group,
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
                product: {},
                products_group: {}
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