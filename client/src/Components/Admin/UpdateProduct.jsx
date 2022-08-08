import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../Actions/ProductAction";
import MetaData from "../Layouts/MetaData";
import "./UpdateProduct.css";

import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import { TextField } from "@mui/material";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productID } = useParams();
  const { product, RequestError } = useSelector(
    (state) => state.productDetails
  );
  const { loading, isUpdated, updateError } = useSelector(
    (state) => state.UpdateDeleteProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [Featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const UpdateProductSubmitHandler = (e) => {
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

    dispatch(updateProduct(productID, myForm));
  };

  useEffect(() => {
    if (product && product._id !== productID) {
      dispatch(getProductDetails(productID));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (RequestError) {
      toast.error(RequestError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated SuccessFully !!");
      navigate("/admin/dashboard");
      dispatch({ type: "UpdateProductReset" });
    }
  }, [
    dispatch,
    updateError,
    isUpdated,
    RequestError,
    navigate,
    product,
    productID,
  ]);

  return (
    <>
      <MetaData title="Update Product -- Admin" />

      <div className="update-product-box">
        <h1>Update Product</h1>

        <form
          encType="multipart/form-data"
          onSubmit={UpdateProductSubmitHandler}
          className="update-product-form"
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
            <div id="updateProductFormFile">
              <ImageIcon className="mr-5" />
              <input
                type="file"
                name="Products Pics"
                accept="image/*"
                multiple
                onChange={updateProductImagesChange}
              />
            </div>

            <div id="updateProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div className="images-preview-block" id="updateProductFormImage">
              {imagesPreview &&
                imagesPreview.map((item, index) => {
                  return <img src={item} key={index} alt="Product Preview" />;
                })}
            </div>
          </div>

          <button
            className="update-product-btn bg-purple-600 text-white hover:bg-purple-500"
            type="submit"
            disabled={loading ? true : false}
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
