import axios from "axios";

// logging In User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch({ type: "LoginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoginFail", payload: error.response.data.msg });
  }
};

// clearing all Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};

// Resigtering User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterUserRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch({ type: "RegisterUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "RegisterUserFail", payload: error.response.data.msg });
  }
};

// Loading User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type: "LoadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.msg });
  }
};

// LogOut User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: "LogOutUserSuccess" });
  } catch (error) {
    dispatch({ type: "LogOutUserFail", payload: error.response.data.msg });
  }
};

// Update User Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateProfileRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/v1/me/update", userData, config);

    dispatch({ type: "UpdateProfileSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "UpdateProfileFail", payload: error.response.data.msg });
  }
};

// Update User Password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdatePasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      userData,
      config
    );

    dispatch({ type: "UpdatePasswordSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "UpdatePasswordFail", payload: error.response.data.msg });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    console.log(email);
    dispatch({ type: "ForgotPasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/password/forgot", email, config);

    dispatch({ type: "ForgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "ForgotPasswordFail", payload: error.response.data.msg });
  }
};

// Reset Password
export const resetUserPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: "ResetPasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.patch(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: "ResetPasswordSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "ResetPasswordFail", payload: error.response.data.msg });
  }
};

// getAllUsers -- Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllUserRequest" });

    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: "GetAllUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "GetAllUserFail", payload: error.response.data.msg });
  }
};

// Delete User -- Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserRequest" });

    const { data } = await axios.delete(`/api/v1/admin/users/${id}`);

    dispatch({ type: "DeleteUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "DeleteUserFail", payload: error.response.data.msg });
  }
};

// update User -- Admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/users/${id}`,
      userData,
      config
    );

    dispatch({ type: "UpdateUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UpdateUserFail", payload: error.response.data.msg });
  }
};

// get User Details -- Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "UserDetailsRequest" });

    const { data } = await axios.get(`/api/v1/admin/users/${id}`);

    dispatch({ type: "UserDetailsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UserDetailsFail", payload: error.response.data.msg });
  }
};
