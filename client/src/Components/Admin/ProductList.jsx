import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../Layouts/MetaData";
import "./ProductList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteProduct,
  getAllProductsAdmin,
} from "../../Actions/ProductAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, RequestError } = useSelector(
    (state) => state.adminGetAllproducts
  );
  const { isDeleted, deleteError } = useSelector(
    (state) => state.UpdateDeleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DeleteProductReset" });
    }

    dispatch(getAllProductsAdmin());
  }, [dispatch, isDeleted, RequestError, deleteError, navigate]);

  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <div>
      <MetaData title="All Products | Admin" />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>

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

export default ProductList;
