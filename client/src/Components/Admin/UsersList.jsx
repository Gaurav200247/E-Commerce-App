import React, { Fragment, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, deleteUser, getAllUsers } from "../../Actions/UserAction";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, error } = useSelector((state) => state.getAllUsers);
  const { isDeleted, deleteError } = useSelector(
    (state) => state.UpdateDeleteUser
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //   console.log(isDeleted);
      toast.success("User Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DeleteUserReset" });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-Mail",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/users/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users.users &&
    users.users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
      });
    });

  return (
    <div>
      <MetaData title="All Users | Admin" />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>

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

export default UsersList;
