const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getOneProduct, createProductReview, getReviews, deleteReview } = require("../controller/productController");
const { isAuthenticatedUser,authorizeRole } = require("../middleware/authentication");
const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRole("admin"),authorizeRole("admin"),createProduct);

router.route("/admin/products/update/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateProduct);

router.route("/admin/products/delete/:id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct);

router.route("/product/:id").get(getOneProduct);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/allReview").get(getReviews);

router.route("/deleteReview").delete(isAuthenticatedUser,deleteReview);

module.exports=router;