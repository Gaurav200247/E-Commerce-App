import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarIcon from "@mui/icons-material/Star";
import { TextField } from "@mui/material";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../Actions/UserAction";
import "./UpdateUser.css";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { user, error } = useSelector((state) => state.usersDetails);
  const { loading, isUpdated, updateError } = useSelector(
    (state) => state.UpdateDeleteUser
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated SuccessFully !!");
      navigate("/admin/dashboard");
      dispatch({ type: "UpdateUserReset" });
    }
  }, [dispatch, updateError, isUpdated, error, navigate, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <MetaData title="Update User -- Admin" />

      <div className="update-user-box">
        <h1>Update User</h1>

        <form
          encType="multipart/form-data"
          onSubmit={updateUserSubmitHandler}
          className="update-user-form"
        >
          <div className="form-div">
            <SpellcheckIcon className="mr-5" />
            <TextField
              label="Enter User Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-div">
            <CurrencyRupeeIcon className="mr-5" />
            <TextField
              label="Enter User email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-div">
            <StarIcon className="mr-5" />
            <select
              onChange={(e) => setRole(e.target.value)}
              required
              className="role-select"
            >
              <option value="">Choose Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            className="update-user-btn bg-sky-600 text-white hover:bg-sky-500"
            type="submit"
            disabled={loading ? true : false}
          >
            Update User
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUserProfile;
