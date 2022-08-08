import { createReducer } from "@reduxjs/toolkit";

export const ProductReducer = createReducer(
  { products: [] },
  {
    AllProductsRequest: (state) => {
      state.loading = true;
      state.products = [];
      state.productsCount = 0;
      state.resultperPage = 0;
      state.RequestError = null;
    },
    AllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.Allproducts = action.payload.Allproducts;
      state.resultperPage = action.payload.resultperPage;
      state.RequestError = null;
    },
    AllProductsFail: (state, action) => {
      state.loading = false;
      state.products = [];
      state.productsCount = 0;
      state.resultperPage = 0;
      state.RequestError = action.payload;
    },
    ClearErrors: (state) => {
      state.RequestError = null;
    },
  }
);

export const AdminProductReducer = createReducer(
  { products: [] },
  {
    AdminAllProductsRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    AdminAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    AdminAllProductsFail: (state, action) => {
      state.loading = false;
      state.RequestError = action.payload;
    },
    ClearErrors: (state) => {
      state.RequestError = null;
    },
  }
);

export const ProductDetailsReducer = createReducer(
  { product: [] },
  {
    ProductDetailsRequest: (state) => {
      state.loading = true;
    },
    ProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    ProductDetailsFail: (state, action) => {
      state.loading = false;
      state.product = [];
      state.RequestError = action.payload;
    },
    ClearErrors: (state) => {
      state.RequestError = null;
    },
  }
);

export const NewProductReducer = createReducer(
  { product: {} },
  {
    NewProductRequest: (state) => {
      state.loading = true;
    },
    NewProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    NewProductFail: (state, action) => {
      state.loading = false;
      state.RequestError = action.payload;
    },
    NewProductReset: (state, action) => {
      state.success = false;
    },

    ClearErrors: (state) => {
      state.RequestError = null;
    },
  }
);

export const UpdateDeleteProductReducer = createReducer(
  {},
  {
    //---------------------- update Product----------------------
    UpdateProductRequest: (state) => {
      state.loading = true;
    },
    UpdateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    UpdateProductFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.updateError = action.payload;
    },
    UpdateProductReset: (state, action) => {
      state.isUpdated = false;
    },
    // ---------------------- delete Product----------------------
    DeleteProductRequest: (state) => {
      state.loading = true;
    },
    DeleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    DeleteProductFail: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deleteError = action.payload;
    },
    DeleteProductReset: (state, action) => {
      state.isDeleted = false;
    },
    // ---------------------- clear Errors ----------------------
    ClearErrors: (state) => {
      state.deleteError = null;
      state.updateError = null;
    },
  }
);

export const DeleteProductReducer = createReducer({ product: [] }, {});
