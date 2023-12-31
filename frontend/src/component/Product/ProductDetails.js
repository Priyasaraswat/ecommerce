import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview, } from "../../Actions/ProductAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import {addItemsToCart} from "../../Actions/CartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../Constants/ProductConstants";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const { id } = useParams();
  const [quantity,setQuantity]=useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert,success,reviewError]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity=()=>{
    let qty;
    if(product.stock>quantity)
    {
       qty=quantity+1;
    }
    else
    {
      qty=quantity;
    }
    setQuantity(qty);
  }

  const decreaseQuantity=()=>{
    let qty;
    if(quantity>1)
    {
       qty=quantity-1;
    }
    else
    {
      qty=quantity;
    }
    setQuantity(qty);
  }
   
  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    alert.success("Item added to cart !")
  }

  
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
    {loading?<Loader />:<Fragment>
    <MetaData title ="PRODUCT DETAIL"></MetaData>
      <div className="productDetails">
        <div class="product-div1">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="carouselProductImage"
                  key={i}
                  src={item.url}
                  alt={`${i} slide`}
                ></img>
              ))}
          </Carousel>
        </div>
        <div>
          <div className="productBlock1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>

          <div className="productBlock2">
            <Rating {...options} />
            <span>({product.noOfReviews} Reviews)</span>
          </div>

          <div className="productBlock3">
            <h2>₹{product.price}</h2>

            <div className="productBlock3-1">
              <div className="productBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input  type="number" readOnly value={quantity}/>
                <button onClick={increaseQuantity}>+</button>
              </div>

              <button disabled={product.stock<1?true:false} onClick={addToCartHandler}>Add to Cart</button>
            </div>

            <p>
              Status : {""}
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="productBlock4">
            <p>Description : <i>{product.description}</i></p>
          </div>
          <button  onClick={submitReviewToggle} className="submitReview">Submit Review</button>
        </div>
      </div>
       
       <div className="reviewSection">
      <h3 className="reviewsHeading">Reviews</h3>
      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      {
        product.reviews &&product.reviews[0]?(
            <div className="reviews">
                 {product.reviews && product.reviews.map((review)=>(
                    <ReviewCard review ={review}/>
                 ))}
            </div>
        ):(<p className="noReviews">No Reviews Yet</p>)
      }
      </div>
    </Fragment>}
    </>
  );
};

export default ProductDetails;
