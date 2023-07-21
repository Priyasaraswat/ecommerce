import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/ProductAction";
import Loader from "../layout/Loader/Loader";
import "./products.css";
import Product from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from '@mui/material';
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";


const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice]=useState([0,25000]); 
  const [category,setCategory]=useState("");
  const [ratings,setRatings]=useState(0);

  const { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, error, loading, productsCount, resultPerPage,filteredProductCount } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
 
  const priceHandler =(e,newPrice)=>{
    e.preventDefault();
    setPrice(newPrice)
  }
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage,price,category,ratings));
  }, [dispatch, keyword, currentPage,price,category,ratings,error]);

   let count=filteredProductCount;

   const categories=[
    "Laptop",
    "FootWear",
    "Clothes",
    "Phones",
    "Watch",
    "TV",

   ]

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title ="PRODUCTS"></MetaData>
          <div className="productBox">
            <h2 className="productsHeading">Products</h2>
            <div className="subproduct">
            <div className="products">
              {products &&
                products.map((product) => <Product key={product._id} product={product} />)}
            </div>
            <div className="filterbox">
            <h4 className="category-heading">Price</h4>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                size="small"
        
              />
              <h4 className="category-heading">Categories</h4>
              <ul className="categoriesBox">
                {categories.map((category)=>(
                  <li className="category-li" key={category} onClick={()=>setCategory(category)}>{category}</li>
                ))}
              </ul>
              <p className="ratingHead">Ratings Above</p>
              <fieldset className="ratingField">
               <Slider
               value={ratings}
               onChange={(e,newRating)=>{
                setRatings(newRating)
               }}
               aria-labelledby="continuous-slider"
               min={0}
               max={5}
               size="small"
               valueLabelDisplay="auto"
               />
              </fieldset>
            </div>
            </div>
            <div className="paginationBox">
              {resultPerPage < count && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Products;
