import React, { Fragment, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Button, TextField } from "@mui/material";
import MetaData from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteReview,
  getAllreviewsAdmin,
} from "../../Actions/ReviewAction";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import "./Reviews.css";

const Reviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDeleted, deleteError } = useSelector((state) => state.deleteReview);
  const { loading, reviews, error } = useSelector(
    (state) => state.getAllReviews
  );

  const [productId, setProductId] = useState("");

  const getAllReviewHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviewsAdmin(productId));
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviewsAdmin(productId));
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      console.log(isDeleted);
      toast.success("Review Deleted SuccessFully !!");
      // navigate("/admin/reviews");
      dispatch({ type: "DeleteReviewReset" });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

  // console.log(reviews.reviews[0]);
  console.log(isDeleted);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews.reviews &&
    reviews.reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.ratings,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title="Update Product Reviews -- Admin" />

      <div className="productReviewsContainer">
        <form className="productReviewsForm" onSubmit={getAllReviewHandler}>
          <h1 className="productReviewsFormHeading">All REVIEWS</h1>
          <div>
            <StarIcon />
            <TextField
              variant="outlined"
              label="Enter Product Id"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || productId === "" ? true : false}
          >
            Search
          </Button>
        </form>

        {reviews.reviews && reviews.reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        ) : (
          <h1 className="productReviewsFormHeading">No Reviews Found</h1>
        )}
      </div>
    </>
  );
};

export default Reviews;
