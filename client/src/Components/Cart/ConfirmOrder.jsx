import React from "react";
import "./ConfirmOrder.css";
import CheckOutSteps from "./CheckOutSteps";
import MetaData from "../Layouts/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const SubTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = SubTotal > 1000 ? 0 : 50;
  const Tax = SubTotal * 0.18;
  const TotalPrice = SubTotal + shippingCharges + Tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}, ${shippingInfo.state}, ${shippingInfo.country} `;

  const ProceedToPayment = () => {
    const data = {
      SubTotal,
      shippingPrice: shippingCharges,
      taxPrice: Tax,
      totalPrice: TotalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckOutSteps activeSteps={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h1>Shipping Info</h1>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name :</p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone No :</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <h1>Your Cart Items :</h1>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div key={item.product}>
                      <img src={item.image} alt={item.product} />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X {item.price}{" "}
                        <b>{`Total : ₹ ${item.price * item.quantity}`}</b>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="orderSummary">
          <h1>Order Summary</h1>

          <div>
            <div>
              <p>SubTotal</p>
              <span>₹ {SubTotal}</span>
            </div>
            <div>
              <p>Shipping Charges</p>
              <span>₹ {shippingCharges}</span>
            </div>
            <div>
              <p>GST</p>
              <span>₹ {Tax}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total : </b>
            </p>
            <span>₹ {TotalPrice}</span>
          </div>

          <button onClick={ProceedToPayment}>Proceed to Payment</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
