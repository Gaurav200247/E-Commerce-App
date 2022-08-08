import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <h1>Your Order has been placed Successfully !!!</h1>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
