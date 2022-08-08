import React, { useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearErrors, updatePassword } from "../../Actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import MetaData from "../Layouts/MetaData";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("OldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully !!");

      navigate("/account");

      dispatch({ type: "UpdatePasswordReset" });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Update Password" />

          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={UpdatePasswordSubmit}
              >
                <div className="update-password">
                  <LockOpenIcon className="mr-5" />
                  <TextField
                    label="Old Password"
                    name="oldpassword"
                    variant="outlined"
                    type={showOldPassword ? "text" : "password"} // <-- This is where the magic happens
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            onMouseDown={() =>
                              setShowOldPassword(!showOldPassword)
                            }
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="update-name">
                  <LockIcon className="mr-5" />
                  <TextField
                    label="New Password"
                    name="oldpassword"
                    variant="outlined"
                    type={showNewPassword ? "text" : "password"} // <-- This is where the magic happens
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            onMouseDown={() =>
                              setShowNewPassword(!showNewPassword)
                            }
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="update-name">
                  <VpnKeyIcon className="mr-5" />
                  <TextField
                    label="Confirm Password"
                    name="oldpassword"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            onMouseDown={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <input
                  type="submit"
                  value="Change Password"
                  className="updatePasswordBtn bg-teal-600 text-white hover:bg-teal-700"
                />
              </form>
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default UpdatePassword;
