import { useEffect,useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "../src/component/Product/Products.js";
import Search from "../src/component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./Actions/UserAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
// import Heading from "./component/layout/Header/Heading";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import DashBoard from "./component/admin/DashBoard.js"

import {loadStripe} from "@stripe/stripe-js"


import axios from "axios";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Droid Serif"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={<ProtectedRoute Component={Profile} />}/>
        <Route exact path="/profile/update" element={<ProtectedRoute Component={UpdateProfile}/>}/>
        <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword}/>}/>
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/shipping" element={<ProtectedRoute Component={Shipping}/>}/>
       
        
         
             <Route path="/process/payment" element={stripeApiKey &&(<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements >)}/>
         
        
        <Route exact path="/success" element={<ProtectedRoute Component={OrderSuccess}/>}/>
        <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders}/>}/>

       
        <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder}/>}/>
        <Route exact path="/order/:id" element={<ProtectedRoute Component={OrderDetails}/>}/>

        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} Component={DashBoard}/>} />

       
        
       
        
     
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
