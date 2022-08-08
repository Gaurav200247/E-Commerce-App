import axios from "axios";

export const getProducts =
  (name = "", currentPage = 1, price = [0, 200000], category, ratings = 5) =>
  async (dispatch) => {
    try {
      dispatch({ type: "AllProductsRequest" });

      let link = `/api/v1/products/?name=${name}&page=${currentPage}&NumericFilter=price>=${price[0]}&NumericFilter=price<=${price[1]}&rating=${ratings}`;

      if (category) {
        link = `/api/v1/products/?name=${name}&page=${currentPage}&NumericFilter=price>=${price[0]}&NumericFilter=price<=${price[1]}&category=${category}&rating=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "AllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: "AllProductsFail",
        payload: error.response.data.msg,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ProductDetailsRequest" });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: "ProductDetailsSuccess",
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "ProductDetailsFail",
      payload: error.response.data.msg,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};

// Delete Product

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProductRequest" });

    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

    dispatch({
      type: "DeleteProductSuccess",
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "DeleteProductFail",
      payload: error.response.data.msg,
    });
  }
};

export const getAllProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: "AdminAllProductsRequest" });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: "AdminAllProductsSuccess",
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "AdminAllProductsFail",
      payload: error.response.data.msg,
    });
  }
};

export const CreateNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "NewProductRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/admin/products`,
      productData,
      config
    );

    dispatch({
      type: "NewProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NewProductFail",
      payload: error.response.data.msg,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateProductRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.patch(
      `/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: "UpdateProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UpdateProductFail",
      payload: error.response.data.msg,
    });
  }
};
