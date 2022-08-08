import { createReducer } from "@reduxjs/toolkit";

export const createNewReviewReducer = createReducer(
  {},
  {
    CreateReviewRequest: (state, action) => {
      state.loading = true;
    },
    CreateReviewSuccess: (state, action) => {
      state.loading = false;
      state.review = action.payload; // gets success => true or false
    },
    CreateReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CreateReviewReset: (state, action) => {
      state.review = false;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const deleteReviewReducer = createReducer(
  {},
  {
    DeleteReviewRequest: (state, action) => {
      state.loading = true;
    },
    DeleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DeleteReviewFail: (state, action) => {
      state.loading = false;
      state.deleteError = action.payload;
    },
    DeleteReviewReset: (state, action) => {
      state.isDeleted = false;
    },
    ClearErrors: (state, action) => {
      state.deleteError = null;
    },
  }
);

export const getAllReviewsReducer = createReducer(
  { reviews: [] },
  {
    AllReviewRequest: (state, action) => {
      state.loading = true;
    },
    AllReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    AllReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);
