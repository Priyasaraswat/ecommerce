import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../Actions/OrderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { MdOutlineLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  // const columns = [
  //   { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },

  //   {
  //     field: "status",
  //     headerName: "Status",
  //     minWidth: 90,
  //     flex: 0.2,
  //     cellClassName: (params) => {
  //       return params.getValue(params.id, "status") === "Delivered"
  //         ? "greenColor"
  //         : "redColor";
  //     },
  //   },
  //   {
  //     field: "itemsQty",
  //     headerName: "Items Qty",
  //     type: "number",
  //     minWidth: 50,
  //     flex: 0.2,
  //   },

  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     type: "number",
  //     minWidth: 150,
  //     flex: 0.3,
  //   },

  //   {
  //     field: "actions",
  //     flex: 0.3,
  //     headerName: "Actions",
  //     minWidth: 100,
  //     type: "number",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Link to={`/order/${params.getValue(params.id, "id")}`}>
  //           <MdOutlineLaunch />
  //         </Link>
  //       );
  //     },
  //   },
  // ];
  // const rows = [];

  // orders &&
  //   orders.forEach((item, index) => {
  //     rows.push({
  //       itemsQty: item.orderItem?.length,
  //       id: item._id,
  //       status: item.orderStatus,
  //       amount: item.totalPrice,
  //     });
  //   });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <table className="myOrderTable">
            <thead>
              <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Item Qty</th>
              <th>Amount</th>
              <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item, index) => (
                  <tr>

                   <td>{item._id}</td>
                    <td>{item.orderStatus}</td>
                    <td>{item.orderItem.length}</td>
                    <td>{item.totalPrice}</td>
                     <td > 
                <Link to={`/order/${item._id}`}>
           <span className="linktd"><MdOutlineLaunch /></span>
        </Link>
      </td>
                    </tr>
                  
                ))}
            </tbody>
          </table>
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
