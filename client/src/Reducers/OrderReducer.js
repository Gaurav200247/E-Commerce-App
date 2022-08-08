import { createReducer } from "@reduxjs/toolkit";

export const NewOrderReducer = createReducer(
  {},
  {
    CreateOrderRequest: (state, action) => {
      state.loading = true;
    },
    CreateOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    CreateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const myOrdersReducer = createReducer(
  { orders: [] },
  {
    MyOrdersRequest: (state, action) => {
      state.loading = true;
    },
    MyOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    MyOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const OrderDetailsReducer = createReducer(
  {
    order: {},
  },
  {
    OrderDetailsRequest: (state, action) => {
      state.loading = true;
    },
    OrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    OrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const AllOrdersReducer = createReducer(
  {
    orders: [],
  },
  {
    AllOrdersRequest: (state, action) => {
      state.loading = true;
    },
    AllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    AllOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const UpdateDeleteOrderReducer = createReducer(
  {},
  {
    // -------------- update Order --------------
    UpdateOrderRequest: (state, action) => {
      state.loading = true;
    },
    UpdateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    UpdateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateOrderReset: (state, action) => {
      state.isUpdated = false;
    },
    // -------------- delete Order --------------
    DeleteOrderRequest: (state, action) => {
      state.loading = true;
    },
    DeleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    DeleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    DeleteOrderReset: (state, action) => {
      state.isDeleted = false;
    },
    // -------------- Clear Errors --------------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);
