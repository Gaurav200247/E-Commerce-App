import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer(
  { user: {} },
  {
    // -------------------Login User-------------------
    LoginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      // state.user = null;
      // state.error = null;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // state.error = null;
    },
    LoginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // -------------------Register User-------------------
    RegisterUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      // state.user = null;
      // state.error = null;
    },
    RegisterUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // state.error = null;
    },
    RegisterUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // -------------------Loading User-------------------
    LoadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      // state.user = null;
      // state.error = null;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // state.error = null;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // -------------------User Log Out-------------------
    LogOutUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      // state.error = null;
    },
    LogOutUserFail: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      // state.user = null;
      state.error = action.payload;
    },
    // -------------------Clear All Errors-------------------
    ClearErrors: (state, action) => {
      // state.loading = false;
      // state.isAuthenticated = false;
      // state.user = null;
      state.error = null;
    },
  }
);

export const ProfileReducer = createReducer(
  {},
  {
    // ----------------- Update User Profile -----------------
    UpdateProfileRequest: (state, action) => {
      state.loading = true;
    },
    UpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateProfileReset: (state, action) => {
      state.isUpdated = false;
    },
    // ----------------- Update User Password -----------------
    UpdatePasswordRequest: (state, action) => {
      state.loading = true;
    },
    UpdatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdatePasswordReset: (state, action) => {
      state.isUpdated = false;
    },
  }
);

export const ForgotPasswordReducer = createReducer(
  {},
  {
    // ----------------- Forgot Password -----------------
    ForgotPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ForgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    ForgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ----------------- Reset Password -----------------
    ResetPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    ResetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // -------------------Clear All Errors-------------------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const getAllUsersReducer = createReducer(
  { users: [] },
  {
    GetAllUserRequest: (state, action) => {
      state.loading = true;
    },
    GetAllUserSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    GetAllUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const UserDetailsReducer = createReducer(
  { user: {} },
  {
    UserDetailsRequest: (state, action) => {
      state.loading = true;
    },
    UserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    UserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const UpdateDeleteUserReducer = createReducer(
  {},
  {
    //---------------------- update User----------------------
    UpdateUserRequest: (state) => {
      state.loading = true;
    },
    UpdateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    UpdateUserFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.updateError = action.payload;
    },
    UpdateUserReset: (state, action) => {
      state.isUpdated = false;
    },
    // ---------------------- delete User----------------------
    DeleteUserRequest: (state) => {
      state.loading = true;
    },
    DeleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    DeleteUserFail: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deleteError = action.payload;
    },
    DeleteUserReset: (state, action) => {
      state.isDeleted = false;
    },
    // ---------------------- clear Errors ----------------------
    ClearErrors: (state) => {
      state.deleteError = null;
      state.updateError = null;
    },
  }
);
