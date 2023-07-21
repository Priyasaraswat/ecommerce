const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getUser, deleteUser,updateUserProfileByAdmin } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/authentication");
const router=express.Router();

router.route("/registerUser").post(registerUser);

router.route("/loginUser").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logoutUser").get(logout);

router.route("/myDetails").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/profile/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/allUsers").get(isAuthenticatedUser,authorizeRole("admin") ,getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRole("admin") ,getUser);

router.route("/admin/user/update/:id").put(isAuthenticatedUser,authorizeRole("admin") ,updateUserProfileByAdmin);

router.route("/admin/user/delete/:id").delete(isAuthenticatedUser,authorizeRole("admin") ,deleteUser);

module.exports=router;