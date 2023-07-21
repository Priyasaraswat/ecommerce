import React from 'react'
import { Rating } from "@material-ui/lab";
import profilePhoto from "../../images/profilePhoto.png";
import "./productDetails.css";

const ReviewCard = ({review}) => {
   
    const options = {
      size: "large",
      value: review.rating,
      readOnly: true,
      precision: 0.5,
    };
  

  return (
    <div className='reviewCard'>
        <img src={profilePhoto} alt="User"/>
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard