import React, { useEffect } from "react";
import Product from "./ProductCard.js";
import { TfiMouse } from "react-icons/tfi";
import MetaData from "../layout/MetaData.js";
import {clearErrors, getProduct} from "../../Actions/ProductAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import Header from "../layout/Header/Header.js";
import UserOptions from "../layout/Header/UserOptions.js";

const Home = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const {loading,error,products,productsCount} = useSelector((state)=>state.products);
  const {isAuthenticated,user}=useSelector(state=>state.user);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
   dispatch(getProduct());
  },[dispatch,error,alert])
  
  return (
   <>
   {loading?(<Loader />): <>
     <MetaData title="CartiQue" />
     
       {/* {isAuthenticated && <UserOptions user={user}/>} */}
      <div className="banner">
        <h2>Welcome to CartiQue</h2>
        <p>Find products below to shop</p>
        <a href="#homeHeading" className="homeScroll">
          <button>
            Scroll <TfiMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading" id="homeHeading">Featured Products</h2>
      <div className="container" id="container">
      {products && products.map(product=>(
        <Product product={product} />
       ))}
        
      </div>
    </>}
   </>
  );
};

export default Home;
