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
exports.numberboxes=async(req,res)=>{
    var array = [];
    const cabine= await Cabine.findAll({include:['boxes']})
 
 cabine.map(async(obj)=>{
     console.log(obj.boxes.length);
     array=[...array,{id:obj.ref,count:obj.boxes.length}]
 })
 
 res.status(200).json(array)
}
exports.boxesavailaible=async(req,res)=>{
    const {count,rows}= await Box.findAndCountAll({where:{availibility:1}})
    return res.status(200).send({count:count})

    
    
}
exports.cabinesworking= async(req,res)=>{
    const {count,rows}=await Cabine.findAndCountAll({where:{mode:"WORKING"}})
    return res.status(200).send({count:count})
}