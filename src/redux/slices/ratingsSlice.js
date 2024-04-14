import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    loading: false,
    ratings: {},
    status: null
  },
  reducers: {
    ratingsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ratingsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        ratings: action.payload.ratings,
        message: action.payload.message,
        status: 'success'
      };
    },
    ratingsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: 'error'
      };
    },
    ratingCreateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ratingCreateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        ratings: action.payload.ratings,
        message: action.payload.message,
        status: 'success'
      };
    },
    ratingCreateFail(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        status: 'error'
      };
    },
    clearRatings(state, action) {
      return {
        ...state,
        ratings: {},
        error: null,
        status: null
      };
    },
    clearRatingsError(state, action) {
      return {
        ...state,
        error: null,
        status: null
      };
    },
  },
});

const { actions, reducer } = ratingsSlice;

export const {
  ratingsRequest,
  ratingsFail,
  ratingsSuccess,
  ratingCreateRequest,
  ratingCreateFail,
  ratingCreateSuccess,
  clearRatings,
  clearRatingsError,
} = actions;

export default reducer;
