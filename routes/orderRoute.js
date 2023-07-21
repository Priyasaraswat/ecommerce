const express=require("express");
const router=express.Router();
const { isAuthenticatedUser,authorizeRole } = require("../middleware/authentication");
const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder}=require("../controller/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

 router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

 router.route("/orders/me").get(isAuthenticatedUser,myOrders);

 router.route("/admin/allOrders").get(isAuthenticatedUser,authorizeRole("admin"),getAllOrders);

 router.route("/admin/updateOrder/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateOrder);

 router.route("/admin/deleteOrder/:id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteOrder);

module.exports=router;