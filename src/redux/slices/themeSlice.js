import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name: 'theme',
    initialState:{
        loading: false,
    },
    reducers:{
        themeRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        themeSuccess(state, action){
            return{
                ...state,
                loading: false,
                theme: action.payload
            }
        },
        themeFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = themeSlice;

export const {themeRequest,themeFail,themeSuccess} = actions

export default reducer;