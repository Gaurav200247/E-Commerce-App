import axios from "axios";

export const createNewReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateReviewRequest" });

    const config = {
      headers: {
        "Content-Type": "appliaction/json",
      },
    };
    const { data } = await axios.put("/api/v1/review", reviewData, config);

    dispatch({ type: "CreateReviewSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "CreateReviewFail", payload: error.response.data.msg });
  }
};

export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteReviewRequest" });

    const { data } = await axios.delete(
      `/api/v1/review?reviewID=${reviewId}&productID=${productId}`
    );

    dispatch({ type: "DeleteReviewSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "DeleteReviewFail", payload: error.response.data.msg });
  }
};

export const getAllreviewsAdmin = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "AllReviewRequest" });

    const { data } = await axios.get(`/api/v1/review?productID=${productId}`);

    dispatch({ type: "AllReviewSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "AllReviewFail", payload: error.response.data.msg });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
