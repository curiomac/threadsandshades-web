import { createSlice } from "@reduxjs/toolkit";


const ratingsSlice = createSlice({
    name: 'ratings',
    initialState:{
        loading: false,
        ratings: {},
        ratingss_group: {}
    },
    reducers:{
        ratingsRequest(state, action){
            return{
                ...state,
                loading: true
            }
        },
        ratingsSuccess(state, action){
            return{
                ...state,
                loading: false,
                ratings: action.payload.ratings,
            }
        },
        ratingsFail(state, action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearRatings(state, action){
            return{
                ...state,
                ratings: {},
                ratingss_group: {}
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

const {actions, reducer} = ratingsSlice;

export const {ratingsRequest,ratingsFail,ratingsSuccess, clearRatings, clearError} = actions

export default reducer;