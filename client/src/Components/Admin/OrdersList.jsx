import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../Layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  ClearErrors,
  deleteOrder,
  getAllOrders,
} from "../../Actions/OrderAction";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, error } = useSelector((state) => state.getAllOrders);
  const { isDeleted, deleteError } = useSelector(
    (state) => state.UpdateDeleteOrder
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (deleteError) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DeleteOrderReset" });
    }

    dispatch(getAllOrders());
  }, [dispatch, isDeleted, error, deleteError, navigate]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 350,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQTY",
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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/orders/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.OrderStatus,
        amount: item.totalPrice,
        itemsQTY: item.orderItems.length,
      });
    });

  return (
    <div>
      <MetaData title="All Products | Admin" />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
