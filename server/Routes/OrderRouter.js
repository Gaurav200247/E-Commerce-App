const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/OrderController");
const { authMiddleware, authRoles } = require("../Middlewares/auth");

// ------------ LOGGED IN ROUTES ------------
router.route("/order/new").post(authMiddleware, newOrder);

router.route("/order/me").get(authMiddleware, myOrders);

router.route("/order/:id").get(authMiddleware, getSingleOrder);

// ------------ ADMIN ROUTES ------------

router
  .route("/admin/orders")
  .get(authMiddleware, authRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(authMiddleware, authRoles("admin"), updateOrder)
  .delete(authMiddleware, authRoles("admin"), deleteOrder);

module.exports = router;
