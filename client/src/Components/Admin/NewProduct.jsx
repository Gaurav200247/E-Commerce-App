import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, CreateNewProduct } from "../../Actions/ProductAction";
import { useNavigate } from "react-router-dom";
import "./NewProduct.css";

import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, RequestError } = useSelector(
    (state) => state.createProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [Featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const Categories = [
    "laptop",
    "phone",
    "gaming",
    "clothes",
    "cosmetics",
    "sports",
    "furniture",
    "stationary",
  ];

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // console.log(imagesPreview);
  // console.log(images);

  const NewProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("category", category);
    myForm.set("featured", Featured);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(CreateNewProduct(myForm));
  };

  useEffect(() => {
    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created SuccessFully !!");
      navigate("/admin/dashboard");
      dispatch({ type: "NewProductReset" });
    }
  }, [dispatch, RequestError, success, navigate]);

  return (
    <>
      <MetaData title="Create Product -- Admin" />

      <div className="create-product-box">
        <h1>Create Product</h1>

        <form
          encType="multipart/form-data"
          onSubmit={NewProductSubmitHandler}
          className="create-product-form"
        >
          <div className="form-div-1">
            <div>
              <SpellcheckIcon className="mr-5" />
              <TextField
                label="Enter Product Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <CurrencyRupeeIcon className="mr-5" />
              <TextField
                label="Enter Product Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-div-2">
            <div>
              <CategoryIcon className="mr-5" />
              <select onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Choose Category</option>
                {Categories.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <StarIcon className="mr-5" />
              <select onChange={(e) => setFeatured(e.target.value)} required>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div>
              <InventoryIcon className="mr-5" />
              <input
                placeholder="Enter Product Stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-div-3">
            <DescriptionIcon className="mr-5 mt-1" />
            <textarea
              placeholder="Enter Product Description"
              rows="5"
              cols="100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-div-4">
            <div id="createProductFormFile">
              <ImageIcon className="mr-5" />
              <input
                type="file"
                name="Products Pics"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>

            <div className="images-preview-block" id="createProductFormImage">
              {imagesPreview &&
                imagesPreview.map((item, index) => {
                  return <img src={item} key={index} alt="Product Preview" />;
                })}
            </div>
          </div>

          <button
            className="create-product-btn bg-sky-700 text-white hover:bg-sky-600"
            type="submit"
            disabled={loading ? true : false}
          >
            Create Product
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
