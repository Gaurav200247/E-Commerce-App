import { createReducer } from "@reduxjs/toolkit";

const initialCartState = {
  // if localstorage contains cartItems array then fetch it using getItem or else make cartItem an empty array
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const CartReducer = createReducer(initialCartState, {
  AddToCart: (state, action) => {
    const item = action.payload; // contains full data of item to be added to cart

    const isItemExist = state.cartItems.find(
      (singleCartItem) => singleCartItem.product === item.product
    );

    if (isItemExist) {
      // if item already exist in cartItems array then put the updated item at that old position of same item in cartItems array
      state.cartItems = state.cartItems.map((singleCartItem) =>
        singleCartItem.product === item.product ? item : singleCartItem
      );
    } else {
      // if item does not exist in cart then add that item in array cartItems !! simple !!
      state.cartItems = [...state.cartItems, item];
    }
  },

  RemoveItemFromCart: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (SingleCartItem) => SingleCartItem.product !== action.payload
    );
  },

  SaveShippingInfo: (state, action) => {
    state.shippingInfo = action.payload;
  },
});
