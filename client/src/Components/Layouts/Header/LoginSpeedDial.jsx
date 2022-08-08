import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../../../Actions/UserAction";
import { toast } from "react-toastify";

const LoginSpeedDial = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const dashBoard = () => {
    navigate("/admin/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logOutUser = () => {
    dispatch(logout());
    toast.success("Logout Successfully !!");
    navigate("/");
  };
  const Cart = () => {
    navigate("/cart");
  };

  const Options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon />,
      name: `cart`,
      func: Cart,
    },
    { icon: <ExitToAppIcon />, name: "LogOut", func: logOutUser },
  ];

  if (user.user.role === "admin") {
    // inserts an element at the start of an array
    Options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashBoard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="up"
        FabProps={{
          sx: {
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "secondary.main",
            },
          },
        }}
        icon={
          <img
            className="speedDialIcon"
            src={
              user.user.avatar.url &&
              (user.user.avatar.url === "profilePicUrl"
                ? "/Profile.png"
                : user.user.avatar.url)
            }
            alt="user"
          />
        }
      >
        {Options.map((item, index) => {
          return (
            <SpeedDialAction
              key={index}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </>
  );
};

export default LoginSpeedDial;
