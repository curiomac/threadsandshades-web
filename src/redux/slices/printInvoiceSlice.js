import { createSlice } from "@reduxjs/toolkit";


const printInvoiceSlice = createSlice({
    name: 'printInvoice',
    initialState:{
        loading: false,
    },
    reducers:{
        printInvoiceRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        printInvoiceSuccess(state, action){
            return{
                ...state,
                loading: false,
                printInvoice: action.payload
            }
        },
        printInvoiceFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = printInvoiceSlice;

export const {printInvoiceRequest,printInvoiceFail,printInvoiceSuccess} = actions

export default reducer;