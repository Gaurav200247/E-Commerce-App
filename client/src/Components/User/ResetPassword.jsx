import React, { useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearErrors, resetUserPassword } from "../../Actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import MetaData from "../Layouts/MetaData";
import "./ResetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showResetPassword, setshowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ResetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("resetPassword", resetPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetUserPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully !!");

      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Change Password" />

          <div className="ResetPasswordContainer">
            <div className="ResetPasswordBox">
              <h2 className="ResetPasswordHeading">Change Password</h2>

              <form
                className="ResetPasswordForm"
                onSubmit={ResetPasswordSubmit}
              >
                <div className="update-name">
                  <LockIcon className="mr-5" />
                  <TextField
                    label="New Password"
                    name="oldpassword"
                    variant="outlined"
                    type={showResetPassword ? "text" : "password"} // <-- This is where the magic happens
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setshowResetPassword(!showResetPassword)
                            }
                            onMouseDown={() =>
                              setshowResetPassword(!showResetPassword)
                            }
                          >
                            {showResetPassword ? (
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
                    label="Re-Enter Password"
                    name="confirmpassword"
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
                  className="ResetPasswordBtn bg-green-600 text-white hover:bg-green-700"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
