const express = require("express");
const router = express.Router();

const {
  registerUser,
  LoginUser,
  LogOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../Controllers/UserController");
const { authMiddleware, authRoles } = require("../Middlewares/auth");

// ------------------------------- USER SIGNED OUT ROUTES -------------------------------

router.route("/register").post(registerUser);

router.route("/login").post(LoginUser);

router.route("/logout").get(LogOutUser);

router.route("/password/forgot").post(forgotPassword); //sends email

router.route("/password/reset/:token").patch(resetPassword); //sends link

// ------------------------------- USER SIGNED IN ROUTES -------------------------------

router.route("/me").get(authMiddleware, getUserDetails);

router.route("/me/update").put(authMiddleware, updateUserDetails);

router.route("/password/update").put(authMiddleware, updateUserPassword);

// ------------------------------- ADMIN ROUTES -------------------------------

router
  .route("/admin/users")
  .get(authMiddleware, authRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(authMiddleware, authRoles("admin"), getSingleUser)
  .put(authMiddleware, authRoles("admin"), updateUserRole)
  .delete(authMiddleware, authRoles("admin"), deleteUser);

module.exports = router;
