import axios from "axios";

// Add to Cart
export const addItemstoCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  //   put the data of single item in payload which add it to cartItems array in cartReducer
  dispatch({
    type: "AddToCart",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  // now we put the cartItems array which also contains quantity of item to be taken in localStorage using getState() to access cartItems from cart(cartReducer) in redux-store
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//  remove item from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: "RemoveItemFromCart", payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Saving Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: "SaveShippingInfo", payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
