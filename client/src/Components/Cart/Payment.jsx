import React, { useRef, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import CheckOutSteps from "./CheckOutSteps";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./payment.css";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClearErrors, createOrder } from "../../Actions/OrderAction";

const Payment = () => {
  // getting data from orderInfo which contains all prices like tax,subtotal.etc.
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  // rounding off payment amount...
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // making an order object with shipping info & payment info & later adding payment details
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.SubTotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  const SubmitHandler = async (e) => {
    console.log(order);
    e.preventDefault();

    payBtn.current.disabled = true; // onsubmit make btn disable

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      ); // post payment request to server with stripe

      // console.log(paymentData);
      // console.log(data);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return; // if stripe and elements does not exist then return

      const result = await stripe.confirmCardPayment(client_secret, {
        // confirm the card paymnet
        // putting card and user details
        payment_method: {
          card: elements.getElement(CardNumberElement), // getting card no. using element from CardElementNumber
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      // if confirm card payment fails
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        // if confirm card payment success
        if (result.paymentIntent.status === "succeeded") {
          // put payment info in order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          console.log(order);

          dispatch(createOrder(order)); // creating the order
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false; // if payment fails enable the paybtn to make re payment
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title="Payment Details" />
      <CheckOutSteps activeSteps={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={SubmitHandler}>
          <h1>Card Info</h1>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="payment-input" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="payment-input" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="payment-input" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn bg-green-600 hover:bg-green-500"
            ref={payBtn}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
