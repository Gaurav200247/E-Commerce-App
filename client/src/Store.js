import { configureStore } from "@reduxjs/toolkit";
import {
  ProductReducer,
  ProductDetailsReducer,
  NewProductReducer,
  UpdateDeleteProductReducer,
  AdminProductReducer,
} from "./Reducers/ProductReducer";

import {
  UserReducer,
  ProfileReducer,
  ForgotPasswordReducer,
  getAllUsersReducer,
  UserDetailsReducer,
  UpdateDeleteUserReducer,
} from "./Reducers/UserReducer";

import { CartReducer } from "./Reducers/CartReducer";

import {
  AllOrdersReducer,
  myOrdersReducer,
  NewOrderReducer,
  OrderDetailsReducer,
  UpdateDeleteOrderReducer,
} from "./Reducers/OrderReducer";

import {
  createNewReviewReducer,
  deleteReviewReducer,
  getAllReviewsReducer,
} from "./Reducers/ReviewReducer";
import { sideBarReducer } from "./Reducers/SidebarReducer";

const Store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    products: ProductReducer,
    productDetails: ProductDetailsReducer,
    user: UserReducer,
    profile: ProfileReducer,
    forgotPassword: ForgotPasswordReducer,
    cart: CartReducer,
    newOrder: NewOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: OrderDetailsReducer,
    createReview: createNewReviewReducer,

    // Admin Reducers
    deleteReview: deleteReviewReducer,
    getAllReviews: getAllReviewsReducer,

    usersDetails: UserDetailsReducer,
    getAllUsers: getAllUsersReducer,
    UpdateDeleteUser: UpdateDeleteUserReducer,

    adminGetAllproducts: AdminProductReducer,
    createProduct: NewProductReducer,
    UpdateDeleteProduct: UpdateDeleteProductReducer,

    getAllOrders: AllOrdersReducer,
    UpdateDeleteOrder: UpdateDeleteOrderReducer,
  },
});

export default Store;
