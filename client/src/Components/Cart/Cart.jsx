import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { addItemstoCart, removeFromCart } from "../../Actions/CartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const IncreaseQuantity = (product, quantity, stock) => {
    const newQTY = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemstoCart(product, newQTY));
  };

  const DecreaseQuantity = (product, quantity) => {
    const newQTY = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemstoCart(product, newQTY));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Products in your Cart.</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p className="cartHeader-quantity">Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cartContainer mt-5 mb-5" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />

                    <div className="cartInput">
                      <button
                        onClick={() =>
                          DecreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          IncreaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="cartSubTotal truncate">
                      {`₹ ${item.price * item.quantity}`}
                    </p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                {/* adding all items subTotal with initial value 0 like:- */}
                {/* 0 (initial value) + 10(olditem sum) + (item.quantity * item.price)(of current item) */}
                <p>{`₹ ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
