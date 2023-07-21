const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const products = require("../models/products");

//create product-- admin route

/*exports.createProduct=async(req,res,next)=>
 {
 const product =await Product.create(req.body);
 res.status(201).json({
   success:true,
   product
  })
 }*/
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user=req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {
  const resultPerPage = 6;
  const productsCount=await Product.countDocuments();
  
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

     let products=await apiFeature.query;
    let filteredProductCount=products.length;
     apiFeature.pagination(resultPerPage);

  // so yahan par query.keyword hai chai jo ki search karana hai
  // const products= await Product.find();

  products = await apiFeature.query.clone();

  res.status(200).json({ success: true, products,productsCount,resultPerPage,filteredProductCount });
});

// get details of one product
exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    //  return res.status(500).json({success:false,message:"Product not found"})
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({ message: true, product});
  }
});
//update product--admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, product });
  }
});

//delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  } else {
    await product.remove();
    res.status(200).json({ success: true, message: "Product deleted !" });
  }
});


// create new review and update the review

exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
  
  const {rating ,comment,productId}=req.body;
  const review={
    user:req.user.id,
    name:req.user.name,
    rating: Number(rating),
    comment
  };
  const product=await Product.findById(productId);

  const isReviewed= product.reviews.find((rev)=>{
      //console.log(rev.user.toString()===req.user.id)
       return (rev.user.toString() === req.user.id)
  }
);
  //console.log(isReviewed)

  if(isReviewed){
    //console.log("ki")
   product.reviews.forEach(rev=>{
    if(rev=> rev.user.toString() === req.user.id)
    {
     
      rev.rating=rating,
      rev.comment=comment
    }
   
   })
  }
  else{
    product.reviews.push(review);
    product.noOfReviews=product.reviews.length;
  }

  let avg=0;
  product.reviews.forEach(rev=>{
    avg+=rev.rating
  })
  product.ratings= avg/product.reviews.length;

  await product.save({validateBeforeSave: false});

  res.status(200).json({success:true});
})

// get all reviews of the product
exports.getReviews=catchAsyncErrors(async(req,res,next)=>{
 
  const product=await Product.findById(req.query.id);
  if(!product)
  {
    return next(new ErrorHandler("Product not found",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

// delete review
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  if(!product)
  {
    return next(new ErrorHandler("Product not found",404));
  }
   const reviews= product.reviews.filter((rev)=>
    rev._id.toString() !== req.query.id.toString()
   );

   let avg=0;
   reviews.forEach(rev=>{
    avg+=rev.rating
  })

  let ratings=0;
  if(reviews.length===0){
    ratings=0;
  }
  else{
    ratings= avg/reviews.length;
  }
   

  let noOfReviews =reviews.length;
  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    noOfReviews
  },{
    new: true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
  })
})