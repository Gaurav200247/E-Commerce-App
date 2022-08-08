import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Actions/OrderAction";
import { getProducts } from "../../Actions/ProductAction";
import { getAllUsers } from "../../Actions/UserAction";
import MetaData from "../Layouts/MetaData";
import UsersPic from "../Images/users.png";
import ProductsPic from "../Images/products.png";
import OrdersPic from "../Images/orders.png";
import "./Dashboard.css";
import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { Allproducts, productsCount } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.getAllUsers);
  const { orders } = useSelector((state) => state.getAllOrders);

  let outOfStock = 0;
  let featuredProducts = 0;

  Allproducts &&
    Allproducts.forEach((item) => {
      if (item.stock === 0) {
        outOfStock++;
      }
      if (item.featured === "true") {
        featuredProducts++;
      }
    });
  console.log(featuredProducts, outOfStock);

  let TotalAmount = 0;
  let ProcessingOrders = 0;
  let DeliveredOrders = 0;
  let ShippedOrders = 0;

  orders &&
    orders.forEach((item) => {
      TotalAmount += item.totalPrice;

      if (item.OrderStatus === "Processing") {
        ProcessingOrders++;
      }

      if (item.OrderStatus === "Delivered") {
        DeliveredOrders++;
      }

      if (item.OrderStatus === "Shipped") {
        ShippedOrders++;
      }
    });

  let TotalAdminUsers = 0;
  users.users &&
    users.users.forEach((item) => {
      if (item.role === "admin") {
        TotalAdminUsers++;
      }
    });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL EARNING",
        backgroundColor: ["crimson"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, TotalAmount],
      },
    ],
  };

  const doughnutState1 = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#808080", "#fdb827"],
        hoverBackgroundColor: ["#4B5000", "#fdb857"],
        data: [outOfStock, productsCount - outOfStock],
      },
    ],
  };

  const doughnutState2 = {
    labels: ["Normal Users", "Admin Users"],
    datasets: [
      {
        backgroundColor: ["#0549a5", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [users.nbHits, TotalAdminUsers],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Admin | Dashboard" />

      <div className="category-info-container">
        <Link to="/admin/products">
          <div className="ci-img-container">
            <img src={ProductsPic} alt="ProductsPic" className="w-full" />
          </div>
          <div className="category-info-block">
            <h1>Products</h1>
            <p>Total Products : {Allproducts && productsCount}</p>
            <p>Total Out of Stock Products : {Allproducts && outOfStock}</p>
            <p>Total Featured Products : {Allproducts && featuredProducts}</p>
          </div>
        </Link>

        <Link to="/admin/users">
          <div className="ci-img-container">
            <img src={UsersPic} alt="ProductsPic" className="w-full" />
          </div>
          <div className="category-info-block">
            <h1>Users</h1>
            <p>Total Users : {users.users && users.nbHits}</p>
            <p>Total Admin Users : {users.users && TotalAdminUsers}</p>
          </div>
        </Link>

        <Link to="/admin/orders">
          <div className="ci-img-container">
            <img src={OrdersPic} alt="ProductsPic" className="w-full" />
          </div>
          <div className="category-info-block">
            <h1>Orders</h1>
            <p>Total Orders : {orders && orders.length}</p>
            <p>Total Processing Orders : {ProcessingOrders}</p>
            <p>Total Shipped Orders : {ShippedOrders}</p>
            <p>Total Completed Orders : {DeliveredOrders}</p>
          </div>
        </Link>
      </div>

      <div className="charts-container">
        {" "}
        <div className="doughnutChart">
          <Doughnut data={doughnutState2} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState1} />
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
