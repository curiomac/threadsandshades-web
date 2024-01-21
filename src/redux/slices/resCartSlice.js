import { createSlice } from "@reduxjs/toolkit";


const resCartSlice = createSlice({
    name: 'resCart',
    initialState:{
        proceed: false,
    },
    reducers:{
        proceedTrigger(state, action){
            return{
                ...state,
                proceed: action.payload,
            }
        },
    }
});

const {actions, reducer} = resCartSlice;

export const {proceedTrigger} = actions

export default reducer;