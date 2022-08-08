import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClearErrors, getOrderDetails } from "../../Actions/OrderAction";
import Loading from "../Layouts/Loader/Loading";
import MetaData from "../Layouts/MetaData";
import "./OrderDetails.css";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  // console.log(order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />

          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>

              <Typography>Shipping Info</Typography>

              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name :</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone :</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address :</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>

              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount :</p>
                  <span>₹{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>

              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.OrderStatus && order.OrderStatus === "Delivered"
                        ? "text-green-500"
                        : "text-orange-500"
                    }
                  >
                    {order.OrderStatus && order.OrderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>

              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} = ₹
                        {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
