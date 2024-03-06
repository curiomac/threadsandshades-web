import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState:{
        loading: false,
        products: []
    },
    reducers:{
        productsRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        productsSuccess(state, action){
            return{
                ...state,
                loading: false,
                products: action.payload.products || [],
                totalCounts: action.payload.totalCounts,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                filters_applied: action.payload.filters_applied,
                filters_available: action.payload.filters_available,
            }
        },
        productsFail(state, action){
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

const {actions, reducer} = productsSlice;

export const {productsRequest,productsFail,productsSuccess, clearError} = actions

export default reducer;