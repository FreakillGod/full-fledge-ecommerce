const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPass,
  resetPass,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/user");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(forgotPass);
router.route("/password/reset/:token").put(resetPass);

router.route("/me").get(isAuthenticatedUser, getUserDetails); //tryit
router.route("/password/update").patch(isAuthenticatedUser, updatePassword); //tryit
router.route("/me/update").patch(isAuthenticatedUser, updateProfile); //tryit

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
