module.exports= app =>{
const dashboard=require("../controllers/dashboard_controllers")
var router=require("express").Router();
router.get("/payment-list",dashboard.paymentList);
app.use('/api/dashboard',router);
}