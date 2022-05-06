const db =require("../models");
const Box = db.box;
const Cabine= db.cabine;

exports.paymentList= async(req,res)=>{
    const stripe = require('stripe')('sk_test_51KtTVSGvZTEcLVjJpS8xOIqRsZNnwYYWQa1iDghKDURJtD9OMsxEGxWJgWfh45B5z2tSoePXLjmW8QHLAn4El02C003mtayPRH');
const paymentIntents= await stripe.paymentIntents.list({
   limit :3,
});
const count=paymentIntents.data.length
console.log(count);
res.status(200).send({count:count})
}   
