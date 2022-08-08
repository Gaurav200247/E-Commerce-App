import React, { useEffect, useState } from "react";
import Header from "./Components/Layouts/Header/Header";

import Footer from "./Components/Layouts/Footer/Footer";

import Home from "./Components/Home/Home.jsx";
import Products from "./Components/Product/Products.jsx";
import Search from "./Components/Product/Search";

import ProductDetails from "./Components/Product/ProductDetails.jsx";
import LoginSignUp from "./Components/User/LoginSignUp.jsx";
import Profile from "./Components/User/Profile.jsx";
import UpdateProfile from "./Components/User/UpdateProfile.jsx";
import UpdatePassword from "./Components/User/UpdatePassword.jsx";
import ForgotPassword from "./Components/User/ForgotPassword.jsx";
import ResetPassword from "./Components/User/ResetPassword.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import ShippingInfo from "./Components/Cart/ShippingInfo.jsx";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.jsx";
import Payment from "./Components/Cart/Payment.jsx";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrders from "./Components/Orders/MyOrders.jsx";
import OrderDetails from "./Components/Orders/OrderDetails";

import Dashboard from "./Components/Admin/Dashboard.jsx";
import ProductList from "./Components/Admin/ProductList.jsx";
import UpdateProduct from "./Components/Admin/UpdateProduct.jsx";
import NewProduct from "./Components/Admin/NewProduct.jsx";

import { Route, Routes } from "react-router-dom";

import store from "./Store";
import { loadUser } from "./Actions/UserAction";
import { useSelector } from "react-redux";
import LoginSpeedDial from "./Components/Layouts/Header/LoginSpeedDial";

import ProtectedRoute from "./Components/Route/ProtectedRoute";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SideBar from "./Components/Admin/SideBar";
import SidebarToggleBtn from "./Components/Admin/SidebarToggleBtn";
import UsersList from "./Components/Admin/UsersList";
import UpdateUserProfile from "./Components/Admin/UpdateUserProfile.jsx";

import OrdersList from "./Components/Admin/OrdersList.jsx";
import OrdersProcess from "./Components/Admin/OrdersProcess.jsx";
import Reviews from "./Components/Admin/Reviews.jsx";
import About from "./Components/Layouts/About/About";
import Contact from "./Components/Layouts/Contact/Contact.jsx";
import NotFound from "./Components/Layouts/NotFound/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeAPIkey, setstripeAPIkey] = useState("");

  async function getstripeAPIkey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setstripeAPIkey(data.stripeAPIKey);
  }

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    store.dispatch(loadUser());

    getstripeAPIkey();
  }, []);

  useEffect(() => {
    if (user && user.user && user.user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, isAdmin]);

  // console.log(isAdmin);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Header />

      {isAdmin && <SideBar />}

      {isAdmin && <SidebarToggleBtn />}

      {isAuthenticated && <LoginSpeedDial user={user} />}

      <Routes>
        {/* ------------------ Single protected Route starts------------------*/}
        {stripeAPIkey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                adminRoute={false}
              >
                <Elements stripe={loadStripe(stripeAPIkey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
        {/* ------------------ Single protected Route Ends------------------*/}

        {/* ------------------ Normal Routes starts ------------------*/}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* ------------------ Normal Routes Ends ------------------*/}

        {/* ------------------Protected Route Starts ------------------ */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              adminRoute={false}
            />
          }
        >
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/login/shipping" element={<ShippingInfo />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        {/* ------------------Protected Route Ends ------------------ */}

        {/* ------------------Protected Routes for Admin Starts ------------------ */}

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              adminRoute={true}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />

          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/:id" element={<UpdateUserProfile />} />

          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/orders/:id" element={<OrdersProcess />} />

          <Route path="/admin/reviews" element={<Reviews />} />
        </Route>

        {/* ------------------Protected Routes for Admin Ends ------------------ */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
