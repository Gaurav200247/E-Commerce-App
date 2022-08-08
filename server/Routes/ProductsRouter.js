const express = require("express");
const router = express.Router();
const { authMiddleware, authRoles } = require("../Middlewares/auth");

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAllProductsAdmin,
} = require("../Controllers/ProductsController");

// ------------------- ROUTES ACCESSED BY EVERYONE -------------------

router.route("/products").get(getAllProducts);

router.route("/products/:id").get(getSingleProduct);

router.route("/review").put(authMiddleware, createProductReview);

router.route("/review").get(getAllReviews).delete(authMiddleware, deleteReview);

// ------------------- ADMIN ROUTES -------------------

router
  .route("/admin/products")
  .post(authMiddleware, authRoles("admin"), createProduct)
  .get(authMiddleware, authRoles("admin"), getAllProductsAdmin);

router
  .route("/admin/products/:id")
  .patch(authMiddleware, authRoles("admin"), updateProduct)
  .delete(authMiddleware, authRoles("admin"), deleteProduct);

module.exports = router;
