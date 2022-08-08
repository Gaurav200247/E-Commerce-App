import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "CreateOrderRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: "CreateOrderSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CreateOrderFail", payload: error.response.data.msg });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "MyOrdersRequest" });

    const { data } = await axios.get("/api/v1/order/me");

    dispatch({ type: "MyOrdersSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "MyOrdersFail", payload: error.response.data.msg });
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "OrderDetailsRequest" });

    const { data } = await axios.get(`/api/v1/order/${orderId}`);

    dispatch({ type: "OrderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({ type: "OrderDetailsFail", payload: error.response.data.msg });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "AllOrdersRequest" });

    const { data } = await axios.get(`/api/v1/admin/orders`);

    dispatch({ type: "AllOrdersSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "AllOrdersFail", payload: error.response.data.msg });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteOrderRequest" });

    const { data } = await axios.delete(`/api/v1/admin/orders/${id}`);

    dispatch({ type: "DeleteOrderSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "DeleteOrderFail", payload: error.response.data.msg });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateOrderRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/orders/${id}`,
      orderData,
      config
    );

    dispatch({ type: "UpdateOrderSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UpdateOrderFail", payload: error.response.data.msg });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
