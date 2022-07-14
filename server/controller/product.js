const Product = require('../model/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyn = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllProducts = catchAsyn(async (req, res, next) => {

  const itemsPerPage = 8;

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(itemsPerPage)

  const products = await apiFeatures.query;

  // let products= await products.length;

  //   let filteredProductCount= products.length;

  //   apiFeatures.pagination(itemsPerPage)

  // products = await apiFeatures.query;

  res.status(200).json({ success: true, productsCount: products.length, products, itemsPerPage, productsfilteredProductsCount: products.length })
})

exports.getProductDetails = catchAsyn(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {

    return next(new ErrorHandler("product nt found", 404))

  }
  return res.status(200).json({ success: true, product })

})

//admin
exports.createProduct = catchAsyn(async (req, res, next) => {
  try {

    //as sending created by user in product model
    req.body.user = req.user.id;
    // console.log(req.user.id,"_____" ,req.body)

    const product = await Product.create(req.body);

    return res.status(201).json({ success: true, product })

  } catch (error) {
    console.log(error)
  }

})

exports.updateProduct = catchAsyn(async (req, res, next) => {

  let product = Product.findById(req.params.id);

  if (!product) {

    return res.status(401).json({ success: false, message: "product not found" })

  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  return res.status(201).json({ success: true, product })

})

exports.deleteProduct = catchAsyn(async (req, res, next) => {

  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {

    return res.status(401).json({ success: false, message: "product not found" })

  }

  return res.status(200).json({ success: true, product })

})



//review

// Create New Review or Update the review
exports.createProductReview = catchAsyn(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyn(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyn(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      // useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});


exports.getAdminProducts = catchAsyn(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});