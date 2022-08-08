import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

import MetaData from "../Layouts/MetaData";
import ProductCard from "./ProductCard.jsx";
import Loading from "../Layouts/Loader/Loading";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getProducts, clearErrors } from "../../Actions/ProductAction";

import Back_Video from "../Videos/BackVideo_1.mp4";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, RequestError, Allproducts } = useSelector(
    (state) => state.products
  );

  // Get Products Useffect
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Error UseEffect
  useEffect(() => {
    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }
  }, [RequestError, dispatch]);

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="E-shop | Home" />
          <div className="banner">
            <div className="video-banner">
              <video loop={true} autoPlay="autoplay" muted>
                <source src={Back_Video} />
              </video>
            </div>

            <div className="banner-info">
              <p>Welcome to E-Shop</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <a href="#homeHeading">
                <button>
                  Scroll <CgMouse />
                </button>
              </a>
            </div>
          </div>

          <h2 className="homeHeading" id="homeHeading">
            Featured Products
          </h2>

          <div className="container">
            {Allproducts &&
              Allproducts.map((SingleProduct) => {
                if (SingleProduct.featured === "true") {
                  return (
                    <ProductCard {...SingleProduct} key={SingleProduct._id} />
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </>
      )}
      ;
    </>
  );
};

export default Home;
