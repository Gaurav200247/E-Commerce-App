import React from "react";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/UserAction";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    // console.log(loginEmail, loginPassword);
  };

  return (
    <form className="login-form" onSubmit={loginSubmit}>
      <div className="login-email">
        <EmailIcon className="mr-3" />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          value={loginEmail}
          onChange={(e) => setloginEmail(e.target.value)}
        />
      </div>

      <div className="login-password mt-2">
        <LockIcon className="mr-3" />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          value={loginPassword}
          onChange={(e) => setloginPassword(e.target.value)}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setshowPassword(!showPassword)}
                  onMouseDown={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <span className="forgot-pass-link-container flex justify-end items-center w-full ">
        <Link to="/password/forgot" className="m-5 text-pink-700 text-right ">
          Forgot Password ?
        </Link>
      </span>

      <input
        type="submit"
        className="login-btn bg-blue-600 text-white hover:bg-blue-500"
      />
    </form>
  );
};

export default LoginForm;
