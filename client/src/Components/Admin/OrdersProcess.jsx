import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  ClearErrors,
  getOrderDetails,
  updateOrder,
} from "../../Actions/OrderAction";
import "./OrderProcess.css";

const OrdersProcess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const { order, error } = useSelector((state) => state.orderDetails);
  const { loading, isUpdated, updateError } = useSelector(
    (state) => state.UpdateDeleteOrder
  );

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(ClearErrors());
    }

    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (isUpdated) {
      toast.success("Order Updated SuccessFully !!");
      navigate("/admin/dashboard");
      dispatch({ type: "UpdateOrderReset" });
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, updateError, isUpdated, error, navigate, order, orderId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  // console.log(order);

  return (
    <>
      <MetaData title="Update Order -- Admin" />

      <div className="confirmOrderPageAdmin">
        <div className="order-admin-info-container">
          <div>
            <div className="confirmshippingArea">
              <h1>Shipping Info</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <h1>Payment</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h1>Order Status</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.OrderStatus && order.OrderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.OrderStatus && order.OrderStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="confirmCartItemsAdmin">
              <h1>Your Cart Items:</h1>
              <div className="confirmCartItemsContainerAdmin">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span className="truncate">
                        {item.quantity} X ₹{item.price}{" "}
                        <b className="truncate">
                          =₹{item.price * item.quantity}
                        </b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: order.OrderStatus === "Delivered" ? "none" : "block",
          }}
        >
          <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
            <h1>Process Order</h1>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">Choose Category</option>
                {order.OrderStatus === "Processing" && (
                  <option value="Shipped">Shipped</option>
                )}

                {order.OrderStatus === "Shipped" && (
                  <option value="Delivered">Delivered</option>
                )}
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || status === "" ? true : false}
            >
              Process
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrdersProcess;
