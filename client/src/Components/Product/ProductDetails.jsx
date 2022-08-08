import React, { useEffect, useState } from "react";
import "./ProductDetails.css";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getProductDetails, clearErrors } from "../../Actions/ProductAction";

import Carousel from "react-material-ui-carousel";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";

import Loading from "../Layouts/Loader/Loading";
import ReviewCard from "./ReviewCard.jsx";
import MetaData from "../Layouts/MetaData";
import { addItemstoCart } from "../../Actions/CartAction";
import { createNewReview } from "../../Actions/ReviewAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, RequestError } = useSelector(
    (state) => state.productDetails
  );
  const { review, error: reviewError } = useSelector(
    (state) => state.createReview
  );

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [Open, setOpen] = useState(false);

  const SubmitReviewToggle = () => {
    // console.log(Open);
    Open ? setOpen(false) : setOpen(true);
  };

  const ReviewSubmitHandler = () => {
    const myForm = new FormData();

    // ratings, comment, productID

    myForm.set("ratings", rating);
    myForm.set("comment", comment);
    myForm.set("productID", product._id);

    dispatch(createNewReview(myForm));

    setOpen(false);
  };

  const IncreaseQuantity = () => {
    if (product.stock <= quantity) return;

    const QTY = quantity + 1;
    setQuantity(QTY);
  };

  const DecreaseQuantity = () => {
    if (quantity <= 1) return;

    const QTY = quantity - 1;
    setQuantity(QTY);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (review) {
      // console.log(review);
      toast.success("Review Submitted Successfully !!");
      dispatch({ type: "CreateReviewReset" });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, RequestError, reviewError, review, id]);

  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  const AddToCartHandler = () => {
    dispatch(addItemstoCart(id, quantity));
    toast.success("Item Added to Cart");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`E-shop | ${product.name}`} />

          <div className="product-details-container">
            <div className="product-details">
              {/* ------------------- */}
              <div className="carousel-container">
                <Carousel className="w-3/4 h-full flex flex-col justify-between items-center">
                  {product.images &&
                    product.images.map((item, index) => {
                      return (
                        <img
                          src={item.url}
                          alt={`${index} Slide`}
                          key={index}
                          className="carousel-image"
                        />
                      );
                    })}
                </Carousel>
              </div>
              {/* ------------------- */}
              <div className="details-container">
                <div className="detail-block-1">
                  <h2>{product.name}</h2>
                  <p>Product #{product._id}</p>
                </div>

                <div className="detail-block-2">
                  <Rating {...options} />
                  <span className="detail-block-2-1 truncate ml-3 ">
                    ({product.numOfReviews}) Reviews
                  </span>
                </div>

                <div className="detail-block-3">
                  <h1>₹{product.price}</h1>

                  <div className="detail-block-3-1">
                    {/* ************************* */}
                    <div className="detail-block-3-1-1">
                      <button onClick={DecreaseQuantity}>-</button>
                      <input type="number" value={quantity} readOnly />
                      <button onClick={IncreaseQuantity}>+</button>
                    </div>
                    {/* ************************* */}
                    <button
                      className="truncate mr-10"
                      onClick={AddToCartHandler}
                      disabled={product.stock < 1 ? true : false}
                    >
                      Add To Cart
                    </button>
                    {/* ************************* */}
                  </div>

                  <p>
                    Status:
                    <b
                      className={`${
                        product.stock < 1 ? "text-red-700" : "text-green-500"
                      } ml-2`}
                    >
                      {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                    </b>
                  </p>
                </div>

                <div className="detail-block-4">
                  Description <p className="ml-2">{product.description}</p>
                </div>

                <button
                  className="submit-review-btn"
                  onClick={SubmitReviewToggle}
                >
                  Submit A Review
                </button>
              </div>
            </div>
            {/* ------------------- */}

            <h3 className="reviews-heading">Reviews</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={Open}
              onClose={SubmitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  size="large"
                  onChange={(e) => setRating(Number(e.target.value))}
                  value={rating}
                />
                <textarea
                  className="submitDialogTextArea"
                  cols={20}
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter Review (Optional)"
                ></textarea>
              </DialogContent>

              <DialogActions>
                <Button onClick={SubmitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={ReviewSubmitHandler} color="primary">
                  Submit Review
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews-container">
                {product.reviews.map((item, index) => {
                  return <ReviewCard key={index} {...item} />;
                })}
              </div>
            ) : (
              <p className="no-review-line">No Reviews Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
