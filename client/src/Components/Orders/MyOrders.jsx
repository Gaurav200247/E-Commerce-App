import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, getMyOrders } from "../../Actions/OrderAction";
import Loading from "../Layouts/Loader/Loading";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../Layouts/MetaData";
import "./MyOrders.css";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  // console.log(orders.orders);

  orders.orders &&
    orders.orders.forEach((item) => {
      console.log(item.orderItems.length);
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.OrderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors);
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.user.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
              rowsPerPageOptions={[100]}
            />

            <h1 id="myOrdersHeading">{user.user.name}'s' Orders</h1>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
