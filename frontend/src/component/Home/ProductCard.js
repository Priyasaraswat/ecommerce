import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

import "./home.css"


const Product = ({product}) => {
  const options={
    edit:false,
    color:"grey",
    activeColor:"yellow",
    size:window.innerWidth<600?16:20,
    value:product.ratings,
    isHalf:true
}

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div className='starshome'>
            <ReactStars {...options} /><span>({product?.noOfReviews && product.noOfReviews} Reviews)</span>
        </div>
        <span>₹{product.price}</span>
    </Link>
  )
}

export default Product