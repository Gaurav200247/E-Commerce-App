import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { useDispatch } from "react-redux";
import { registerUser } from "../../Actions/UserAction";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [showPassword, setshowPassword] = useState(false);

  const RegisterSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    // console.log(myForm);

    dispatch(registerUser(myForm));
  };

  const RegisterDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <form
      className="signup-form"
      encType="multipart/form-data"
      onSubmit={RegisterSubmit}
    >
      <div className="signup-name">
        <p className="w-[20%] flex justify-center items-center">
          <FaceIcon className="mr-3" />
        </p>

        <TextField
          className="w-[80%]"
          label="Username"
          name="name"
          variant="outlined"
          type="text"
          onChange={RegisterDataChange}
        />
      </div>

      <div className="signup-email">
        <p className="w-[20%] flex justify-center items-center">
          <EmailIcon className="mr-3" />
        </p>

        <TextField
          className="w-[80%]"
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          onChange={RegisterDataChange}
        />
      </div>

      <div className="signup-password">
        <p className="w-[20%] flex justify-center items-center">
          <LockOpenIcon className="mr-3" />
        </p>
        <TextField
          className="w-[80%]"
          label="Password"
          name="password"
          variant="outlined"
          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          onChange={RegisterDataChange}
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

      <div className="signup-image" id="registerImage">
        <img
          src={avatarPreview}
          alt="Avatar Preview"
          className="w-[20%] ml-2"
        />
        <input
          type="file"
          name="avatar"
          onChange={RegisterDataChange}
          className="w-[80%]"
        />
      </div>

      <input
        type="submit"
        className="signup-btn bg-purple-600 text-white hover:bg-purple-500"
      />
    </form>
  );
};

export default RegisterForm;
