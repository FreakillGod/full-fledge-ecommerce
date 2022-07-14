const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

exports.processPayment= catchAsyncErrors(async(req,res,next)=>{
    const payment= await stripe.paymentIntents.create({
        amount:req.body.amount,
        curreny:"inr",
        metadata:{
            company:"e-Shopping",
        },
    })

    res.status(200).json({success: true, client_secret: payment.client_secret})
})


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });