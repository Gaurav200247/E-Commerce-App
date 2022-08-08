import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";

import { clearErrors, loadUser, updateProfile } from "../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Layouts/Loader/Loading";
import MetaData from "../Layouts/MetaData";
import "./UpdateProfile.css";

import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const UpdateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const UpdateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user.user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatarPreview(user.user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully!!");

      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: "UpdateProfileReset" });
    }
  }, [isUpdated, dispatch, navigate, user, error]);

  //   console.log(avatar, avatarPreview, name, email);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Update Profile" />

          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={UpdateProfileSubmit}
              >
                <div className="update-name">
                  <FaceIcon />
                  <TextField
                    label="Username"
                    name="name"
                    variant="filled"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="update-email">
                  <EmailIcon />
                  <TextField
                    label="Email"
                    name="email"
                    variant="filled"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="update-image" id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    onChange={UpdateProfileDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn bg-cyan-600 text-white hover:bg-cyan-700"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
