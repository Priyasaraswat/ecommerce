import React from "react";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle} from "react-icons/ai";


const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <AiOutlineCheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;