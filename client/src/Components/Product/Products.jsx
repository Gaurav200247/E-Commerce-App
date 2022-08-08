import React, { useEffect, useState } from "react";
import Loading from "../Layouts/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import "./Product.css";
import MetaData from "../Layouts/MetaData";
import { getProducts, clearErrors } from "../../Actions/ProductAction";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { toast } from "react-toastify";

const Categories = [
  "all",
  "laptop",
  "phone",
  "gaming",
  "clothes",
  "cosmetics",
  "sports",
  "furniture",
  "stationary",
];

const Products = () => {
  const [name] = useSearchParams();
  const dispatch = useDispatch();

  const { loading, products, RequestError, productsCount, resultperPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(5);
  const [ShowFilters, setShowFilters] = useState(false);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    console.log(price);
  };

  //   to get all products
  useEffect(() => {
    let newName = name.get("name") || "";
    dispatch(getProducts(newName, currentPage));
  }, [dispatch, currentPage, name]);

  const GetData = () => {
    let newName = name.get("name") || "";
    dispatch(getProducts(newName, currentPage, price, category, ratings));
  };

  const ResetFilters = () => {
    window.location.reload();
  };

  //   to get error message in toast(react-toast)
  useEffect(() => {
    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }
  }, [dispatch, RequestError]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="E-shop | Products" />
          <h2 className="productsHeading">Products</h2>

          <div className="filter-show-btn-container">
            <button
              className="filter-show-btn"
              onClick={() => setShowFilters(!ShowFilters)}
            >
              Filters{" "}
              {ShowFilters ? (
                <AiOutlineCaretUp className="ml-2" />
              ) : (
                <AiOutlineCaretDown className="ml-2" />
              )}
            </button>
          </div>

          <div className="all-products-container">
            <div className={`filterBox ${ShowFilters && "show-filter-box"}`}>
              <h3>Price</h3>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                step={100}
                min={0}
                max={200000}
              />

              <h3>Categories</h3>
              <ul className="categoryBox">
                {Categories.map((item, index) => {
                  return (
                    <li
                      className="category-link"
                      key={index}
                      onClick={() => {
                        setCategory(item === "all" ? "" : item);
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>

              {category && (
                <h5>
                  Selected Category : <span>{category}</span>
                </h5>
              )}

              <fieldset>
                <h3>Ratings</h3>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  step={0.5}
                  marks
                  min={0}
                  max={5}
                />
              </fieldset>

              <div className="filter-submit-btn-container">
                <button
                  onClick={ResetFilters}
                  className="filter-reset-btn text-red-600"
                >
                  Reset Filters
                </button>
                <button
                  onClick={GetData}
                  className="filter-submit-btn text-emerald-600"
                >
                  Submit Filters
                </button>
              </div>
            </div>

            <div className="products-container">
              {products.length > 0 ? (
                products.map((item) => {
                  return <ProductCard {...item} key={item._id} />;
                })
              ) : (
                <p className="no-products-line">No Products Found !! </p>
              )}
            </div>
          </div>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage} //1
              totalItemsCount={productsCount || 30} // all products length
              itemsCountPerPage={resultperPage} // products in one page
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
