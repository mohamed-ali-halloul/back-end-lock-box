module.exports=app=>{
    const sizes= require("../controllers/sizes_controllers")
    var router= require("express").Router();
    router.get("/",sizes.getAll);
    router.get("/:id",sizes.getOne);

    app.use('/api/sizes',router);
}