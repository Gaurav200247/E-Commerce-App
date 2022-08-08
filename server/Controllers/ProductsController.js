const CustomAPIError = require("../Errors/custom-error");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/Product");

// get All products
const getAllProducts = async (req, res, next) => {
  // throw new CustomAPIError("MY TEMP Error !!", 404);

  const { name, category, NumericFilter = [], rating } = req.query;

  // console.log(req.query);

  const queryObject = {};

  // -------------------------------------Search-------------------------------------

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (category) {
    queryObject.category = category;
  }

  if (rating) {
    queryObject.rating = { $lte: rating };
  }

  // -------------------------------------filter-------------------------------------

  if (NumericFilter) {
    // console.log(NumericFilter);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = NumericFilter.map((item) =>
      item.replace(regEx, (match) => `-${operatorMap[match]}-`)
    );

    const properties = ["price"];

    let values = [];
    let operators = [];

    filters.forEach((item) => {
      const [property_name, operator, value] = item.split("-");

      if (properties.includes(property_name)) {
        operators.push(operator);
        values.push(value);
      }
    });

    queryObject.price = { $gte: Number(values[0]), $lte: Number(values[1]) };
  }

  // console.log(queryObject);

  // -------------------------------------Pagination-------------------------------------
  let result = Product.find(queryObject);
  let resultCounter = Product.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // -------------------------------------Last Return-------------------------------------

  const products = await result;
  const Allproducts = await resultCounter;

  res.status(StatusCodes.OK).json({
    success: true,
    productsCount: Allproducts.length,
    resultperPage: products.length,
    products,
    Allproducts,
  });
};

// Get Single product
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new CustomAPIError("Product not found !!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, product });
};

// ------------------------------------------------------------------------------------------------

// create product -- ADMIN
const createProduct = async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Ecommerce App Products Pics",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, product });
};

// update product -- ADMIN
const updateProduct = async (req, res) => {
  const findProduct = await Product.findById(req.params.id);

  if (!findProduct) {
    throw new CustomAPIError("Product not found !!", StatusCodes.NOT_FOUND);
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < images.length; i++) {
      await cloudinary.uploader.destroy(findProduct.images[i].public_id);
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Ecommerce App Products Pics",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ success: true, updatedProduct });
};

// Delete a Product -- ADMIN
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    throw new CustomAPIError("Product not found !!", StatusCodes.NOT_FOUND);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Product Deleted Successfully", product });
};

// Creating and Updating Product Review
const createProductReview = async (req, res) => {
  const { ratings, comment, productID } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    ratings: Number(ratings),
    comment,
  };

  const product = await Product.findById(productID); // finding the product....

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // if you have done the review already then you can update your review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.ratings = ratings; // updating only rating
        rev.comment = comment; // updating only comment
      }
    });
  } else {
    product.reviews.push(review); // if not reviewed already then push the given reiview to product reviews.
    product.numOfReviews = product.reviews.length; // updating no. of reviews as one new added
  }

  // taking out avg rating and setting it to product.rating.
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.ratings;
  });
  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false }); // saving all updated or created data

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

// Get all Reviews of a Single product
const getAllReviews = async (req, res) => {
  const { productID } = req.query;

  const product = await Product.findById(productID);

  if (!product) {
    throw new CustomAPIError("Product not Found !!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    numOfReviews: product.reviews.length,
    reviews: product.reviews,
  });
};

// Delete a Review for logged in user
const deleteReview = async (req, res) => {
  const { productID, reviewID } = req.query;

  const product = await Product.findById(productID);

  if (!product) {
    throw new CustomAPIError("Product not Found !!", StatusCodes.NOT_FOUND);
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() != reviewID.toString()
  );

  // taking out avg rating and setting it to product.rating
  let avg = 0;

  reviews.forEach((rev) => {
    avg = avg + rev.ratings;
  });

  let rating = 0;

  if (product.reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    productID,
    { reviews, rating, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(StatusCodes.OK).json({ success: true });
};

// get All products
const getAllProductsAdmin = async (req, res, next) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({
    products,
  });
};

module.exports = {
  getAllProductsAdmin,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
};
