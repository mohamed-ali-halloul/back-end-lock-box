module.exports= app =>{
const dashboard=require("../controllers/dashboard_controllers")
var router=require("express").Router();
router.get("/payment-list",dashboard.paymentList);
router.get("/box-available",dashboard.boxesavailaible);
router.get("/box-number",dashboard.numberboxes);
router.get("/cabines-working",dashboard.cabinesworking);
app.use('/api/dashboard',router);
}